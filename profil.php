<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>One Piece : War at the top</title>
        <link rel="stylesheet" href="profil.css">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="header.css">
    </head>
    
    <body>
		<img id="backgroud" src="BACKGROUND.jpg">
        <?php
            session_start();
            include "header.php";

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

        <div id="barre">
            <a id="comp" class="liens" href="#compte">Compte</a>
            <a id="pac" class="liens" href="#packs">Packs</a>
            <a id="collect" href="#collection">Collection</a>
            <a id="dec" class="liens" href="#decks">Decks</a>
        </div>
        <div id="cherche" class="right">
            <input id="ecrire" type="text" placeholder="Rechercher" value=""></input>
        </div>

        <div id="ordre" class="right">
            <button id="rhaut">Rareté<img src="flecheHaut.png"></button>
            <button id="rbas">Rareté<img src="flecheBas.png"></button>
            <button id="ahaut">Alphabétique<img src="flecheHaut.png"></button>
            <button id="abas">Alphabétique<img src="flecheBas.png"></button>
        </div>

        <div id="compte" class="affiche"></div>
        <div id="packs" class="right"></div>
        <div id="collection" class="right"></div>
        <div id="decks" class="right"></div>

        <script src="hamburger.js"></script>
        <script type="module" src="profil.js"></script>
    </body>
</html>