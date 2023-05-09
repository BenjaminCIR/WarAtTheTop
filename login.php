<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Inscription</title>
		<link rel="stylesheet" href="login.css">
        <script src="login.js"></script>
            
	</head>

    <?php
    session_start();
    
    if(isset($_SESSION['id']) && isset($_SESSION['username']) && isset($_SESSION['password'])){
        $usernameid = $_SESSION['id'];
        $user = $_SESSION['username'];
        $pass = $_SESSION['password'];
    }
    else session_destroy();

    if(isset($_POST['submit'])){ // script de recuperation des infos de connexion
        if(isset($_POST['username']) && isset($_POST['password']))
        {
            
            $usernameclient = $_POST['username'];
            $passwordclient = $_POST['password'];

       

            if($usernameclient != "" && $passwordclient != ""){
             
                $requete= "SELECT id,password FROM users WHERE pseudo='$usernameclient'"; // on selectionne le mdp correspondant au pseudo indiqué
                include "connexion.php";
                $resultat = mysqli_query($connexion,$requete);
                $row = mysqli_fetch_assoc($resultat);
                if( empty($row['password'])) header('Location:login.php?err=1'); // si le mdp est vide cela signifie que l'utilisateur n'existe pas on renvoie l'erreur 1
                else{
                    mysqli_close($connexion);
                    if( $passwordclient == $row['password']){ // si le mdp est correct on demarre la dessions et on met en variable $_SESSION l'id de l'utilisateur
                        session_start();
                        $_SESSION['id'] = $row['id'];
                        $_SESSION['username'] = $row['pseudo'];
                        $_SESSION['password'] = $row['password'];
                        setcookie('usernamepre', $usernameclient, time() +3600); // on met aussi en place un cookie contenant les login de l'utilisateur pendant 1h permettant de préremplir le formulaire de connexion avec le dernière utilisateur connécté
                        setcookie('mdppre', $passwordclient, time() +3600);
                        header('Location:index.php');
                    }
                    
                    else header('Location:login.php?err=2'); // si le mdp est incorrect on retourne l'erreur 2
                }
            }
            
        }
    }
    ?>

    <body>     
        <div class="content">
        <img class="bg-img" src="mainback2.jpg" alt="">
            <div class="container">
                <img class="bg-img" src="Onepiece2.jpg" alt="">
                    <?php
                        if(isset($_GET['err'])) $err = $_GET['err'];
                        else $err=""; // on recupère les informations d'erreur si il y en a une
                        if(isset($_COOKIE['usernamepre'])) $usr = $_COOKIE['usernamepre']; // ainsi que les cookie de préremplissage si ils existent
                        else $usr="";
                        if(isset($_COOKIE['mdppre'])) $mdp = $_COOKIE['mdppre'];
                        else $mdp="";
                    ?>
                    <div class="menu">
                        <a href="#connexion" class="btn-connexion"><h2>Connexion</h2></a>
                        <a href="#enregistrer" class="btn-enregistrer active"><h2>Inscription</h2></a>
                    </div>
                    <form class="connexion"  action="" method="POST">
                        <div class="contact-form">
                            <label>Pseudonyme</label>
                            <input placeholder="" type="text" <?php if(isset($usr)) echo"value='$usr'"; else echo"value='$user'";?> name="username" required>
                            <?php if($err == 1) echo "<p style='color:red'>Utilisateur introuvable</p>"; ?>

                            <label>Mot de Passe</label>
                            <input placeholder="" type="password" <?php if(isset($mdp)) echo"value='$mdp'"; else echo"value='$pass'";?> name="password" required>
                            <?php if($err == 2) echo "<p style='color:red'>Mot de passe incorrect</p>"; ?>

                            <div class="check">
                                <label>				
                                    <input id="check" type="checkbox" class="checkbox">
                                        <svg width="26px" height="23px">
                                            <path class="path-back"  d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"/>
                                            <path class="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"/>
                                        </svg>
                                </label>
                                <h3>Rester connecté</h3>
                            </div>
                            
                            <input name="submit" class="submit" value="Se Connecter" type="submit">
                        </div>
                        
                        <hr>
                        <a href="https://aurion.junia.com/faces/Login.xhtml" cursor="pointer" target="_blank"><h4>Mot de Passe Oublié ?</h4></a>
                    </form>
                    
                    <form class="enregistrer active-section"  action="" method="POST">
                        <div class="contact-form">
                            <label>Pseudonyme</label>
                            <input placeholder="" type="text" name="usernameinscr" required>
                            
                            <label>e-mail</label>
                            <input placeholder="" type="text" name="mail" required>	
                            
                            <label>Mot de Passe</label>
                            <input placeholder="" type="password" name="passwordinscr" required>
                            
                            <label>Confirmation du Mot de Passe</label>
                            <input placeholder="" type="password" name="passwordverif" required>
                            
                            <?php
                                if (isset($_GET['err'])) {
                                    $err = $_GET['err'];
                                    if ($err == 4) {
                                        echo '<script>alert("Pseudo déjà pris");</script>';
                                    }
                                    if ($err == 5) {
                                        echo '<script>alert("E-mail déjà prise");</script>';
                                    }
                                    if ($err == 6) {
                                        echo '<script>alert("adresse e-mail est mauvaise");</script>';
                                    }
                                    if ($err == 3) {
                                        echo '<script>alert("Mots de passe différents");</script>';
                                    }
                                }
                            ?>
                            
                            <div class="check">
                                <label>				
                                    <input id="check" type="checkbox" class="checkbox">
                                        <svg width="26px" height="23px">
                                            <path class="path-back"  d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"/>
                                            <path class="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"/>
                                        </svg>
                                </label>
                                <h3>Rester connecté</h3>
                            </div>
                            
                            <input name="submitinscr" class="submit" value="S'inscrire" type="submit">
                        </div>
                    </form>
                    
                </div>

        </div>  
    </body> 
    <?php
        // script d'inscription
        if(isset($_POST['submitinscr'])){
            if(isset($_POST['usernameinscr']) && isset($_POST['mail']) && isset($_POST['passwordinscr']) && isset($_POST['passwordverif'])){
                $usernameinscr = $_POST['usernameinscr'];
                $mailinscr = $_POST['mail'];
                $passwordinscr = $_POST['passwordinscr'];
                $passwordverif = $_POST['passwordverif'];
                $a = 0;

                // verif si l'username n'est pas déjà pris
                $requetepseudo = "SELECT * FROM users WHERE pseudo='$usernameinscr'";
                $requetemail = "SELECT * FROM users WHERE email='$mailinscr'";
                include "connexion.php";
                $requete_resultat = mysqli_query($connexion,$requetepseudo);
                $requete_resultat1 = mysqli_query($connexion,$requetemail);
                mysqli_close($connexion);


                if($usernameinscr != "" && $mailinscr != "" && $passwordinscr != "" && $passwordinscr != "" && $passwordverif != ""){

                    if(mysqli_num_rows($requete_resultat)==1){
                        echo"prou";
                        header('Location:login.php?err=4&check=1');
                        $a = 1; // si le pseudo est deja prit on renvoie l'erreur 4
                    }
                    else {
                        if(mysqli_num_rows($requete_resultat1)==1){
                            header('Location:login.php?err=5&check=1');
                            $a = 1; // si l'e-mail est deja prit on renvoie l'erreur 5
                        }
                        else {
                            $pattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
                            if(!preg_match($pattern, $mailinscr)){
                                header('Location:login.php?err=6&check=1');
                                $a = 1; // si l'adresse e-mail est mauvaise, on renvoie l'erreur 6
                            }

                        }
                    }
                    
                        
                    if($passwordinscr == $passwordverif && $a == 0){// verification que les 2 mdp sont identiques
                        $requete1= "INSERT INTO users VALUES(NULL, '$usernameinscr', '$passwordinscr',0,0,0,'$mailinscr',3,0,0,3,0,0,0)";// on met par defaut une photo de profil de base qu'on pourra modifier plus tard sur la page index.php
                        include "connexion.php";
                        $resultat1 = mysqli_query($connexion,$requete1);
                        mysqli_close($connexion);
                        header('Location:login.php');
                    }
                    elseif($a == 0) header('Location:login.php?err=3&check=1');// si ils ne le sont pas, on renvoit l'erreur 3 ainsi que la variage $_GET[check] servant a resté sur l'onglet inscription
                }
                
            } 
        }
    ?>
</html>