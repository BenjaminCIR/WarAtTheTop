<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Boutique</title>
    <link rel="stylesheet" href="shop.css">
    <link rel="stylesheet" href="header.css">
    <script src="shop.js"></script>
  </head>
  <body>

    <?php
      session_start();
      include "header.php";
    ?>

    <div class="background"></div>
    <div class="content">
      <div id="blc1"> 
        <h1>Ta Boutique</h1>
			  <img class="nami" src="nami.gif" alt="";>
			
			  <?php
        if(isset($_SESSION['id'])){
          require "connexion.php";
          $requete1 = "SELECT * FROM users WHERE id = $_SESSION[id]";
          $resultat1 = mysqli_query($connexion, $requete1);
          if ( $resultat1 == FALSE ){
            echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
            die();
          }
          else { 
            $u = mysqli_fetch_assoc($resultat1);
            echo '<h2 class="money">Ton Argent : '.$u['money'].'<img class="berry" src="berry.png" alt="Berry"></h2>';
            echo '<h2 class="packs">Tes Packs : </h2>';
            echo '<div class="pack"><p>Nombre de packs North Blue : '.$u['pack_north_blue'].'<p>';
            echo '<p>Nombre de packs South Blue : '.$u['pack_south_blue'].'</p>';
            echo '<p>Nombre de packs East Blue : '.$u['pack_east_blue'].'</p>';
            echo '<p>Nombre de packs West Blue : '.$u['pack_west_blue'].'</p>';
            echo '<p>Nombre de packs Bronze : '.$u['pack_bronze'].'</p>';
            echo '<p>Nombre de packs Silver : '.$u['pack_silver'].'</p>';
            echo '<p>Nombre de packs Gold : '.$u['pack_gold'].'</p></div>';
          }
          mysqli_close($connexion);
        }
        ?>
       
      </div>
      <a href="#" id="scrollToTopButton" class="scroll-to-top-button">
        <img src="flèche.jpg" alt="Retour en haut de la page">
      </a>

      <div class="container">
        <div class="block2">
          <img src="Pack\pack_north_blue.png" alt="Image 1" onclick="scrollToBloc2()">
        </div>
      </div>

      <div class="container">
        <div class="block2">
          <img src="Pack\pack_south_blue.png" alt="Image 2" onclick="scrollToBloc3()">
        </div>
      </div>

      <div class="container">
        <div class="block2">
          <img src="Pack\pack_east_blue.png" alt="Image 3" onclick="scrollToBloc4()">
        </div>
      </div>

      <div class="container">
        <div class="block2">
          <img src="Pack\pack_west_blue.png" alt="Image 4"onclick="scrollToBloc5()">
        </div>
      </div>

      <div class="container1">
        <div class="left2">
          <div class="block0">
            <img src="Pack\pack_bronze.png" alt="Image 1" onclick="scrollToBloc6()">
          </div>
        </div>
      </div>

      <div class="container1">
        <div class="block0">
          <img src="Pack\pack_silver.png" alt="Image 1" onclick="scrollToBloc7()">
        </div>
      </div>

      <div class="container1">
        <div class="block0">
          <img src="Pack\pack_gold.png" alt="Image 1" onclick="scrollToBloc8()">
        </div>
      </div>

      <?php
        $i = 1;
        $j = 1;
        while ($i < 8) {
            while ($j < 4) {
                echo '
                <form id="stylepopup'.$i.$j.'" class="stylepopup" name="form'.$i.$j.'" action="shop.php" method="get" style="display:none;">
                    <p>Do you really want to purchase this pack(s)?</p>
                    <button class="confirm" name="confirm'.$i.$j.'">Confirm</button>
                    <button class="annuler" name="cancel'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Cancel</button>
                </form>';
                $j++;
            }
            $i++;
            $j = 1; // Réinitialiser la valeur de $j pour chaque itération de $i
        }
        ?>

        <div class="cards">
            <div class="card" id="bloc2">
                <h1>Pack North Blue</h1>
                <div class="cont">
                    <div class="coffre">
                        <img src="Pack\pack_north_blue.png">
                        <div class="petit-texte3">
                            <p>900</p>
                            <img class="berry3" src="berry.png">
                        </div>
                        <?php
                        if ($u['money'] <= 900) {
                            echo '<button class="petit-bouton1">Low money</button>';
                        } else {
                            $i = 1;
                            $j = 1;
                            echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                        }
                        ?>
                    </div>
                    <div class="coffre">
                        <img src="Pack\pack_north_blue.png">
                        <img class="bonus1" src="fois2.png">
                        <div class="petit-texte2">
                            <p>1 800</p>
                            <img class="berry2" src="berry.png">
                        </div>
                        <?php
                        if ($u['money'] <= 900) {
                            echo '<button class="petit-bouton1">Low money</button>';
                        } else {
                            $i = 1;
                            $j = 2;
                            echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                        }
                        ?>
                    </div>
                    <div class="coffre">
                        <img src="Pack\pack_north_blue.png">
                        <img class="bonus2" src="fois3.png">
                        <div class="petit-texte1">
                            <p>2 700</p>
                            <img class="berry1" src="berry.png">
                        </div>
                        <?php
                        if ($u['money'] <= 900) {
                            echo '<button class="petit-bouton1">Low money</button>';
                        } else {
                            $i = 1;
                            $j = 3;
                            echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="card" id="bloc3">
          <h1>Pack South Blue</h1>
          <div class="cont">
            <div class="coffre">
              <img src="Pack\pack_south_blue.png">
              <div class="petit-texte3">
                <p>900</p>
                <img class="berry3" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=2; $j=1;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
            <div class="coffre">
              <img src="Pack\pack_south_blue.png">
              <img class="bonus1" src="fois2.png">
              <div class="petit-texte2">
                <p>1 800</p>
                <img class="berry2" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=2; $j=2;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
            <div class="coffre">
              <img src="Pack\pack_south_blue.png">
              <img class="bonus2" src="fois3.png">
              <div class="petit-texte1">
                <p>2 700</p>
                <img class="berry1" src="berry.png">
              </div>                
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=2; $j=3;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
          </div>
        </div>
        <div class="card" id="bloc4">
          <h1>Pack East Blue</h1>
          <div class="cont">
            <div class="coffre">
              <img src="Pack\pack_east_blue.png">
              <div class="petit-texte3">
                <p>900</p>
                <img class="berry3" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=3; $j=1;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
            <div class="coffre">
              <img src="Pack\pack_east_blue.png">
              <img class="bonus1" src="fois2.png">
              <div class="petit-texte2">
                <p>1 800</p>
                <img class="berry2" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=3; $j=2;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
            <div class="coffre">
              <img src="Pack\pack_east_blue.png">
              <img class="bonus2" src="fois3.png">
              <div class="petit-texte1">
                <p>2 700</p>
                <img class="berry1" src="berry.png">
              </div>                
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=3; $j=3;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
          </div>
        </div>
        <div class="card" id="bloc5">
          <h1>Pack West Blue</h1>
          <div class="cont">
            <div class="coffre">
              <img src="Pack\pack_west_blue.png">
              <div class="petit-texte3">
                <p>900</p>
                <img class="berry3" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=4; $j=1;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
            <div class="coffre">
              <img src="Pack\pack_west_blue.png">
              <img class="bonus1" src="fois2.png">
              <div class="petit-texte2">
                <p>1 800</p>
                <img class="berry2" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=4; $j=2;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
            <div class="coffre">
              <img src="Pack\pack_west_blue.png">
              <img class="bonus2" src="fois3.png">
              <div class="petit-texte1">
                <p>2 700</p>
                <img class="berry1" src="berry.png">
              </div>                
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=4; $j=3;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?></div>
          </div>
        </div>
        <div class="card" id="bloc6">
          <h1>Pack Bronze</h1>
          <div class="cont">
            <div class="coffre">
              <img src="Pack\pack_bronze.png">
              <div class="petit-texte3">
                <p>900</p>
                <img class="berry3" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=5; $j=1;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?></div>
            <div class="coffre">
              <img src="Pack\pack_bronze.png">
              <img class="bonus1" src="fois2.png">
              <div class="petit-texte2">
                <p>1 800</p>
                <img class="berry2" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=5; $j=2;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>  
              </div>
            <div class="coffre">
              <img src="Pack\pack_bronze.png">
              <img class="bonus2" src="fois3.png">
              <div class="petit-texte1">
                <p>2 700</p>
                <img class="berry1" src="berry.png">
              </div>                
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=5; $j=3;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
          </div>
        </div>
        <div class="card" id="bloc7">
          <h1>Pack Silver</h1>
          <div class="cont">
            <div class="coffre">
              <img src="Pack\pack_silver.png">
              <div class="petit-texte3">
                <p>900</p>
                <img class="berry3" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=6; $j=1;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
            <div class="coffre">
              <img src="Pack\pack_silver.png">
              <img class="bonus1" src="fois2.png">
              <div class="petit-texte2">
                <p>1 800</p>
                <img class="berry2" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=6; $j=2;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
               </div>
            <div class="coffre">
              <img src="Pack\pack_silver.png">
              <img class="bonus2" src="fois3.png">
              <div class="petit-texte1">
                <p>2 700</p>
                <img class="berry1" src="berry.png">
              </div>                
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=6; $j=3;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
            </div>
          </div>
        </div>
        <div class="card" id="bloc8">
          <h1>Pack Gold</h1>
          <div class="cont">
            <div class="coffre">
              <img src="Pack\pack_gold.png">
              <div class="petit-texte3">
                <p>900</p>
                <img class="berry3" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=7; $j=1;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
              </div>
            <div class="coffre">
              <img src="Pack\pack_gold.png">
              <img class="bonus1" src="fois2.png">
              <div class="petit-texte2">
                <p>1 800</p>
                <img class="berry2" src="berry.png">
              </div>
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=7; $j=2;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
               </div>
            <div class="coffre">
              <img src="Pack\pack_gold.png">
              <img class="bonus2" src="fois3.png">
              <div class="petit-texte1">
                <p>2 700</p>
                <img class="berry1" src="berry.png">
              </div>                
              <?php
                  if ($u['money'] <= 900) {
                      echo '<button class="petit-bouton1">Low money</button>';
                  } else {
                      $i=7; $j=3;
                      echo '<button class="petit-bouton" name="btn'.$i.$j.'" onclick="toggleForm(\'stylepopup'.$i.$j.'\')">Buy</button>';
                  }
              ?>
            </div>
          </div>
        </div>
      </div>
    </div>

    <?php	
	if(isset($_GET["confirm11"]) || isset($_GET["confirm12"]) || isset($_GET["confirm13"])){
		require "connexion.php";
    $requete1 = "SELECT * FROM users WHERE id=$_SESSION[id]";
    $resultat1 = mysqli_query($connexion, $requete1);       
    if(isset($_GET["confirm11"])) $achat = 900;
    if(isset($_GET["confirm12"])) $achat = 900*2;
    if(isset($_GET["confirm13"])) $achat = 900*3;
			
		if( $resultat1 == FALSE){
            echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
            die();
        }
    else { 
      $UneLigne1 = mysqli_fetch_assoc($resultat1);				
      if($UneLigne1['money'] >= $achat){
        $UneLigne1['money'] = $UneLigne1['money'] - $achat;
        $requete3 = "UPDATE users SET money = $UneLigne1[money] WHERE id=$_SESSION[id]";
        $resultat3 = mysqli_query($connexion, $requete3);
        if( $resultat3 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
        if($achat == 900) $U = 1 + $UneLigne1['pack_north_blue'];
        if($achat == 900*2) $U = 2 + $UneLigne1['pack_north_blue'];
        if($achat == 900*3) $U = 3 + $UneLigne1['pack_north_blue'];
        $requete4 = "UPDATE users SET pack_north_blue = '$U' WHERE id=$_SESSION[id]";
        $resultat4 = mysqli_query($connexion, $requete4);
        if( $resultat4 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
      }
    }
    header("Location:shop.php");
	  mysqli_close($connexion);
	}
  ?>

<?php	
	if(isset($_GET["confirm21"]) || isset($_GET["confirm22"]) || isset($_GET["confirm23"])){
		require "connexion.php";
    $requete1 = "SELECT * FROM users WHERE id=$_SESSION[id]";
    $resultat1 = mysqli_query($connexion, $requete1);       
    if(isset($_GET["confirm21"])) $achat = 900;
    if(isset($_GET["confirm22"])) $achat = 900*2;
    if(isset($_GET["confirm23"])) $achat = 900*3;
			
		if( $resultat1 == FALSE){
            echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
            die();
        }
    else { 
      $UneLigne1 = mysqli_fetch_assoc($resultat1);				
      if($UneLigne1['money'] >= $achat){
        $UneLigne1['money'] = $UneLigne1['money'] - $achat;
        $requete3 = "UPDATE users SET money = $UneLigne1[money] WHERE id=$_SESSION[id]";
        $resultat3 = mysqli_query($connexion, $requete3);
        if( $resultat3 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
        if($achat == 900) $U = 1 + $UneLigne1['pack_south_blue'];
        if($achat == 900*2) $U = 2 + $UneLigne1['pack_south_blue'];
        if($achat == 900*3) $U = 3 + $UneLigne1['pack_south_blue'];
        $requete4 = "UPDATE users SET pack_south_blue = '$U' WHERE id=$_SESSION[id]";
        $resultat4 = mysqli_query($connexion, $requete4);
        if( $resultat4 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
      }
    }
    header("Location:shop.php");
	  mysqli_close($connexion);
	}
  ?>

<?php	
	if(isset($_GET["confirm31"]) || isset($_GET["confirm32"]) || isset($_GET["confirm33"])){
		require "connexion.php";
    $requete1 = "SELECT * FROM users WHERE id=$_SESSION[id]";
    $resultat1 = mysqli_query($connexion, $requete1);       
    if(isset($_GET["confirm31"])) $achat = 900;
    if(isset($_GET["confirm32"])) $achat = 900*2;
    if(isset($_GET["confirm33"])) $achat = 900*3;
			
		if( $resultat1 == FALSE){
            echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
            die();
        }
    else { 
      $UneLigne1 = mysqli_fetch_assoc($resultat1);				
      if($UneLigne1['money'] >= $achat){
        $UneLigne1['money'] = $UneLigne1['money'] - $achat;
        $requete3 = "UPDATE users SET money = $UneLigne1[money] WHERE id=$_SESSION[id]";
        $resultat3 = mysqli_query($connexion, $requete3);
        if( $resultat3 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
        if($achat == 900) $U = 1 + $UneLigne1['pack_east_blue'];
        if($achat == 900*2) $U = 2 + $UneLigne1['pack_east_blue'];
        if($achat == 900*3) $U = 3 + $UneLigne1['pack_east_blue'];
        $requete4 = "UPDATE users SET pack_east_blue = '$U' WHERE id=$_SESSION[id]";
        $resultat4 = mysqli_query($connexion, $requete4);
        if( $resultat4 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
      }
    }
    header("Location:shop.php");
	  mysqli_close($connexion);
	}
  ?>

<?php	
	if(isset($_GET["confirm41"]) || isset($_GET["confirm42"]) || isset($_GET["confirm43"])){
		require "connexion.php";
    $requete1 = "SELECT * FROM users WHERE id=$_SESSION[id]";
    $resultat1 = mysqli_query($connexion, $requete1);       
    if(isset($_GET["confirm41"])) $achat = 900;
    if(isset($_GET["confirm42"])) $achat = 900*2;
    if(isset($_GET["confirm43"])) $achat = 900*3;
			
		if( $resultat1 == FALSE){
            echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
            die();
        }
    else { 
      $UneLigne1 = mysqli_fetch_assoc($resultat1);				
      if($UneLigne1['money'] >= $achat){
        $UneLigne1['money'] = $UneLigne1['money'] - $achat;
        $requete3 = "UPDATE users SET money = $UneLigne1[money] WHERE id=$_SESSION[id]";
        $resultat3 = mysqli_query($connexion, $requete3);
        if( $resultat3 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
        if($achat == 900) $U = 1 + $UneLigne1['pack_west_blue'];
        if($achat == 900*2) $U = 2 + $UneLigne1['pack_west_blue'];
        if($achat == 900*3) $U = 3 + $UneLigne1['pack_west_blue'];
        $requete4 = "UPDATE users SET pack_west_blue = '$U' WHERE id=$_SESSION[id]";
        $resultat4 = mysqli_query($connexion, $requete4);
        if( $resultat4 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
      }
    }
    header("Location:shop.php");
	  mysqli_close($connexion);
	}
  ?>

<?php	
	if(isset($_GET["confirm51"]) || isset($_GET["confirm52"]) || isset($_GET["confirm53"])){
		require "connexion.php";
    $requete1 = "SELECT * FROM users WHERE id=$_SESSION[id]";
    $resultat1 = mysqli_query($connexion, $requete1);       
    if(isset($_GET["confirm51"])) $achat = 900;
    if(isset($_GET["confirm52"])) $achat = 900*2;
    if(isset($_GET["confirm53"])) $achat = 900*3;
			
		if( $resultat1 == FALSE){
            echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
            die();
        }
    else { 
      $UneLigne1 = mysqli_fetch_assoc($resultat1);				
      if($UneLigne1['money'] >= $achat){
        $UneLigne1['money'] = $UneLigne1['money'] - $achat;
        $requete3 = "UPDATE users SET money = $UneLigne1[money] WHERE id=$_SESSION[id]";
        $resultat3 = mysqli_query($connexion, $requete3);
        if( $resultat3 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
        if($achat == 900) $U = 1 + $UneLigne1['pack_bronze'];
        if($achat == 900*2) $U = 2 + $UneLigne1['pack_bronze'];
        if($achat == 900*3) $U = 3 + $UneLigne1['pack_bronze'];
        $requete4 = "UPDATE users SET pack_bronze = '$U' WHERE id=$_SESSION[id]";
        $resultat4 = mysqli_query($connexion, $requete4);
        if( $resultat4 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
      }
    }
    header("Location:shop.php");
	  mysqli_close($connexion);
	}
  ?>

<?php	
	if(isset($_GET["confirm61"]) || isset($_GET["confirm62"]) || isset($_GET["confirm63"])){
		require "connexion.php";
    $requete1 = "SELECT * FROM users WHERE id=$_SESSION[id]";
    $resultat1 = mysqli_query($connexion, $requete1);       
    if(isset($_GET["confirm61"])) $achat = 900;
    if(isset($_GET["confirm62"])) $achat = 900*2;
    if(isset($_GET["confirm63"])) $achat = 900*3;
			
		if( $resultat1 == FALSE){
            echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
            die();
        }
    else { 
      $UneLigne1 = mysqli_fetch_assoc($resultat1);				
      if($UneLigne1['money'] >= $achat){
        $UneLigne1['money'] = $UneLigne1['money'] - $achat;
        $requete3 = "UPDATE users SET money = $UneLigne1[money] WHERE id=$_SESSION[id]";
        $resultat3 = mysqli_query($connexion, $requete3);
        if( $resultat3 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
        if($achat == 900) $U = 1 + $UneLigne1['pack_silver'];
        if($achat == 900*2) $U = 2 + $UneLigne1['pack_silver'];
        if($achat == 900*3) $U = 3 + $UneLigne1['pack_silver'];
        $requete4 = "UPDATE users SET pack_silver = '$U' WHERE id=$_SESSION[id]";
        $resultat4 = mysqli_query($connexion, $requete4);
        if( $resultat4 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
      }
    }
    header("Location:shop.php");
	  mysqli_close($connexion);
	}
  ?>

<?php	
	if(isset($_GET["confirm71"]) || isset($_GET["confirm72"]) || isset($_GET["confirm73"])){
		require "connexion.php";
    $requete1 = "SELECT * FROM users WHERE id=$_SESSION[id]";
    $resultat1 = mysqli_query($connexion, $requete1);       
    if(isset($_GET["confirm71"])) $achat = 900;
    if(isset($_GET["confirm72"])) $achat = 900*2;
    if(isset($_GET["confirm73"])) $achat = 900*3;
			
		if( $resultat1 == FALSE){
            echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
            die();
        }
    else { 
      $UneLigne1 = mysqli_fetch_assoc($resultat1);				
      if($UneLigne1['money'] >= $achat){
        $UneLigne1['money'] = $UneLigne1['money'] - $achat;
        $requete3 = "UPDATE users SET money = $UneLigne1[money] WHERE id=$_SESSION[id]";
        $resultat3 = mysqli_query($connexion, $requete3);
        if( $resultat3 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
        if($achat == 900) $U = 1 + $UneLigne1['pack_gold'];
        if($achat == 900*2) $U = 2 + $UneLigne1['pack_gold'];
        if($achat == 900*3) $U = 3 + $UneLigne1['pack_gold'];
        $requete4 = "UPDATE users SET pack_gold = '$U' WHERE id=$_SESSION[id]";
        $resultat4 = mysqli_query($connexion, $requete4);
        if( $resultat4 == FALSE){
          echo "<p>Erreur d'exécution de la requete :".mysqli_error($connexion)."</p>";
          die();
        }
      }
    }
    header("Location:shop.php");
	  mysqli_close($connexion);
	}
  ?>
  <script src="hamburger.js"></script>

  </body>
</html>