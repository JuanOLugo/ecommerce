<?php

require "../../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Content-Type: application/json");

class user
{
    public $id;
    public $name;
    public $email;
    public $password;
    public $created_at;
    public $connection;

    public function __construct($id, $name, $email, $password)
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->created_at = date("Y-m-d H:i:s");
        $this->connection = new PDO("mysql:host=localhost;dbname=ecommerce", "root", "");
    }

    private function verify_item_exist($table, $thing_to_find, $value_to_find)
    {
        $query = "SELECT * FROM $table WHERE $thing_to_find = :THING";
        $queryverify = $this->connection->prepare($query);
        $queryverify->execute([ "THING" => $value_to_find]);
        $result = $queryverify->fetch(PDO::FETCH_ASSOC);
        if ($result) return throw new Exception("[VERIFY-ITEM] El item que buscas existe");
        else return true;
    }

    public function register_user()
    {
        try {
            $this->verify_item_exist("users", "email", $this->email);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
            exit();
        }

        //Insertar usuario en la base de datos
        $hashedpassword = password_hash($this->password, PASSWORD_BCRYPT, ["cost" => 12]);
        $query = "INSERT INTO users (email, pass) values (:EMAIL, :PASS)";
        $queryinsert = $this->connection->prepare($query);
        $queryinsert->execute(["EMAIL" => $this->email, "PASS" => $hashedpassword]);

        

        //Creacion de token
        $lastidInsert = $this->connection->lastInsertId();

        $query = "SELECT * FROM users where id = :ID";
        $queryselect = $this->connection->prepare($query);
        $queryselect->execute(["ID" => $lastidInsert]);

        //Resultado de la consulta 
        $result = $queryselect->fetch(PDO::FETCH_ASSOC);

        $payload = [
            "data" => [
                "id" => $result["id"],
                "email" => $result["email"]
            ]
        ];
        unset($result["pass"]);
        $jwt = JWT::encode($payload, "secret_key", "HS256");
        $result_to_send = ["DATA" => $result, "TOKEN" => $jwt];
        echo json_encode($result_to_send);
        
    }
}
