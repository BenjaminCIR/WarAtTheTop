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
    $raquete = "SELECT progressionhistoire,money FROM users WHERE id = $_POST[userid]";
    include "connexion.php";
    $qer = mysqli_query($connexion,$raquete);
    $rep = mysqli_fetch_assoc($qer);
    $num = $rep['progressionhistoire'];
    $money = $rep['money'];
    $tmpr = $_POST['actlvl'];
    echo $tmpr;
    echo $num;

    $money+= $_POST['moneywin'];

    $requete = "UPDATE users SET money = '$money' WHERE id = $_POST[userid]";
    
    $num+=1;
    if($tmpr == $num){
        $requete = "UPDATE users SET progressionhistoire = '$num', money = '$money' WHERE id = $_POST[userid]";

    }

    mysqli_query($connexion,$requete);
    mysqli_close($connexion);
   
}

if(isset($_POST["deck"]) && isset($_POST["userid"])){
    $deck = $_POST["deck"];
    $id = $_POST["userid"];

    $raquete = "SELECT decks FROM users WHERE id = $id";


    include "connexion.php";
    $qer = mysqli_query($connexion,$raquete);
    $rep = mysqli_fetch_assoc($qer);
    $oldeck = $rep['decks'];

    $newdeck1 = $oldeck.$deck;


    if(isset($_POST['up'])){
        $up = $_POST['up'];
        $tmpdeck = explode(";",$oldeck);
        print_r($tmpdeck);
        echo $oldeck;
        $newdeck = "";
        echo $up;
        $tmpdeck[$up-1] = $deck;
        print_r($tmpdeck);
        for($o = 0; $o < count($tmpdeck)-1; $o++){
            $newdeck = $newdeck.$tmpdeck[$o].";";
        }
        $newdeck1 =  substr($newdeck,0,strlen($newdeck)-1);
    }
    echo"<br>";
    echo $newdeck1;

    $requete = "UPDATE users SET decks = '$newdeck1' WHERE id = $id";
    mysqli_query($connexion,$requete);
    mysqli_close($connexion);


    
}
?>