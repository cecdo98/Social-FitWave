<?php
    class TaskController{
        private $pdo;

        public function __construct($pdo){
            $this->pdo =$pdo;
        }
      

        public function createEvent(){
            //funçao para criar os eventos
        }

        public function getEvents(){
            // funçao para carregar os eventos
        }

        public function getEventsByType(){
            //funçao para carregar os eventos pelo tipo
        }

        public function deleteEvents(){
            //funuction para apagar eventos
        }

        public function updateEvents(){
            // funçao para atualizar eventos
        }
    }



?>