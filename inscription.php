<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Inscription</title>
		<link rel="stylesheet" href="inscription.css">
        <script src="inscription.js"></script>
        
	</head>
    <body>         
        <div class="content">
        <img class="bg-img" src="mainback2.jpg" alt="">
            <div class="container">
                <img class="bg-img" src="Onepiece2.jpg" alt="">
                    <div class="menu">
                        <a href="#connexion" class="btn-connexion"><h2>Connexion</h2></a>
                        <a href="#enregistrer" class="btn-enregistrer active"><h2>Inscription</h2></a>
                    </div>
                    <div class="connexion">
                        <div class="contact-form">
                            <label>Pseudonyme</label>
                            <input placeholder="" type="text">
                            
                            <label>Mot de Passe</label>
                            <input placeholder="" type="text">
                            
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
                            
                            <input class="submit" value="Se Connecter" type="submit">
                        </div>
                        
                        <hr>
                        <a href="https://aurion.junia.com/faces/Login.xhtml" cursor="pointer" target="_blank"><h4>Mot de Passe Oublié ?</h4></a>
                    </div>
                    
                    <div class="enregistrer active-section">
                        <div class="contact-form">
                            <label>Pseudonyme</label>
                            <input placeholder="" type="text">
                            
                            <label>e-mail</label>
                            <input placeholder="" type="text">	
                            
                            <label>Mot de Passe</label>
                            <input placeholder="" type="text">
                            
                            <label>Confirmation du Mot de Passe</label>
                            <input placeholder="" type="text">
                            
                            <div class="check">
                                <label>				
                                    <input id="check" type="checkbox" class="checkbox">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="23px">
                                            <path class="path-back"  d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"/>
                                            <path class="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"/>
                                        </svg>
                                </label>
                                <h3>Je suis d'accord</h3>
                            </div>
                            
                            <input class="submit" value="S'inscrire" type="submit">
                        </div>
                    </div>
                    
            </div>

        </div>


    </body> 
</html>