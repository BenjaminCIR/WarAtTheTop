<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<link rel="stylesheet" href="style.css">
		<style>
			body { margin: 0; }
		</style>
	</head>
	<body>
		<?php
		 	session_start(); 
			if(isset($_POST['login']) &&  isset($_POST['password'])){
				include "connexion.php";
				$pseudo = $_POST['login'];
				$password = $_POST['password'];
				$req = "SELECT * FROM users WHERE pseudo = '$pseudo'";
				$resp = mysqli_query($connexion,$req);	
				$user = mysqli_fetch_assoc($resp);
				if($user["password"] == $password){
					$_SESSION['id'] = $user['id'];

				}
		

				
			}
			

			
		?>

		<header>
			<form action="" method="post">
				<input type="text" name="login" id="login" placeholder="Pseudo">
				<input type="text" name="password" id="password" placeholder="Mot de Passe">
				<input type="submit" value="Connexion">
			</form>
		</header>
		<!-- TOOL
		<div id="tool">
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
			
		</div>-->
		<button id="back">BACK</button>
		<div id="tool">
		<button id="test"> TEST </button>
		</div>
		<div id="menu">
			<button id="history"><span>HISTOIRE</span></button>
		</div>

		<div id="niveaux">
			<?php
				for($i=0; $i < 131;$i++){
					echo "<button class='buttonlvl' id='lieu".$i."'></button>";
				}
			
			
			
			?>
		</div>
		<script type="module" src="app.js">
			

			// Our Javascript will go here.
		</script>
	</body>
</html>