<?php

require "../../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Content-Type: application/json");

class user
{
    public $id;
    public $email;
    public $password;
    private $connection;

    public function __construct($email, $password)
    {

        $this->email = $email;
        $this->password = $password;
        $this->connection = new PDO("mysql:host=localhost;dbname=ecommerce", "root", "");
    }

    private function verify_item_exist($table, $thing_to_find, $value_to_find)
    {
        try {
            $query = "SELECT * FROM $table WHERE $thing_to_find = :THING";
            $queryverify = $this->connection->prepare($query);
            $queryverify->execute(["THING" => $value_to_find]);
        } catch (Exception $e) {
            http_response_code(404);
            throw new Exception($e->getMessage());
            exit();
        }
        $result = $queryverify->fetch(PDO::FETCH_ASSOC);
        if ($result) return false;
        else return true;
    }

    public function register_user()
    {

        if (!$this->verify_item_exist("users", "email", $this->email)) {
            http_response_code(404);
            throw new Exception("[VERIFY-ITEM] El item que buscas existe");
            exit();
        }


        // Insertar usuario en la base de datos
        $hashedpassword = password_hash($this->password, PASSWORD_BCRYPT, ["cost" => 12]);

        try {
            $query = "INSERT INTO users (email, pass) values (:EMAIL, :PASS)";
            $queryinsert = $this->connection->prepare($query);
            $queryinsert->execute(["EMAIL" => $this->email, "PASS" => $hashedpassword]);
        } catch (Exception $e) {
            http_response_code(400);
            throw new Exception($e->getMessage());
            exit();
        }


        // Creacion de token
        $lastidInsert = $this->connection->lastInsertId();

        try {
            $query = "SELECT * FROM users where id = :ID";
            $queryselect = $this->connection->prepare($query);
            $queryselect->execute(["ID" => $lastidInsert]);
        } catch (Exception $e) {
            http_response_code(400);
            throw new Exception($e->getMessage());
            exit();
        }

        // Resultado de la consulta 
        $result = $queryselect->fetch(PDO::FETCH_ASSOC);

        $payload = [
            "data" => [
                "id" => $result["id"],
                "email" => $result["email"]
            ]
        ];
        unset($result["pass"]);
        $jwt = JWT::encode($payload, "secret_key", "HS256");
        $result_to_send = ["data" => $result, "TOKEN" => $jwt];
        $this->id = $result["id"];
        return $result_to_send;
    }

    public function Generate_New_User_Carrito()
    {
        if (!$this->verify_item_exist("carrito", "userid", $this->id)) {
            http_response_code(404);
            throw new Exception("[VERIFY-ITEM] El item que buscas existe");
            exit();
        }

        // Crear un carrito para el usuario

        try {
            $queryInsertion = "INSERT INTO carrito (userid) VALUES (:IDUSER)";
            $queryAction = $this->connection->prepare($queryInsertion);
            $queryAction->execute(["IDUSER" => $this->id]);
        } catch (Exception $e) {
            $e->getMessage();
            throw new Exception("[DB-ERROR] " . $e->getMessage() . "");
            exit();
        }

        // Obtener la informacion del carrito
        $lastidInsert = $this->connection->lastInsertId();
        $querySelect = "SELECT * FROM carrito WHERE carritoid = :ID";

        try {
            $queryAction = $this->connection->prepare($querySelect);
            $queryAction->execute(["ID" => $lastidInsert]);
            $result = $queryAction->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            http_response_code(400);
            throw new Exception("[DB-ERROR] ERROR AL OBTENER LA INFORMACION DE CARRITO");
            exit();
        }

        return $lastidInsert;
    }

    public function login_user($token)
    {
        if ($token) {
            $datajwt = JWT::decode($token, new Key("secret_key", "HS256"));
            if ($datajwt) {
                if (!$this->verify_item_exist("users", "id", $datajwt->data->id)) {
                    $newtoken = JWT::encode([$datajwt], "secret_key", "HS256");
                    echo json_encode(["data" => $datajwt->data, "TOKEN" => $newtoken]);
                } else {
                    throw new Exception("[ERROR-FIND-SQL] El usuario no existe");
                    http_response_code(400);
                }
            }
        } else if ($this->email) {
            if (!$this->verify_item_exist("users", "email", $this->email)) {
                $querySelect = "SELECT * FROM users WHERE email = :EMAIL";
                try {
                    $queryPrepare = $this->connection->prepare($querySelect);
                    $queryPrepare->execute(["EMAIL" => $this->email]);
                } catch (Exception $e) {
                    http_response_code(400);
                    throw new Exception("[ERROR-CONSULTA-SQL]"  . $e->getMessage());
                }

                $result = $queryPrepare->fetch(PDO::FETCH_ASSOC);
                if (!$result) {
                    http_response_code(400);
                    throw new Exception("[ERROR-SELECT] EL USUARIO NO EXISTE");
                } else {
                    $verifypass = password_verify($this->password, $result["pass"]);
                    if ($verifypass) {
                        $payload = [
                            "data" => [
                                "email" => $result["email"],
                                "id" => $result["id"]
                            ]
                        ];
                        $jwt = JWT::encode($payload, "secret_key", "HS256");
                        echo json_encode(["data" => $payload["data"], "TOKEN" => $jwt]);
                    } else {
                        http_response_code(404);
                        throw new Exception("[PASSWORD-ERROR] CONTRASEÑA INCORRECTA");
                    };
                }
            } else throw new Exception("[PASSWORD-ERROR] User no existe");
        }
    }
}
