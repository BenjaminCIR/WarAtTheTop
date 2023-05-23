
window.addEventListener('load', function() {
    var btnEnregistrer = document.querySelector('.btn-enregistrer');
    if (btnEnregistrer) {
      btnEnregistrer.addEventListener('click', function() {
        document.querySelector('.connexion').classList.add('remove-section');
        document.querySelector('.enregistrer').classList.remove('active-section');
        document.querySelector('.btn-enregistrer').classList.remove('active');
        document.querySelector('.btn-connexion').classList.add('active');
      });
    }
});

window.addEventListener('load', function() {
    var btnConnexion = document.querySelector('.btn-connexion');
    if (btnConnexion) {
        btnConnexion.addEventListener('click', function() {
        document.querySelector('.connexion').classList.remove('remove-section');
        document.querySelector('.enregistrer').classList.add('active-section');
        document.querySelector('.btn-enregistrer').classList.add('active');
        document.querySelector('.btn-connexion').classList.remove('active');
      });
    }
});
  
function handlePasswordInput(passwordInput) {
	const lastCharacter = passwordInput.value.charAt(passwordInput.value.length - 1);
	passwordInput.value = passwordInput.value.slice(0, -1).replace(/./g, '*') + lastCharacter;
}
function redirection() {
  window.location.href = "http://localhost/WarAtTheTop/index.php";  // Remplacez l'URL par celle que vous souhaitez
}