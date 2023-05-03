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
    
    if(isset($_SESSION['id'])){
        
        $usernameid = $_SESSION['id'];
        $user = $_SESSION['username'];
        $pass = $_SESSION['password'];
        $requete= "SELECT pseudo,password FROM users WHERE pseudo='$usernameid'"; // on selectionne le mdp correspondant au pseudo indiqué
        include "connexion.php";
        $resultat = mysqli_query($connexion,$requete);
        $row = mysqli_fetch_assoc($resultat);        
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
                        $_SESSION['username'] = $row['username'];
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
                            <input placeholder="" type="text">
                            
                            <label>e-mail</label>
                            <input placeholder="" type="text">	
                            
                            <label>Mot de Passe</label>
                            <input placeholder="" type="password" >
                            
                            <label>Confirmation du Mot de Passe</label>
                            <input placeholder="" type="password">
                            
                            <div class="check">
                                <label>				
                                    <input id="check" type="checkbox" class="checkbox">
                                        <svg width="26px" height="23px">
                                            <path class="path-back"  d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"/>
                                            <path class="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"/>
                                        </svg>
                                </label>
                                <h3>Je suis d'accord</h3>
                            </div>
                            
                            <input name="submit" class="submit" value="S'inscrire" type="submit">
                        </div>
                    </form>
                    
                </div>

        </div>


    </body> 
</html>