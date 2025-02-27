<?php
    require_once __DIR__.'/../vendor/autoload.php';
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class JwtAuth {
        private static $secret_key = "NO_MINIMO_DEZOITO";
        private static $algorithm = "HS256";

        public static function generateToken($email) {
            $payload = [
                "email" => $email,
                "iat" => time(), 
                "exp" => time() + (60 * 60) 
            ];
    
            return JWT::encode($payload, self::$secret_key, self::$algorithm);
        }

        public static function verifyToken($token){
            try{
                $decoded = JWT::decode($token, new key(self::$secret_key,self::$algorithm));
                return $decoded->email;
            }catch(Exception $e){
                return false;
            }
        }
    }
?>