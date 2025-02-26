<?php
    include '../config/db.php';

    class AuthController{
        private $pdo;

        public function __construct($pdo){
            $this->pdo = $pdo;
        }
        
        public function login($email, $password){
            $sql = "SELECT * FROM users WHERE email = : email";

            $stmt = $this->pdo->prepare($sql);
            $stmt ->bindParam(':email', $email);
            $stmt ->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user && password_verify($password, $user['password'])){
                return $user;
            }

            return false;
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

        public function register($email, $password, $name){
            try{
                //verifcar se ja existe o email 
                $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
                $stmt->bindParam(':email', $email);
                $stmt->execute();

                $count = $stmt->fetchColumn();
        
                if ($count > 0) {
                    return [
                        "success" => false,
                        "message" => "Este email já está em uso"
                    ];
                }

                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
                $sql = "INSERT INTO users(email, utilizador, password) 
                        VALUES (:email, :utilizador, :password)";
        
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':utilizador', $name);
                $stmt->bindParam(':password', $hashedPassword);
        
                $success = $stmt->execute();
        
                // Se o registo for bem-sucedido, retorna true com uma mensagem de sucesso
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
    }


?>