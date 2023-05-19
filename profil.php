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
                echo"<script> var idsession = $_SESSION[id] </script>";
                $id = $_SESSION['id'];

                include "connexion.php";
                $req = "SELECT pack_bronze,pack_silver,pack_gold,pack_north_blue,pack_south_blue,pack_east_blue,pack_west_blue,decks,cards FROM users WHERE id =$id";
                $resp = mysqli_query($connexion,$req);	
                $user = mysqli_fetch_assoc($resp);
                $tab = explode(",",$user["cards"]);
                $decks = explode(";",$user["decks"]);
                $eb = $user['pack_east_blue'];
                $wb = $user['pack_west_blue'];
                $nb = $user['pack_north_blue'];
                $sb = $user['pack_south_blue'];
                $b = $user['pack_bronze'];
                $s = $user['pack_silver'];
                $g = $user['pack_gold'];

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
        <div id="packs" class="right">
            <?php $compt=0;
                if($eb == 0) $geb=0.9;
                else $geb = 0;
                if($wb == 0) $gwb=0.9;
                else $gwb = 0;
                if($nb == 0) $gnb=0.9;
                else $gnb = 0;
                if($sb == 0) $gsb=0.9;
                else $gsb = 0;
                if($b == 0) $gb=0.9;
                else $gb = 0;
                if($s == 0) $gs=0.9;
                else $gs = 0;
                if($g == 0) $gg=0.9;
                else $gg = 0;
            ?>
            <img class="paks" <?php echo"style='filter:grayscale($geb);'"?> src="Pack/pack_east_blue.png">
            <?php echo "<p style = 'left:".(9+20*$compt)."%'class='Ppaks'> $eb </p>"; $compt+=1 ?>
            <img class="paks" <?php echo"style='filter:grayscale($gwb);'"?> src="Pack/pack_west_blue.png">
            <?php echo "<p style = 'left:".(9+20*$compt)."%'class='Ppaks'> $wb </p>"; $compt+=1 ?>
            <img class="paks" <?php echo"style='filter:grayscale($gnb);'"?> src="Pack/pack_north_blue.png">
            <?php echo "<p style = 'left:".(9+20*$compt)."%'class='Ppaks'> $nb </p>"; $compt+=1 ?>
            <img class="paks" <?php echo"style='filter:grayscale($gsb);'"?> src="Pack/pack_south_blue.png">
            <?php echo "<p style = 'left:".(9+20*$compt)."%'class='Ppaks'> $sb </p>"; $compt=0 ?>
            <img class="paks bot" <?php echo"style='clear:left;filter:grayscale($gb);'"?> src="Pack/pack_bronze.png">
            <?php echo "<p style = 'top:50%;left:".(19+20*$compt)."%'class='Ppaks'> $b </p>"; $compt+=1 ?>
            <img class="paks bot" <?php echo"style='filter:grayscale($gs);'"?> src="Pack/pack_silver.png">
            <?php echo "<p style = 'top:50%;left:".(19+20*$compt)."%'class='Ppaks'> $s </p>"; $compt+=1 ?>
            <img class="paks bot" <?php echo"style='filter:grayscale($gg);'"?> src="Pack/pack_gold.png">
            <?php echo "<p style = 'top:50%;left:".(19+20*$compt)."%'class='Ppaks'> $g </p>"; $compt+=1 ?>
        </div>
        <div id="collection" class="right"></div>
        <div id="decks" class="right"></div>

        <script src="hamburger.js"></script>
        <script type="module" src="profil.js"></script>
    </body>
</html>