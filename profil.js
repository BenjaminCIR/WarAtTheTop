import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.es.js';


var listeALIASES = []
var listeSTAT = []
var charaT = []

var tab =  []




const btncompte = document.getElementById("comp");
const btnpacks = document.getElementById("pac");
const btncollection = document.getElementById("collect");
const btndecks = document.getElementById("dec");

const compte = document.getElementById("compte");
const packs = document.getElementById("packs");
var collection = document.getElementById("collection");
const decks2 = document.getElementById("decks");
const ordre2 = document.getElementById("ordre");
const cherche = document.getElementById("cherche");
const ecrire = document.getElementById("ecrire");



fetch('https://optc-db.github.io/common/data/aliases.js',{method:'GET'})
            .then(res => res.text())
            .then(text => {
                let position = text.search("const calcGhostStartID")
                const tableau = "listeALIASES" +  text.substring(30,position)
                eval(tableau)
                
            })
fetch('https://optc-db.github.io/common/data/units.js',{method:'GET'})
            .then(res => res.text())
            .then(text => {
                let position = text.search("var calcGhostStartID")
                const stats = "listeSTAT" +  text.substring(13,position)
                eval(stats)            
            })


function make_card(charaTT, identifiant,clickable,little=false){ // 9 10 11
    let newind = (charaTT[identifiant]).id -1
    let newid = ((charaTT[identifiant]).id).toString().padStart(4,'0')
    let millier = parseInt((charaTT[identifiant].id) / 1000).toString()
    let centaine = parseInt(((charaTT[identifiant].id) - millier*1000)/100).toString().padEnd(3,'0')
    let bloc = document.createElement("div")
    bloc.setAttribute("data",identifiant)
    let naming = document.createElement("p")
    let image2 = document.createElement("img")
    let image = document.createElement("img")
    let attaque = document.createElement("p")
    let vitesse = document.createElement("p")
    let HP = document.createElement("p")
    let crew = document.createElement("p")
    let crewlogo = document.createElement("img")
    let note = document.createElement("p")
    crew.innerText = "PIRATE"
    crewlogo.setAttribute("src","pirate.png")
    if(parseInt(charaTT[identifiant].crew_id) >= 86){
        crew.innerText = "CIVIL"
        crewlogo.setAttribute("src","civil.png")
    }
    if(parseInt(charaTT[identifiant].crew_id) == 130){
        crew.innerText = "REVOLUTIONNAIRE"
        crewlogo.setAttribute("src","revo.png")
    }
    if(parseInt(charaTT[identifiant].crew_id) == 82 || parseInt(charaTT[identifiant].crew_id) == 90){
        crew.innerText = "MARINE"
        crewlogo.setAttribute("src","marine.png")
    }

    bloc.classList.add("bloque")
    image2.setAttribute("src","fut2.png")
    image.setAttribute("src","https://optc-db.github.io//api/images/full/transparent/"+millier+"/"+centaine+"/"+newid+".png")
    image.classList.add("pic")
    image2.classList.add("card")
    naming.classList.add("naming")
    attaque.classList.add("attaque")
    HP.classList.add("HP")
    crewlogo.classList.add("crewlogo")
    vitesse.classList.add("vitesse")
    crew.classList.add("crew")
    note.classList.add("note")
    naming.innerText = (charaTT[identifiant]).name
    attaque.innerText = (listeSTAT[newind])[10] 
    HP.innerText = (listeSTAT[newind])[9]
    let sizee = ((charaTT[identifiant]).size)
    if(sizee == "") sizee = "175"
    vitesse.innerText = parseInt(10*((parseInt(attaque.innerText)**(2.5))/(parseInt(sizee.replace(" ",""))*parseInt(HP.innerText))))
    let tmpp = (parseInt(0.01*((listeSTAT[newind])[9] )**2 + parseInt( (listeSTAT[newind])[10])**2  +parseInt(10*((parseInt(attaque.innerText)**(2.5))/(parseInt(sizee.replace(" ",""))*parseInt(HP.innerText))))**(1)))/3
    if(tmpp >= 5000 && tmpp <= 50000){
        image2.setAttribute("src","fut3.png")
        //bloc.style.color = "white"
    }
    if(tmpp >= 50000 && tmpp <= 100000){
        image2.setAttribute("src","fut4.png")
        bloc.style.color = "white"
    }
    if(tmpp >= 100000 && tmpp <= 200000){
        image2.setAttribute("src","fut5.png")
        bloc.style.color = "white"
    }
    if(tmpp >= 200000 && tmpp <= 300000){
        image2.setAttribute("src","fut6.png")
        bloc.style.color = "white"
    }
    if(tmpp > 300000){
        naming.style.color = "#fec832"
        image2.setAttribute("src","fut7.png")
        anime({
            targets:naming,
            endDelay: 1000,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true,
            color :"#f6363a"

        })
    }
    note.innerText = parseInt(tmpp).toString()
    bloc.append(image2)
    bloc.appendChild(image)
    bloc.appendChild(naming)
    bloc.append(attaque)
    bloc.append(HP)
    bloc.append(vitesse)
    bloc.append(crew)
    bloc.append(crewlogo)
    //bloc.append(note)

    return bloc
}

setTimeout(function(){
    fetch('./chara.json',{method:'GET'})
        .then(res1 => res1.text())
        .then(text1 => {
            eval("charaT ="+text1)
            //console.log(text1[0])

            console.log(charaT)
            setTimeout(function(){
                for(var i=0;i< charaT.length;i++){
                    
                    if(cards.includes((charaT[i].id).toString())){
                        let bloc = make_card(charaT,i,true)
                        tab.push(bloc)
                        document.getElementById("collection").appendChild(bloc)
                    }
                }
            });
        })








    fcompte();

    function fcompte() {
        document.body.overflow = "visible"
        setTimeout(function(){
            window.scrollTo(0,0)
        },1)
        setTimeout(function(){
            document.body.overflow = "hidden"
        },2)
        btncompte.addEventListener("click", function(){
            fcompte();
        })
        btnpacks.addEventListener("click", function(){
            compte.classList.remove("affiche");
            compte.classList.add("left");
            packs.classList.remove("right");
            packs.classList.add("affiche");
            fpacks();
        })
        btncollection.addEventListener("click", function(){
            compte.classList.remove("affiche");
            compte.classList.add("left");
            packs.classList.remove("right");
            packs.classList.add("left");
            collection.classList.remove("right");
            collection.classList.add("affiche");
            ordre2.classList.remove("right");
            ordre2.classList.add("affiche2");
            cherche.classList.remove("right");
            cherche.classList.add("affiche3");
            fcollection();
        })
        btndecks.addEventListener("click", function(){
            compte.classList.remove("affiche");
            compte.classList.add("left");
            packs.classList.remove("right");
            packs.classList.add("left");
            collection.classList.remove("right");
            collection.classList.add("left");
            ordre2.classList.remove("right");
            ordre2.classList.add("left");
            cherche.classList.remove("right");
            cherche.classList.add("left");
            decks2.classList.remove("right");
            decks2.classList.add("affiche");
            fdecks();
        })
    }

    function fpacks(){
        document.body.overflow = "visible"
        setTimeout(function(){
            window.scrollTo(0,0)
        },1)
        setTimeout(function(){
            document.body.overflow = "hidden"
        },2)
        btncompte.addEventListener("click", function(){
            packs.classList.remove("affiche");
            packs.classList.add("right");
            compte.classList.remove("left");
            compte.classList.add("affiche");
            fcompte();
        })
        btncollection.addEventListener("click", function(){
            packs.classList.remove("affiche");
            packs.classList.add("left");
            collection.classList.remove("right");
            collection.classList.add("affiche");
            ordre2.classList.remove("right");
            ordre2.classList.add("affiche2");
            cherche.classList.remove("right");
            cherche.classList.add("affiche3");
            fcollection();
        })
        btndecks.addEventListener("click", function(){
            packs.classList.remove("affiche");
            packs.classList.add("left");
            collection.classList.remove("right");
            collection.classList.add("left");
            ordre2.classList.remove("right");
            ordre2.classList.add("left");
            cherche.classList.remove("right");
            cherche.classList.add("left");
            decks2.classList.remove("right");
            decks2.classList.add("affiche");
            fdecks();
        })
    }

    function fcollection() {
        document.body.overflow = "visible"
        setTimeout(function(){
            window.scrollTo(0,0)
        },1)
        setTimeout(function(){
            document.body.overflow = "hidden"
        },2)
        btncompte.addEventListener("click", function(){
            collection.classList.remove("affiche");
            collection.classList.add("right");
            ordre2.classList.remove("affiche2");
            ordre2.classList.add("right");
            cherche.classList.remove("affiche3");
            cherche.classList.add("right");
            packs.classList.remove("left");
            packs.classList.add("right");
            compte.classList.remove("left");
            compte.classList.add("affiche");
            fcompte();
        })
        btnpacks.addEventListener("click", function(){
            collection.classList.remove("affiche");
            collection.classList.add("right");
            ordre2.classList.remove("affiche2");
            ordre2.classList.add("right");
            cherche.classList.remove("affiche3");
            cherche.classList.add("right");
            packs.classList.remove("left");
            packs.classList.add("affiche");
            fpacks();
        })
        btndecks.addEventListener("click", function(){
            collection.classList.remove("affiche");
            collection.classList.add("left");
            ordre2.classList.remove("affiche2");
            ordre2.classList.add("left");
            cherche.classList.remove("affiche3");
            cherche.classList.add("left");
            decks2.classList.remove("right");
            decks2.classList.add("affiche");
            fdecks();
        })
    }

    function fdecks() {
        document.body.overflow = "visible"
        setTimeout(function(){
            window.scrollTo(0,0)
        },1)
        setTimeout(function(){
            document.body.overflow = "hidden"
        },2)
        btncompte.addEventListener("click", function(){
            decks2.classList.remove("affiche");
            decks2.classList.add("right");
            collection.classList.remove("left");
            collection.classList.add("right");
            ordre2.classList.remove("left");
            ordre2.classList.add("right");
            cherche.classList.remove("left");
            cherche.classList.add("right");
            packs.classList.remove("left");
            packs.classList.add("right");
            compte.classList.remove("left");
            compte.classList.add("affiche");
            fcompte();
        })
        btnpacks.addEventListener("click", function(){
            decks2.classList.remove("affiche");
            decks2.classList.add("right");
            collection.classList.remove("left");
            collection.classList.add("right");
            ordre2.classList.remove("left");
            ordre2.classList.add("right");
            cherche.classList.remove("left");
            cherche.classList.add("right");
            packs.classList.remove("left");
            packs.classList.add("affiche");
            fpacks();
        })
        btncollection.addEventListener("click", function(){
            decks2.classList.remove("affiche");
            decks2.classList.add("right");
            collection.classList.remove("left");
            collection.classList.add("affiche");
            ordre2.classList.remove("left");
            ordre2.classList.add("affiche2");
            cherche.classList.remove("left");
            cherche.classList.add("affiche3");
            fcollection();
        })
    }
},1000);

const rhaut = document.getElementById("rhaut");
const rbas = document.getElementById("rbas");
const ahaut = document.getElementById("ahaut");
const abas = document.getElementById("abas");

rhaut.addEventListener("click", function(){

    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut2.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut3.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut4.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut5.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut6.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut7.png"){
            collection.appendChild(tab[j])
        }
    }
});
rbas.addEventListener("click", function(){

    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut7.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut6.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut5.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut4.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut3.png"){
            collection.appendChild(tab[j])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[0].getAttribute("src") == "fut2.png"){
            collection.appendChild(tab[j])
        }
    }
});
ahaut.addEventListener("click", function(){
    tab.sort(function(a, b){
        return a.children[2].innerHTML.localeCompare(b.children[2].innerHTML);
    })
    for(let j=0; j< tab.length; j++){
        collection.appendChild(tab[j])
    }
});
abas.addEventListener("click", function(){
    tab.sort(function(a, b){
        return b.children[2].innerHTML.localeCompare(a.children[2].innerHTML);
    })
    for(let j=0; j< tab.length; j++){
        collection.appendChild(tab[j])
    }
});

ecrire.addEventListener("input", function(){
    for(let i=0; i<tab.length; i++){
        collection.appendChild(tab[i])
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[2].innerHTML.toLowerCase().search(ecrire.value.toLowerCase()) == -1){
            collection.removeChild(tab[j])
        }
    }
})