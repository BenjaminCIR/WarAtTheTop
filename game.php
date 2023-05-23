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
    <div id="opa"></div>
    <?php   
       session_start();
       if(isset($_GET['id']) && isset($_GET['actlvl'])){
            $tmp = $_GET['actlvl'];
            $raquete = "SELECT progressionhistoire FROM users WHERE id = $_SESSION[id]";
            include "connexion.php";
            $qer = mysqli_query($connexion,$raquete);
            $rep = mysqli_fetch_assoc($qer);
            $num = $rep['progressionhistoire'];
            mysqli_close($connexion);
            if($tmp <= $num+1 ){
                $tmp2 = $_GET['id'];
                echo "<script> var nivo = $tmp2 </script>";
            }
            else{
                header('Location:index.php');
            }
       }
       else{
            header('Location:index.php');
       }
        
    
    
    ?>
    <?php

    if(isset($_SESSION['id'])){
        $id = $_SESSION['id'];
        echo"<script> var idsession = $_SESSION[id]
                    var actlvl = $_GET[actlvl]; </script>";
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
    <div id="list">
        <div id="compteur">
            <p>Cartes sélectionnées : 0/15</p>
            <button disabled id="start"> START </button>
            <button id="clear"> CLEAR </button>

        </div>
        <div id="hdeck">
            <?php
                for($i=0;$i<15;$i++){
                    if($i >= 12)echo"<div class ='bloquee bloqueee'><img class='card' src='futskull.png' style='opacity:0.3'></div>";
                    else echo"<div class ='bloquee'><img class='card' src='futskull.png' style='opacity:0.3'></div>";
                }

            ?>
        </div>
    </div>

        <!--<input type="submit" value="submi" name="submi">-->
    </form>
    <div id="decks">
        <div id="dekpred">
            Decks prédéfinis
        </div>
        <?php
            for($i=0;$i<count($decks);$i++){
                echo"<div class ='cdeck' data='deck".$i."'></div>";
            }

        ?>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.min.js"></script>
    <script type="module" src="game.js"></script>
</body>
</html>