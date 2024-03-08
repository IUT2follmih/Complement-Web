<?php
try{
    $state = fopen("etat.json", "r") or die("Unable to open file!");
    echo fread($state, filesize("etat.json"));
    fclose($state);
} catch (Exception $ex) {
    http_response_code(500);
    throw new Exception("Erreur Serveur (Problème sur le fichier) : " . $ex->getMessage());
}


?>