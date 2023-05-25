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
        if(isset($_POST['submi'])){
            $raquete = "SELECT progressionhistoire FROM users WHERE id = $_SESSION[id]";
            include "connexion.php";
            $qer = mysqli_query($connexion,$raquete);
            $rep = mysqli_fetch_assoc($qer);
            $num = $rep['progressionhistoire'];
            $tmpr = $_GET['actlvl'];

            
            $num+=1;
            if($tmpr == $num){
                $requete = "UPDATE users SET progressionhistoire = '$num' WHERE id = $_SESSION[id]";
                mysqli_query($connexion,$requete);
                mysqli_close($connexion);
            }
            header('Location:game.php');
           
        }
    
    
    ?>
    <?php

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
    <form id="forme" action="" method="POST">
        <!--<input type="submit" value="submi" name="submi">-->
    </form>
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