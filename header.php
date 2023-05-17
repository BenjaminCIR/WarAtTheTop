<header>
    <div id="root">
        <nav id="topnav" class="topnav">
            <button id="liste"><img id="hamburger" src="Hamburger_icon_B.png"></button>

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
                    <input name="password" class="texte" type="password" placeholder="Mot de Passe" required></input>
                    
                    <input name="submit" class="envoyer" type="submit" value="SE CONNECTER"></input>
                </form>
            <?php }

            if(isset($_SESSION['id'])){
                $ident = $_SESSION['id'];
                $requetepseudo= "SELECT * FROM users WHERE id='$ident'";
				require "connexion.php";
				$resultatpseudo = mysqli_query($connexion,$requetepseudo);
				$rowpseudo = mysqli_fetch_assoc($resultatpseudo);
                $pseudonyme = $rowpseudo['pseudo'];

                echo '<a href="profil.php" id="profil">'.$pseudonyme.'</a>';
                echo '<a href="shop.php" id="shop">Boutique</a>';
            }
            ?>
        </nav>
    </div>
</header>