<?php

    $host = 'localhost';
    $dbname ="social-fitwave";
    $username ='root';
    $password ='';

    try{
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "sucesso";
        
    }catch(PDOException $e){
        echo "Erro ao ligar: " . $e->getMessage();
    }
?>