<?php
if(isset($_POST['ids'])){
    $id = $_POST['userid'];
    include "connexion.php";
    $rq = "SELECT cards,money FROM users WHERE id=$id";
    $r = mysqli_query($connexion,$rq);
    $f = mysqli_fetch_assoc($r);
    $new = $f['cards'].$_POST['ids'];
    $money = $f['money'];
    echo $money;
    $money += $_POST['money'];
    echo $money;

    if($_POST['pack']== 0){
        $z = 'pack_east_blue';
    }
    if($_POST['pack']== 1){
        $z = 'pack_west_blue';
    }
    if($_POST['pack']== 2){
        $z = 'pack_north_blue';
    }
    if($_POST['pack']== 3){
        $z = 'pack_south_blue';
    }
    
    
    if($_POST['pack']== 4){
        $z = 'pack_bronze';
    }
    if($_POST['pack']== 5){
        $z = 'pack_silver';
    }
    
    if($_POST['pack']== 6){
        $z = 'pack_gold';
    }
    
    $y = $_POST['nbpack'] - 1;
    
    
    $nr = "UPDATE users SET cards = '$new', $z = '$y', money='$money' WHERE id=$id";
    echo $new;
    mysqli_query($connexion,$nr);
    mysqli_close($connexion);

}

if(isset($_POST['actlvl']) && isset($_POST['userid'])){
    $raquete = "SELECT progressionhistoire FROM users WHERE id = $_POST[userid]";
    include "connexion.php";
    $qer = mysqli_query($connexion,$raquete);
    $rep = mysqli_fetch_assoc($qer);
    $num = $rep['progressionhistoire'];
    $tmpr = $_POST['actlvl'];
    echo $tmpr;
    echo $num;

    
    $num+=1;
    if($tmpr == $num){
        $requete = "UPDATE users SET progressionhistoire = '$num' WHERE id = $_POST[userid]";
        mysqli_query($connexion,$requete);
        mysqli_close($connexion);
    }

   
}

if(isset($_POST["deck"]) && isset($_POST["userid"])){
    $deck = $_POST["deck"];
    $id = $_POST["userid"];

    $raquete = "SELECT decks FROM users WHERE id = $id";
    include "connexion.php";
    $qer = mysqli_query($connexion,$raquete);
    $rep = mysqli_fetch_assoc($qer);
    $oldeck = $rep['decks'];
    $newdeck = $oldeck.$deck;

    $requete = "UPDATE users SET decks = '$newdeck' WHERE id = $id";
    mysqli_query($connexion,$requete);
    mysqli_close($connexion);


    
}
?>