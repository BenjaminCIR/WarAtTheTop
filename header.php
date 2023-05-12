<header>
    <div id="root">
        <nav id="topnav" class="topnav">
            <button id="liste"><img id="hamburger" src="Hamburger_icon_B.png"></button>
            
            <button id="back" style="display: none;">HOME</button>

            <div class="topnav_menu">
                <ul>
                    <?php if(empty($_SESSION['id'])){ ?>
                    <a href="login.php#connexion">Connexion</a>
                    <a href="login.php?check=true">Inscription</a>
                    <?php } if(isset($_SESSION['id'])){ ?>
                    <a href="setup.php">Paramètres</a>
                    <a href="deconnexion.php">Déconnexion</a>
                    <?php } ?>
                </ul>
            </div>


            <?php if(empty($_SESSION['id'])) { ?>
                <form class="connect" action="" method="POST">

                    <input name="username" class="texte" type="text" placeholder="Identifiant" required></input>
                    <input name="password" class="texte" type="text" placeholder="Mot de Passe" required></input>
                    
                    <input name="submit" class="envoyer" type="submit" value="SE CONNECTER"></input>
                </form>
            <?php } ?>

            <?php 
            if(isset($_SESSION['id'])) { 
                if(isset($_GET['err'])) $err = $_GET['err'];
                else $err=""; // on recupère les informations d'erreur si il y en a une
                if(isset($_COOKIE['usernamepre'])) $usr = $_COOKIE['usernamepre']; // ainsi que les cookie de préremplissage si ils existent
                else $usr="";
                if(isset($_COOKIE['mdppre'])) $mdp = $_COOKIE['mdppre'];
                else $mdp="";
                
            ?>
                
                <div class="infos"><?php echo $usr;?></div>
            <?php } ?>
        </nav>
    </div>
</header>