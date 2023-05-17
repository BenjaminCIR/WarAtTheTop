// ------------------ Menu déroulant ----------------------
const hamburger = document.getElementById("liste");
const menu = document.getElementsByClassName("topnav_menu")[0];

hamburger.addEventListener("click", () => {
    hamburger.setAttribute("disabled", "");
    menu.classList.toggle("top");
    if(hamburger.hasAttribute("disabled")){
        setTimeout(function(){
            hamburger.removeAttribute("disabled");
        },500);
    }
    if(menu.classList.contains("index")){
        menu.classList.toggle("index");
    }
    else {
        setTimeout(function(){
            menu.classList.toggle("index");
        },500);
    }
});