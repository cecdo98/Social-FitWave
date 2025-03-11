<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");

    include_once __DIR__ .'/../config/db.php';
    include_once __DIR__ . '/../controllers/TaskController.php';
    include_once __DIR__ .'/../controllers/AuthController.php';
    include_once __DIR__ .'/../controllers/JwtAuth.php';

    $data = json_decode(file_get_contents("php://input"), true);

    $headers = getallheaders();
    $token = isset($headers['Authorization']) ? str_replace('Bearer', '', $headers['Authorization']) : '';

    $userEmail = JwtAuth::verifyToken($token);

    $taskController = new TaskController($pdo);
    $authController = new AuthController($pdo);

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $action = $data['action'] ?? '';

        switch ($action) {
            case 'register':
                if (!isset($data['email'], $data['password'], $data['name'])) {
                    echo json_encode(["success" => false, "message" => "Parâmetros inválidos!"]);
                    exit;
                }

                $response = $authController->register($data['email'], $data['password'], $data['name']);
                echo json_encode($response);
                break;

            case 'login':
                if (!isset($data['email'], $data['password'])) {
                    echo json_encode(["success" => false, "message" => "Parâmetros inválidos!"]);
                    exit;
                }

                $success = $authController->login($data['email'], $data['password']);
                if ($success) {
                    $token = JwtAuth::generateToken($data['email']);
                    echo json_encode(["success" => true, "message" => "Login bem-sucedido!", "token" => $token]);
                } else {
                    echo json_encode(["success" => false, "message" => "Email ou senha errados!"]);
                }
                break;

            case 'account':
                if (!isset($data['email'])) {
                    echo json_encode(["success" => false, "message" => "Parâmetros inválidos!"]);
                    exit;
                }

                $account = $authController->getProfile($data['email']);

                if ($account) {
                    $profileData = $account["data"];
                    echo json_encode($profileData);
                } else {
                    echo json_encode(["erro" => $account["message"]]);
                }
                break;

            case 'update_account':
                if (!isset($data['id'])) {
                    echo json_encode(["success" => false, "message" => "Parâmetros inválidos"]);
                    exit;
                }
            
                // Verificar se existe um novo arquivo de imagem e fazer o upload
                $profile_picture = $data['profile_picture'] ?? null;
            
                if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] == 0) {
                    $file = $_FILES['profile_picture'];
                    $target_dir = "uploads/";
                    $target_file = $target_dir . basename($file["name"]);
            
                    // Verifique o tipo e o tamanho do arquivo antes de movê-lo
                    if (move_uploaded_file($file["tmp_name"], $target_file)) {
                        $profile_picture = basename($file["name"]);
                    } else {
                        echo json_encode(["success" => false, "message" => "Falha ao carregar a imagem."]);
                        exit;
                    }
                }
            
                // Atualize o perfil, incluindo o nome do arquivo da imagem
                $result = $authController->updateProfile(
                    $data['id'],
                    $data['name'] ?? null,
                    $data['email'] ?? null,
                    $data['password'] ?? null,
                    $profile_picture // Enviar o nome do arquivo, se foi enviado
                );
            
                // Certifique-se de que a resposta seja um JSON válido
                if (isset($result['success']) && !$result['success']) {
                    echo json_encode($result);  
                } else {
                    // Se o perfil foi atualizado com sucesso, retorne uma resposta de sucesso
                    echo json_encode(["success" => true, "message" => "Perfil atualizado com sucesso"]);
                }
                break;
                
                

            case 'delete_account':
                if (!isset($data['email'])) {
                    echo json_encode(["success" => false, "message" => "Parâmetros inválidos"]);
                    exit;
                }
                $result = $authController->deleteUser($data['email']);

                if ($result['success'] === true) {
                    echo json_encode(["success" => true, "message" => "Utilizador apagado!"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Utilizador não encontrado"]);
                }
                break;

            case 'get_profile_picture':
                if (!isset($data['email'])) {
                    echo json_encode(["success" => false, "message" => "Parâmetros inválidos!"]);
                    exit;
                }

                // Obtenha o caminho da foto de perfil
                $profileData = $authController->getProfile($data['email']);

                if ($profileData) {
                    // Caminho completo da imagem
                    $imagePath = "http://localhost/social-fitwave/Backend/uploads/";
                    $profilePicture = $profileData['data']['profile_picture'];

                    if ($profilePicture) {
                        echo json_encode(["success" => true, "profile_picture" => $imagePath . $profilePicture]);
                    } else {
                        echo json_encode(["success" => false, "message" => "Foto de perfil não encontrada."]);
                    }
                } else {
                    echo json_encode(["success" => false, "message" => "Usuário não encontrado."]);
                }
                break;
        }
    }
?>
