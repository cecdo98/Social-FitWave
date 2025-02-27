<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");

    include_once __DIR__ .'/../config/db.php';
    include_once __DIR__ . '/../controllers/TaskController.php';
    include_once __DIR__ .'/../controllers/AuthController.php';
    include_once __DIR__ .'/../controllers/JwtAuth.php';

    $data =json_decode(file_get_contents("php://input"),true);

    $headers = getallheaders();
    $token = isset($headers['Authorization']) ? str_replace('Bearer', '',$headers['Authorization']): '';

    $userEmail = JwtAuth::verifyToken($token);

    $taskController = new TaskController($pdo);
    $authController = new AuthController($pdo);

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST'){
        $action = $data['action'] ?? '';

        switch($action){
            case 'register':
                if(!isset($data['email'],$data['password'], $data['name'])) {
                    echo json_encode(["success" => false, "message" => "Parâmetros inválidos!"]);
                    exit;
                }

                $response = $authController->register($data['email'],$data['password'],$data['name']);
                echo json_encode($response);
                break;

            case 'login':
                if(!isset($data['email'],$data['password'])) {
                    echo json_encode(["success" => false, "message" => "Parâmetros inválidos!"]);
                    exit;
                }

                $success =$authController->login($data['email'],$data['password']);
                if($success){
                    $token = JwtAuth::generateToken($data['Email']);
                    echo json_encode(["succes" => true, "message" =>"Login bem-sucedido!", "token" => $token]);
                }else{
                    echo json_encode(["succes" => false, "message" =>"Email ou password errados!"]);
                }
        }
    }
?>