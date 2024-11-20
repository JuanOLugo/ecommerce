<?php
require "../class/user.php";

// Permitir cualquier origen (dominio)
header("Access-Control-Allow-Origin: *");

// Permitir encabezados específicos
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Permitir métodos específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");



$TYPE_REQUEST = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"));
if ($TYPE_REQUEST == "POST") {
    $HEADER = getallheaders();
    if (isset($HEADER['Authorization'])) {
        $user = new user(null, null);
        $user->login_user($HEADER['Authorization']);
    } else {
        $user = new user($data->email, $data->password);
        $user->login_user(null);
    }
}
