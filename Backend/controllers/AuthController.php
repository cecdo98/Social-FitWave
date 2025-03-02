<?php
    include '../config/db.php';

    class AuthController{
        private $pdo;

        public function __construct($pdo){
            $this->pdo = $pdo;
        }
        
        public function login($email, $password){
            $sql = "SELECT * FROM users WHERE email = :email";

            $stmt = $this->pdo->prepare($sql);
            $stmt ->bindParam(':email', $email);
            $stmt ->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user && password_verify($password, $user['password'])){
                return $user;
            }

            return false;
        }
        
        public function checkEmail($email, $id = null){
            $sql = "SELECT COUNT(*) FROM users WHERE email = :email";
            if ($id !== null) {
                $sql .= " AND id != :id"; 
            }
        
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':email', $email);
            if ($id !== null) {
                $stmt->bindParam(':id', $id);
            }
            $stmt->execute();
        
            $count = $stmt->fetchColumn();
        
            if ($count > 0) {
                return [
                    "success" => false,
                    "message" => "Este email já está em uso"
                ];
            }
            return null;
        }

        public function register($email, $password, $name){
            try{
                $emailCheck = $this->checkEmail($email);
                if ($emailCheck) {
                    return $emailCheck; 
                }

                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
                $sql = "INSERT INTO users(email, name, password) 
                        VALUES (:email, :name, :password)";
        
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':password', $hashedPassword);
        
                $success = $stmt->execute();
        
                return [
                    "success" => $success,
                    "message" => $success ? "Utilizador criado com sucesso!" : "Erro ao criar utilizador"
                ];
            } catch (PDOException $e) {
                return [
                    "success" => false,
                    "message" => "Erro ao criar utilizador: " . $e->getMessage()
                ];
            }
        }

        public function getProfile($email){
            $sql="SELECT * FROM users WHERE email LIKE :email";

            $stmt = $this->pdo->prepare($sql);
            $stmt -> bindParam(':email', $email);
            $stmt -> execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user){
                return[
                    "success" => true,
                    "data" => $user
                ];
            } else {
                return[
                    "success" => false,
                    "message" => "Utilizador não encontrado"
                ];
            }
        }

        public function updateProfile($id, $name = null, $email = null, $password = null, $profile_picture = null) {
            $fields = [];
            $params = [];
        
            if ($name !== null) {
                $fields[] = "name = ?";
                $params[] = $name;
            }
            if ($email !== null) {
                $emailCheck = $this->checkEmail($email, $id);
                if ($emailCheck !== null) {
                    return $emailCheck; 
                }
                $fields[] = "email = ?";
                $params[] = $email;
            }
            if ($password !== null) {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                if ($hashedPassword === false) {
                    return false; 
                }
                $fields[] = "password = ?";
                $params[] = $hashedPassword;
            }

            if ($profile_picture !== null) {
                $fields[] = "profile_picture = ?";
                $params[] = $profile_picture;
            }

            if (empty($fields)) {
                return false;
            }
        
            $sql = "UPDATE users SET " . implode(", ", $fields) . " WHERE id = ?";
            $params[] = $id;

            error_log("SQL: " . $sql);
            error_log("Parâmetros: " . json_encode($params));
        
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute($params);
        }
        
        public function getUserByEmail($email){
            $sql= "SELECT name FROM users WHERE email = :email";

            $stmt = $this->pdo->prepare($sql);
            $stmt ->bindParam(':email', $email);
            $stmt ->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            IF($result){
                return[
                    "success" =>true,
                    "user" => $result['name']
                ];
            }

            return [
                "success" =>False,
                "message" => "utilizador nao encontrado"
            ];

        }
    }
?>