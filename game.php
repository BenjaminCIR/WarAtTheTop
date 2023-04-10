<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="game.css">
    <title>Document</title>
</head>
<body>
    <?php

    session_start();
    if(isset($_SESSION['id'])){
        $id = $_SESSION['id'];

        include "connexion.php";
        $req = "SELECT decks,cards FROM users WHERE id =$id";
        $resp = mysqli_query($connexion,$req);	
        $user = mysqli_fetch_assoc($resp);
        $tab = explode(",",$user["cards"]);
        $decks = explode(";",$user["decks"]);
        echo"
        <script type='text/javascript'>
            var decks = ".json_encode($decks)."
            var cards = ".json_encode($tab)."
        </script>";


    }


    ?>
    <div id="list"></div>
    <div id="decks">
        <?php
            for($i=0;$i<count($decks);$i++){
                echo"<div class ='cdeck' data='deck".$i."'></div>";
            }

        ?>
    </div>
    <button disabled id="start"> START </button>
    <button id="facile">TOUT COCHER</button>
    <button disabled id="startgame"> LANCER </button>
    <script src="https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.min.js"></script>
    <script type="module" src="game.js"></script>
</body>
</html>