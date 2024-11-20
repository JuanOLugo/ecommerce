<?php

require "../class/user.php";

// Permitir cualquier origen (dominio)
header("Access-Control-Allow-Origin: *");

// Permitir métodos específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permitir encabezados específicos
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$TYPE_REQUEST = $_SERVER["REQUEST_METHOD"];

if( $TYPE_REQUEST == "POST"){

    $content = json_decode(file_get_contents("php://input"));
    if($content->Email && $content->Password){
        $USER = new user($content->Email, $content->Password);
        $USER_DATA = $USER->register_user();
        $CARRITO_DATA = $USER->Generate_New_User_Carrito();
        $ARRAY_TO_ENCODE = (array) ["userdata" => $USER_DATA, "carritodata" => $CARRITO_DATA];
        echo json_encode($ARRAY_TO_ENCODE);
    }else throw new Exception("[ERROR-CONTENT] NO SE HA PROPORCIONADO EL CONTENIDO NECESARIO");
    

}else throw new Exception("[ERROR-METHOD] NO ES POSIBLE ACCEDER A ESTA RUTA CON EL METODO PROPORCIONADO: [$TYPE_REQUEST]") ;