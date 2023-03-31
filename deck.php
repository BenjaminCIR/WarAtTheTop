<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styliste.css">
    <title>Document</title>
</head>
<body>
    <?php

        session_start();
        if(isset($_SESSION['id'])){
            $id = $_SESSION['id'];

            include "connexion.php";
            $req = "SELECT cards FROM users WHERE id =$id";
            $resp = mysqli_query($connexion,$req);	
            $user = mysqli_fetch_assoc($resp);
            $tab = explode(",",$user["cards"]);
            echo"
            <script type='text/javascript'>
                var cards = ".json_encode($tab)."
            </script>";


        }
    
    
    ?>
    <script src="deck.js"></script>
    <div id="list"></div>
</body>
</html>