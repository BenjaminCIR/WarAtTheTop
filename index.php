<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>One Piece : War at the top</title>
		<link rel="stylesheet" href="style.css">
		<link rel="stylesheet" href="header.css">
		<style>
			body { margin: 0; }
		</style>
	</head>

	<?php
		session_start();
		
		if(empty($_SESSION['id'])) session_destroy();

		if(isset($_SESSION['id'])){
			$reqeu = "SELECT progressionhistoire FROM users WHERE id = $_SESSION[id]";
			include "connexion.php";
			$resultate = mysqli_query($connexion,$reqeu);
			$rowe = mysqli_fetch_assoc($resultate);
			mysqli_close($connexion);
			$tmp = $rowe['progressionhistoire'];
			echo "<script> var progression = $tmp </script>";
		}

		if(isset($_POST['submit'])){
			if(isset($_POST['username']) &&  isset($_POST['password'])){
		
				$usernameclient = $_POST['username'];
				$passwordclient = $_POST['password'];

				if($usernameclient != "" && $passwordclient != ""){
		
					$requete= "SELECT * FROM users WHERE pseudo='$usernameclient'"; // on selectionne le mdp correspondant au pseudo indiqué
					require "connexion.php";
					$resultat = mysqli_query($connexion,$requete);
					$row = mysqli_fetch_assoc($resultat);
					if( empty($row['password'])) header('Location:login.php?err=1'); // si le mdp est vide cela signifie que l'utilisateur n'existe pas on renvoie l'erreur 1
					else{
						mysqli_close($connexion);
						if( $passwordclient == $row['password']){ // si le mdp est correct on demarre la dessions et on met en variable $_SESSION l'id de l'utilisateur
							session_start();
							$_SESSION['id'] = $row['id'];
							header('Location:index.php');
						}
						else header('Location:login.php?err=2'); // si le mdp est incorrect on retourne l'erreur 2
					}
				}       		
			}
		}
	?>


	<body>
		<img id="backgroud" src="BACKGROUND.jpg">

		<?php
			include "header.php";
		?>


	
		<!-- <div id="tool">
			<input value="1" id="idlieu" type="text">
			<button id="phi+">PHI +</button>
			<button   id="phi-">PHI -</button>
			<button   id="theta+">THETA +</button>
			<button id="theta-">THETA -</button>
			<br>
			<input placeholder="theta" id="thetaint" value="3.14" type="text">
			<input placeholder="phi" id="phiint" value="3.14" type="text">
			<button id="sett"> SET </button>
			<button id="gett"> GET </button>
			
		</div>
		<div id="tool">
		</div> -->

		<div id="menu">
			<button id="history" <?php if(empty($_SESSION['id'])) echo 'style="display:none;"'?> ><span>HISTOIRE</span></button>
		</div>

		<button id="back" style="display: none;">BACK</button>

		<div id="niveaux" class="listeNiv">

		</div>
		<script type="module" src="app.js">
			// Our Javascript will go here.
		</script>
		<script src="hamburger.js"></script>
	</body>
</html>