import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.es.js';
var newscard

var listeALIASES = []
var listeSTAT = []
var charaT = []

var tab =  []
var tabchoix =  []

var nbpack = -1
var vraipack = -1

var clicked = []
var countclicked = 0
var actualpack = -1
var srcim = -1


var cartes = []
var selected = []
var deckactif = false

var isdeckclicked = -1


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

var cchoix = document.createElement("div");



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
    attaque.innerText = (listeSTAT[newind])[13] 
    HP.innerText = (listeSTAT[newind])[12]
    let sizee = ((charaTT[identifiant]).size)
    if(sizee == "") sizee = "175"
    vitesse.innerText = parseInt(10*((parseInt(attaque.innerText)**(2.5))/(parseInt(sizee.replace(" ",""))*parseInt(HP.innerText))))
    let tmpp = (parseInt(0.01*((listeSTAT[newind])[12] )**2 + parseInt( (listeSTAT[newind])[13])**2  +parseInt(10*((parseInt(attaque.innerText)**(2.5))/(parseInt(sizee.replace(" ",""))*parseInt(HP.innerText))))**(1)))/3
    if(tmpp >= 100000 && tmpp <= 300000){
        image2.setAttribute("src","fut3.png")
        //bloc.style.color = "white"
    }
    if(tmpp >= 300000 && tmpp <= 500000){
        image2.setAttribute("src","fut4.png")
        bloc.style.color = "white"
    }
    if(tmpp >= 500000 && tmpp <= 700000){
        image2.setAttribute("src","fut5.png")
        bloc.style.color = "white"
    }
    if(tmpp >= 700000 && tmpp <= 900000){
        image2.setAttribute("src","fut6.png")
        bloc.style.color = "white"
    }
    if(tmpp > 900000){
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
    for (let i = 0; i < cards.length; i++){
        clicked[identifiant] = false;
    }
    let clique = false
    if(clickable && deckactif == true){
        bloc.addEventListener("click",function(){
           
 
            if(clicked[identifiant] == false && countclicked < 15){
                countclicked+=1
                
                for (let i = 0; i <= cartes.length; i++) {
                    if (typeof cartes[i] == "undefined") {
                        cartes[i] = bloc.cloneNode(true);
                        cartes[i].classList.remove("bloque")
                        cartes[i].classList.add("bloquechoix")
                        let blocc = cartes[i]
                        blocc.addEventListener("click",function(){
                            let dt = blocc.getAttribute("data")
                            let cor = document.querySelector(".cdeck .bloque[data='"+dt+"']")
                            cor.click()
                        })
                        cartes[i].style.left = 10+i*4.5 +"%"
                        cchoix.append(cartes[i]);
                        break;
                    }
                }


                bloc.style.filter = 'grayscale(100%)'
                bloc.style.opacity = '0.5'
                clicked[identifiant] = true
                clique = true
            }
            if(clicked[identifiant] == true && clique == false){
                countclicked -=1

                
                for (let i = 0; i <= cartes.length; i++) {
                    if(cartes[i].getAttribute("data") == identifiant) {
                        for (let j = i+1; j < cartes.length; j++) {
                            cartes[j].style.left = 10+(j-1)*4.5 +"%"
                        }
                        cchoix.removeChild(cartes[i]);
                        cartes.splice(i, 1);
                        break;
                    }
                }



                bloc.style.filter = 'grayscale(0%)'
                bloc.style.opacity = '1'
                clicked[identifiant] = false
            }

            if(clicked[identifiant] == true) {
                selected.push(identifiant);
            }
            if(clicked[identifiant] == false) {
                let index = selected.indexOf(identifiant);
                if(index !== -1) {
                    selected.splice(index, 1);
                }
            }
            if(countclicked == 15){
                document.getElementById("validerdeck").removeAttribute("disabled")
            }
            else{
                document.getElementById("validerdeck").setAttribute("disabled","")
            }

            /*if(countclicked == 15){
                document.getElementById("start").removeAttribute("disabled")
            }
            else{
                document.getElementById("start").setAttribute("disabled","")
            }*/
            clique = false









        })
    }

    return bloc
}

setTimeout(function(){
    fetch('./chara.json',{method:'GET'})
        .then(res1 => res1.text())
        .then(text1 => {
            eval("charaT ="+text1)

            setTimeout(function(){
                for(var i=0;i< charaT.length;i++){
                    
                    if(cards.includes((charaT[i].id).toString())){
                        let bloc = make_card(charaT,i,true)
                        tab.push(bloc)
                        deckactif = true
                        let bloc2 = make_card(charaT,i,true)
                        tabchoix.push(bloc2)
                        deckactif = false
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

        for (let i=1; i<=12; i++){
            tabdeck[i] = document.getElementById("deck"+i);
            if(tabdeck[i].getAttribute("data") == 'true'){
                let thedek = decks[i-1].split(",");
                let thedek2 = []
                for(let kk=0; kk < thedek.length; kk++){
                    thedek2.push(parseInt(thedek[kk]))
            
                }
                let divdek = document.createElement("div")

                for(let k=0; k<15;k++){
                    let idd = charaT.findIndex((element) => element.id == thedek2[k])  
                    let car = make_card(charaT,idd)
                    car.classList.remove("bloque")
                    car.classList.add("bloquechoix2")
                    car.style.left = 50*((i+1)%2) +4+ k*2 + "%"
                    divdek.appendChild(car)

                }


                divdek.classList.add("divdek")
                tabdeck[i].appendChild(divdek)
            }
        }


        setTimeout(function(){
            window.scrollTo(0,0)
        },10)
        setTimeout(function(){
            document.body.overflow = "hidden"
        },40)
        deckactif = true;
        btncompte.addEventListener("click", function(){
            decks2.classList.remove("affiche");
            decks2.classList.add("right");
            setTimeout(function(){
                collection.classList.remove("left");
                collection.classList.add("right");
                ordre2.classList.remove("left");
                ordre2.classList.add("right");
                cherche.classList.remove("left");
                cherche.classList.add("right");
                setTimeout(function(){
                    packs.classList.remove("left");
                    packs.classList.add("right");
                    setTimeout(function(){
                        compte.classList.remove("left");
                        compte.classList.add("affiche");
                    },125)
                },125)
            },125)
            fcompte();
        })
        btnpacks.addEventListener("click", function(){
            decks2.classList.remove("affiche");
            decks2.classList.add("right");
            setTimeout(function(){
                collection.classList.remove("left");
                collection.classList.add("right");
                ordre2.classList.remove("left");
                ordre2.classList.add("right");
                cherche.classList.remove("left");
                cherche.classList.add("right");
                setTimeout(function(){
                    packs.classList.remove("left");
                    packs.classList.add("affiche");
                },125)
            },125)
            fpacks();
        })
        btncollection.addEventListener("click", function(){
            decks2.classList.remove("affiche");
            decks2.classList.add("right");
            setTimeout(function(){
                collection.classList.remove("left");
                collection.classList.add("affiche");
                ordre2.classList.remove("left");
                ordre2.classList.add("affiche2");
                cherche.classList.remove("left");
                cherche.classList.add("affiche3");
            },125)
            fcollection();
        })
    }
},1000);

const rhaut = document.getElementById("rhaut");
const ahaut = document.getElementById("ahaut");
const faction = document.getElementById("faction");

let countR = false;
let fleche1 = document.getElementById("fleche1");
let countA = false;
let fleche2 = document.getElementById("fleche2");

let btous = document.createTextNode("Tous")
let bpirates = document.createTextNode("Pirates")
let bmarines = document.createTextNode("Marines")
let brevos = document.createTextNode("Révolutionnaires")
let bcivils = document.createTextNode("Civils")

let ipirates = document.createElement("img")
ipirates.src = "pirate.png"
ipirates.classList.add("ifactions")
let imarines = document.createElement("img")
imarines.src = "marine.png"
imarines.classList.add("ifactions")
let irevos = document.createElement("img")
irevos.src = "revo.png"
irevos.classList.add("ifactions")
let icivils = document.createElement("img")
icivils.src = "civil.png"
icivils.classList.add("ifactions")


let cliquef = 0
let tfaction = ""

function ffaction(){
    anime({
        targets:fleche1,
        rotate:'0deg'
    })
    rhaut.style = 'none'
    anime({
        targets:fleche2,
        rotate:'0deg'
    })
    ahaut.style = 'none'
    countA = 0
    countR = 0
    if(faction.innerText == "Tous" && cliquef == 0) {
        tfaction = "PIRATE"
        faction.innerHTML = ""
        faction.appendChild(bpirates)
        faction.appendChild(ipirates)
        
        document.body.removeChild(collection);
        collection = document.createElement("div");
        collection.setAttribute("id", "collection");
        collection.classList.add("affiche");
        document.body.append(collection);

        for(let j=0; j< tab.length; j++){
            if(tab[j].children[7].getAttribute("src") == "pirate.png"){
                collection.appendChild(tab[j])
            }
        }
        cliquef = 1;
    }
    if(faction.innerText == "Pirates" && cliquef == 0) {
        tfaction = "MARINE"
        faction.innerHTML = ""
        faction.appendChild(bmarines)
        faction.appendChild(imarines)
        
        document.body.removeChild(collection);
        collection = document.createElement("div");
        collection.setAttribute("id", "collection");
        collection.classList.add("affiche");
        document.body.append(collection);

        for(let j=0; j< tab.length; j++){
            if(tab[j].children[7].getAttribute("src") == "marine.png"){
                collection.appendChild(tab[j])
            }
        }
        cliquef = 1;
    }
    if(faction.innerText == "Marines" && cliquef == 0) {
        tfaction = "REVOLUTIONNAIRE"
        faction.innerHTML = ""
        faction.appendChild(brevos)
        faction.appendChild(irevos)
        faction.style.padding = "2px 0px"
        
        document.body.removeChild(collection);
        collection = document.createElement("div");
        collection.setAttribute("id", "collection");
        collection.classList.add("affiche");
        document.body.append(collection);

        for(let j=0; j< tab.length; j++){
            if(tab[j].children[7].getAttribute("src") == "revo.png"){
                collection.appendChild(tab[j])
            }
        }
        cliquef = 1;
    }
    if(faction.innerText == "Révolutionnaires" && cliquef == 0) {
        tfaction = "CIVIL"
        faction.innerHTML = ""
        faction.appendChild(bcivils)
        faction.appendChild(icivils)
        faction.style = "none"
        
        document.body.removeChild(collection);
        collection = document.createElement("div");
        collection.setAttribute("id", "collection");
        collection.classList.add("affiche");
        document.body.append(collection);

        for(let j=0; j< tab.length; j++){
            if(tab[j].children[7].getAttribute("src") == "civil.png"){
                collection.appendChild(tab[j])
            }
        }
        cliquef = 1;
    }
    if(faction.innerText == "Civils" && cliquef == 0) {
        tfaction = ""
        faction.innerHTML = ""
        faction.appendChild(btous)

        document.body.removeChild(collection);
        collection = document.createElement("div");
        collection.setAttribute("id", "collection");
        collection.classList.add("affiche");
        document.body.append(collection);

        for(let j=0; j< tab.length; j++){
            collection.appendChild(tab[j])
        }

        cliquef = 1;
    }
    cliquef = 0;
}

faction.addEventListener("click", function () {
    ffaction()
});

rhaut.addEventListener("click", function(){
    countR = !countR
    rhaut.style.backgroundColor = 'rgb(2,126,251,1)'
    rhaut.style.borderRadius = '3px'
    rhaut.style.outline = '0.2px solid #ffffff'
    ahaut.style = 'none'
    anime({
        targets:fleche2,
        rotate:'0deg'
    })
    countA = false
    if(countR) {
        anime({
            targets:fleche1,
            rotate:'0deg'
        })
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut2.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut3.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut4.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut5.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut6.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut7.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
    }
    if(!countR) {
        anime({
            targets:fleche1,
            rotate:'180deg'
        })
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut7.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut6.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut5.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut4.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut3.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[0].getAttribute("src") == "fut2.png"){
                if(tab[j].children[6].innerHTML == tfaction){
                    collection.appendChild(tab[j])
                }
                if(tfaction == ""){
                    collection.appendChild(tab[j])
                }
            }
        }
    }
});





ahaut.addEventListener("click", function(){
    countA = !countA
    rhaut.style = 'none'
    ahaut.style.backgroundColor = 'rgb(2,126,251,1)'
    ahaut.style.borderRadius = '3px'
    ahaut.style.outline = '0.2px solid #ffffff'
    anime({
        targets:fleche1,
        rotate:'0deg'
    })
    countR = false
    if(countA) {
        anime({
            targets:fleche2,
            rotate:'0deg'
        })
        tab.sort(function(a, b){
            return a.children[2].innerHTML.localeCompare(b.children[2].innerHTML);
        })
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[6].innerHTML == tfaction){
                collection.appendChild(tab[j])
            }
            if(tfaction == ""){
                collection.appendChild(tab[j])
            }
        }
    }
    if(!countA) {
        anime({
            targets:fleche2,
            rotate:'180deg'
        })
        tab.sort(function(a, b){
            return b.children[2].innerHTML.localeCompare(a.children[2].innerHTML);
        })
        for(let j=0; j< tab.length; j++){
            if(tab[j].children[6].innerHTML == tfaction){
                collection.appendChild(tab[j])
            }
            if(tfaction == ""){
                collection.appendChild(tab[j])
            }
        }
    }
});



ecrire.addEventListener("input", function(){
    for(let i=0; i<tab.length; i++){
        if(tab[i].children[6].innerHTML == tfaction){
            collection.appendChild(tab[i])
        }
        if(tfaction == ""){
            collection.appendChild(tab[i])
        }
    }
    for(let j=0; j< tab.length; j++){
        if(tab[j].children[6].innerHTML == tfaction){
            if(tab[j].children[2].innerHTML.toLowerCase().search(ecrire.value.toLowerCase()) == -1){
                collection.removeChild(tab[j])
            }
        }
        if(tfaction == ""){
            if(tab[j].children[2].innerHTML.toLowerCase().search(ecrire.value.toLowerCase()) == -1){
                collection.removeChild(tab[j])
            }
        }
    }
})

let tabdeck = [];





for (let i=1; i<=12; i++){
    tabdeck[i] = document.getElementById("deck"+i);
    tabdeck[i].addEventListener("click", function(){
        let creerdeck = document.createElement("div");
        creerdeck.classList.add("creerdeck");
        document.body.append(creerdeck);
        cchoix.classList.add("cchoix");
        creerdeck.append(cchoix);
        let rechoix = document.createElement("div");
        let orchoix = document.createElement("div");
        orchoix.setAttribute("id", "orchoix");
        rechoix.setAttribute("id", "rechoix");
        let recherche = document.createElement("input");
        recherche.setAttribute("type", "text");
        recherche.setAttribute("id", "recherche");
        recherche.setAttribute("placeholder", "Rechercher");
        let valider = document.createElement("button");
        valider.setAttribute("disabled","")
        valider.innerHTML = "VALIDER";
        valider.setAttribute("id","validerdeck");

       
        if(tabdeck[i].childElementCount != 1){
            let cards = tabdeck[i].children[1].children
            setTimeout(function(){
                for(let h =0; h< 15;h++){
                    document.querySelector(".cdeck .bloque[data='"+cards[h].getAttribute("data")+"']").click()
    
                }
            },2000)
            
        }

        valider.addEventListener("click",function(){
            let newdeck = ""
            let parentchild = document.getElementsByClassName("bloquechoix")

            

            for(let ctr = 0; ctr< parentchild.length; ctr+=1){
                let trueid = charaT[parseInt(parentchild[ctr].getAttribute("data"))].id
                newdeck += trueid + ","
            }

            let truedeck = newdeck.substring(0,newdeck.length -1)
            let truedeck2 = truedeck
            truedeck+=";"

            var data2 = "userid="+ idsession+"&deck="+truedeck
            if(tabdeck[i].childElementCount != 1){
                data2 += "&up=" + parseInt(tabdeck[i].getAttribute("id").substring(4,tabdeck[i].getAttribute("id").length))
            }
            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let dive = document.getElementsByClassName("predef")
                    if(tabdeck[i].childElementCount != 1){
                        let nb = parseInt(tabdeck[i].getAttribute("id").substring(4,tabdeck[i].getAttribute("id").length))-1
                        decks[nb] = (truedeck2)
                        
                        dive[nb].setAttribute("data","true")
                    }
                    else {
                        decks[decks.length - 1] = (truedeck2)
                        dive[decks.length - 1].setAttribute("data","true")
                    }
              
 
                    for (let i=1; i<=12; i++){
                        if(dive[i-1].childElementCount == 2){
                            dive[i-1].removeChild(dive[i-1].children[1])

                        }
                    }


                    for (let i=1; i<=12; i++){
                        tabdeck[i] = document.getElementById("deck"+i);
                        if(tabdeck[i].getAttribute("data") == 'true'){
                            let thedek = decks[i-1].split(",");
                            let thedek2 = []
                            for(let kk=0; kk < thedek.length; kk++){
                                thedek2.push(parseInt(thedek[kk]))
                        
                            }
                            let divdek = document.createElement("div")
            
                            for(let k=0; k<15;k++){
                                let idd = charaT.findIndex((element) => element.id == thedek2[k])   
                                let car = make_card(charaT,idd)
                                car.classList.remove("bloque")
                                car.classList.add("bloquechoix2")
                                car.style.left = 50*((i+1)%2) +4+ k*2 + "%"
                                divdek.appendChild(car)
            
                            }
            
            
                            divdek.classList.add("divdek")
                            tabdeck[i].appendChild(divdek)
                        }
                    }


                    document.body.removeChild(document.getElementsByClassName("creerdeck")[0])

                }
            }   
            
            
            xhttp2.open("POST", "updatecards.php", true);
            xhttp2.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhttp2.send(data2);
            

        })
        cchoix.appendChild(valider)
        let rarhaut = document.createElement("button");
        let alphaut = document.createElement("button");
        let fact = document.createElement("button");
        rarhaut.setAttribute("id", "rarhaut");
        alphaut.setAttribute("id", "alphaut");
        fact.setAttribute("id", "fact");
        let flehaut1 = document.createElement("img");
        let flehaut2 = document.createElement("img");
        flehaut1.setAttribute("src", "flecheHaut.png");
        flehaut2.setAttribute("src", "flecheHaut.png");
        rarhaut.innerHTML = "Rareté";
        rarhaut.appendChild(flehaut1);
        alphaut.innerHTML = "Alphabétique";
        alphaut.appendChild(flehaut2);
        fact.innerHTML = "Tous";
        cchoix.append(rechoix);
        cchoix.append(orchoix);
        rechoix.append(recherche)
        orchoix.append(rarhaut, alphaut, fact)
        let cdeck = document.createElement("div");
        cdeck.classList.add("cdeck");
        creerdeck.append(cdeck);

        let countRar = false;
        let countAlp = false;

        let cliquefac = 0
        let texfaction = ""

        function ffact(){
            anime({
                targets:flehaut1,
                rotate:'0deg'
            })
            rarhaut.style = 'none'
            anime({
                targets:flehaut2,
                rotate:'0deg'
            })
            alphaut.style = 'none'
            countAlp = 0
            countRar = 0
            if(fact.innerText == "Tous" && cliquefac == 0) {
                texfaction = "PIRATE"
                fact.innerHTML = ""
                fact.appendChild(bpirates)
                fact.appendChild(ipirates)
                
                creerdeck.removeChild(cdeck)
                cdeck = document.createElement("div");
                cdeck.classList.add("cdeck");
                creerdeck.append(cdeck);
        
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[7].getAttribute("src") == "pirate.png"){
                        cdeck.appendChild(tabchoix[j])
                    }
                }
                cliquefac = 1;
            }
            if(fact.innerText == "Pirates" && cliquefac == 0) {
                texfaction = "MARINE"
                fact.innerHTML = ""
                fact.appendChild(bmarines)
                fact.appendChild(imarines)
                
                creerdeck.removeChild(cdeck)
                cdeck = document.createElement("div");
                cdeck.classList.add("cdeck");
                creerdeck.append(cdeck);
        
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[7].getAttribute("src") == "marine.png"){
                        cdeck.appendChild(tabchoix[j])
                    }
                }
                cliquefac = 1;
            }
            if(fact.innerText == "Marines" && cliquefac == 0) {
                texfaction = "REVOLUTIONNAIRE"
                fact.innerHTML = ""
                fact.appendChild(brevos)
                fact.appendChild(irevos)
                fact.style.padding = "2px 0px"
                
                creerdeck.removeChild(cdeck)
                cdeck = document.createElement("div");
                cdeck.classList.add("cdeck");
                creerdeck.append(cdeck);
        
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[7].getAttribute("src") == "revo.png"){
                        cdeck.appendChild(tabchoix[j])
                    }
                }
                cliquefac = 1;
            }
            if(fact.innerText == "Révolutionnaires" && cliquefac == 0) {
                texfaction = "CIVIL"
                fact.innerHTML = ""
                fact.appendChild(bcivils)
                fact.appendChild(icivils)
                fact.style = "none"
                
                creerdeck.removeChild(cdeck)
                cdeck = document.createElement("div");
                cdeck.classList.add("cdeck");
                creerdeck.append(cdeck);
        
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[7].getAttribute("src") == "civil.png"){
                        cdeck.appendChild(tabchoix[j])
                    }
                }
                cliquefac = 1;
            }
            if(fact.innerText == "Civils" && cliquefac == 0) {
                texfaction = ""
                fact.innerHTML = ""
                fact.appendChild(btous)
        
                creerdeck.removeChild(cdeck)
                cdeck = document.createElement("div");
                cdeck.classList.add("cdeck");
                creerdeck.append(cdeck);
        
                for(let j=0; j< tabchoix.length; j++){
                    cdeck.appendChild(tab[j])
                }
        
                cliquefac = 1;
            }
            cliquefac = 0;
        }
        
        fact.addEventListener("click", function () {
            ffact()
        });

        rarhaut.addEventListener("click", function(){
            creerdeck.removeChild(cdeck)
            cdeck = document.createElement("div");
            cdeck.classList.add("cdeck");
            creerdeck.append(cdeck);

            countRar = !countRar
            rarhaut.style.backgroundColor = 'rgb(2,126,251,1)'
            rarhaut.style.borderRadius = '3px'
            rarhaut.style.outline = '0.2px solid #ffffff'
            alphaut.style = 'none'
            anime({
                targets:flehaut2,
                rotate:'0deg'
            })
            countAlp = false
            if(countRar) {
                anime({
                    targets:flehaut1,
                    rotate:'0deg'
                })
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut2.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut3.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut4.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut5.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut6.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut7.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
            }
            if(!countRar) {
                anime({
                    targets:flehaut1,
                    rotate:'180deg'
                })
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut7.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut6.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut5.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut4.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut3.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[0].getAttribute("src") == "fut2.png"){
                        if(tabchoix[j].children[6].innerHTML == texfaction){
                            cdeck.appendChild(tabchoix[j])
                        }
                        if(texfaction == ""){
                            cdeck.appendChild(tabchoix[j])
                        }
                    }
                }
            }
        });
        


        alphaut.addEventListener("click", function(){
            creerdeck.removeChild(cdeck)
            cdeck = document.createElement("div");
            cdeck.classList.add("cdeck");
            creerdeck.append(cdeck);

            countAlp = !countAlp
            rarhaut.style = 'none'
            alphaut.style.backgroundColor = 'rgb(2,126,251,1)'
            alphaut.style.borderRadius = '3px'
            alphaut.style.outline = '0.2px solid #ffffff'
            anime({
                targets:flehaut1,
                rotate:'0deg'
            })
            countRar = false
            if(countAlp) {
                anime({
                    targets:flehaut2,
                    rotate:'0deg'
                })
                tabchoix.sort(function(a, b){
                    return a.children[2].innerHTML.localeCompare(b.children[2].innerHTML);
                })
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[6].innerHTML == texfaction){
                        cdeck.appendChild(tabchoix[j])
                    }
                    if(texfaction == ""){
                        cdeck.appendChild(tabchoix[j])
                    }
                }
            }
            if(!countAlp) {
                anime({
                    targets:flehaut2,
                    rotate:'180deg'
                })
                tabchoix.sort(function(a, b){
                    return b.children[2].innerHTML.localeCompare(a.children[2].innerHTML);
                })
                for(let j=0; j< tabchoix.length; j++){
                    if(tabchoix[j].children[6].innerHTML == texfaction){
                        cdeck.appendChild(tabchoix[j])
                    }
                    if(texfaction == ""){
                        cdeck.appendChild(tabchoix[j])
                    }
                }
            }
        });

        recherche.addEventListener("input", function(){
            creerdeck.removeChild(cdeck)
            cdeck = document.createElement("div");
            cdeck.classList.add("cdeck");
            creerdeck.append(cdeck);


            for(let j=0; j<tabchoix.length; j++){
                if(tabchoix[j].children[6].innerHTML == texfaction){
                    cdeck.appendChild(tabchoix[j])
                }
                if(texfaction == ""){
                    cdeck.appendChild(tabchoix[j])
                }
            }
            for(let k=0; k< tabchoix.length; k++){
                if(tabchoix[k].children[6].innerHTML == texfaction){
                    if(tabchoix[k].children[2].innerHTML.toLowerCase().search(recherche.value.toLowerCase()) == -1){
                        cdeck.removeChild(tabchoix[k])
                    }
                }
                if(texfaction == ""){
                    if(tabchoix[k].children[2].innerHTML.toLowerCase().search(recherche.value.toLowerCase()) == -1){
                        cdeck.removeChild(tabchoix[k])
                    }
                }
            }
        });

        setTimeout(function(){
            fetch('./chara.json',{method:'GET'})
                .then(res1 => res1.text())
                .then(text1 => {
                    eval("charaT ="+text1)
                    setTimeout(function(){
                        for(var i=0;i< charaT.length;i++){

                            if(cards.includes((charaT[i].id).toString())){
                                let bloc = make_card(charaT,i,true)
                                cdeck.appendChild(bloc)
                            }
                        }

                        

                       



                        // for(var y = 0; y < decks.length; y+=1){
                        //     let dek = document.querySelector(".cdeck[data=deck"+y+"]")
                        //     dek.style.top = y*20 +"%"
                        //     dek.addEventListener("click",function(){
                        //         let idx = parseInt(dek.getAttribute("data").substring(4,dek.getAttribute("data").length))
                        //         if(isdeckclicked == -1 || isdeckclicked == idx){
               

                        //             let dekjs = decks[idx].split(",")

                        //             for(var ko=0; ko< dekjs.length;ko++){
                        //                 let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjs[ko]))
                        //   
                        //                 document.querySelector(".bloque[data='"+ix+"']").click()
                        //             }
                        //             isdeckclicked = idx;
                        //         }
                        //         else{
                        //             let dekjsUC = decks[isdeckclicked].split(",")

                        //             for(var ko=0; ko< dekjsUC.length;ko++){
                        //                 let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjsUC[ko]))
                        //                 document.querySelector(".bloque[data='"+ix+"']").click()
                        //             }

                        //             let dekjs = decks[idx].split(",")

                        //             for(var ko=0; ko< dekjs.length;ko++){
                        //                 let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjs[ko]))
                        //                 document.querySelector(".bloque[data='"+ix+"']").click()
                        //             }
                        //             isdeckclicked = idx;

                        //         }
                        //     })
                        //     let dekjs = decks[y].split(",")

                        //     for(var l = 1; l < dekjs.length; l++){
                        //         let carto = make_card(charaT,ix,false,true)
                        //         carto.classList.remove("bloque")
                        //         carto.classList.add("bloquedeck")
                        //         carto.style.left = (l-1)*5+("%")
                        //         carto.style.border = "none"
                        //         dek.appendChild(carto)

                        //     }

                        // }

                    },100)
                })
        },1000);
    })
}

// packs

var cardgain = []

var nbclick = 0
var prev = 0
var nbclick2 = 0
var prev2 = 0
var nbclick3 = 0
var prev3 = 70


const lis = document.getElementById("packs")
const packsopening = []

for(var i=0; i< lis.childElementCount; i++){
    if(i%2 ==0) packsopening.push(lis.children[i])
}

for(let i=0; i< packsopening.length;i++){
    if(!packsopening[i].style.filter.includes('grayscale(0.9)')){
        packsopening[i].addEventListener("click", function(){
            let type          
            if(packsopening[i].getAttribute("src") == "Pack/pack_east_blue.png"){
                actualpack = 0
                vraipack = 0
                nbpack = parseInt(lis.children[i*2 +1].innerHTML)
                srcim = "Pack/pack_east_blue.png"
            }
            if(packsopening[i].getAttribute("src") == "Pack/pack_west_blue.png"){
                actualpack = 2
                vraipack = 1
                nbpack = parseInt(lis.children[i*2 +1].innerHTML)
                srcim = "Pack/pack_west_blue.png"
            }
            if(packsopening[i].getAttribute("src") == "Pack/pack_north_blue.png"){
                actualpack = 3
                vraipack = 2
                nbpack = parseInt(lis.children[i*2 +1].innerHTML)
                srcim = "Pack/pack_north_blue.png"
            }
            if(packsopening[i].getAttribute("src") == "Pack/pack_south_blue.png"){
                actualpack = 1
                vraipack = 3
                nbpack = parseInt(lis.children[i*2 +1].innerHTML)
                srcim = "Pack/pack_south_blue.png"
            }
            if(packsopening[i].getAttribute("src") == "Pack/pack_bronze.png"){
                actualpack = 4 
                vraipack = 4
                nbpack = parseInt(lis.children[i*2 +1].innerHTML)
                srcim = "Pack/pack_bronze.png"
            }
            if(packsopening[i].getAttribute("src") == "Pack/pack_silver.png"){
                actualpack = 4
                vraipack = 5
                nbpack = parseInt(lis.children[i*2 +1].innerHTML)
                srcim = "Pack/pack_silver.png"
            }
            if(packsopening[i].getAttribute("src") == "Pack/pack_gold.png"){
                actualpack = 4
                vraipack = 6
                nbpack = parseInt(lis.children[i*2 +1].innerHTML)
                srcim = "Pack/pack_gold.png"
            }

           
            let popup = document.createElement("div")
            popup.setAttribute("id",'popup')

            let back = document.createElement("button")
            back.innerHTML = "CANCEL"
            back.setAttribute("id","cancel")

            back.addEventListener("click",function(){
                document.body.removeChild(popup)
            })

            let confirm = document.createElement("button")
            confirm.innerHTML = "CONFIRM"
            confirm.setAttribute("id","confirm")
            confirm.addEventListener("click",function(){
                lis.children[vraipack*2 +1].innerHTML = parseInt(lis.children[vraipack*2 +1].innerHTML) - 1
                if( parseInt(lis.children[vraipack*2 +1].innerHTML) == 0){
                    anime({
                        targets:lis.children[vraipack*2],
                        filter:"grayscale(0.9)"
                    })
                }
                document.body.removeChild(popup)
                openingpre(type)
            })

            let msg = document.createElement("p")
            msg.innerHTML = "Souhaitez-vous vraiment ouvrir ce pack ?"
            msg.setAttribute("id","msg")

            popup.appendChild(confirm)
            popup.appendChild(back)
            popup.appendChild(msg)

            document.body.appendChild(popup)

        })
    }        
}



function openingpre(){
    let fond = document.createElement("div")
    fond.setAttribute("id","fond")
    document.body.appendChild(fond)

    anime({
        targets:fond,
        background:["rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0.6)"]
    })

    let wid = 136//0.25*(document.body.clientWidth) -  180

    var canvas = document.createElement('canvas');
    var input = document.createElement("input")
    input.oninput = openingpack
    //input.setAttribute("oninput","openingpack()")
    input.setAttribute("type","range")
    input.setAttribute("id","clik")
    input.setAttribute("value","0")
    canvas.setAttribute("id","canvas")
    canvas.setAttribute("width","1000px")
    canvas.setAttribute("height","500px")
    document.body.appendChild(canvas)
    document.body.appendChild(input)
    anime({
        targets:canvas,
        opacity:[0,1],
        scale:[1.2,1],
        translateX:['-50%','-50%'],
        duration:1000
    })
    anime({
        targets:document.getElementById("clik"),
        opacity:[0,1],
        scale:[1.2,1],
        translateX:['-50%','-50%'],
        translateY:['-50%','-50%'],
        rotate:'180deg',
        duration:1000
    })
   
    const ctx = canvas.getContext('2d');

    
        

    
    var image2 = new Image();
    image2.src = srcim; 

    var image3 = new Image();
    image3.src = srcim; 
    

    image2.onload = function(){
        ctx.drawImage(image2, 0, 80, 500, 60, wid,0, 500, 60);
    }
    
    var image = new Image();
    image.src = srcim; 
    ctx.clearRect(wid, 60, 500, 10);
    image.onload = function(){
        ctx.drawImage(image, 0, 140, 500, 10, wid,60,500, 10);
    }



    
   
    image3.onload = function(){
        ctx.drawImage(image3, 0, 150, 500, 2000,wid ,70, 500, 1750);
    }

}


function openingpack(){
   
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');



    nbclick2=0
    nbclick3=0

    nbclick = parseInt(document.getElementById("clik").value)/10 
    nbclick *= 7.7/(10)
    let time1 = 200
    let time2 = 300
    if(nbclick == 7.7){
        document.body.removeChild(document.getElementById("clik"))

        let to = setInterval(function(){
            if(nbclick2 == 30){
                clearInterval(to)
                fetch('./chara.json',{method:'GET'})
                    .then(res1 => res1.text())
                    .then(text1 => {
                        eval("charaT ="+text1)
                        fetch('./pack.json',{method:'GET'})
                            .then(res4 => res4.text())
                            .then(text4 => {
                                var jisone
                                const jizone = "jisone = " +text4
                                eval(jizone)
                                var pack = jisone[actualpack].list

                      
                                let packd = []
                                for(var i=0; i< pack.length;i++){
                                    packd.push(make_card(charaT,charaT.findIndex((element) => element.id == pack[i])))
                                }


                                let ca = []
                                var idchoisis = []
                                for(let t=0; t< 5; t++){
                                    if(t>0) ca.push(cardgain[t-1].getAttribute("data"))
                                    var etoile
                                
                                    if(vraipack < 4 || vraipack == 5){
                                        let etoileg =  Math.floor(Math.random() * 10001);
                                     
                                        
                                        if(etoileg >= 0 && etoileg <= 4400){
                                            etoile = 1
                                        }

                                        if(etoileg >= 4400 && etoileg <= 6900){
                                            etoile = 2
                                        }
                                        if(etoileg >= 6900 && etoileg <= 8990){
                                            etoile = 3
                                        }
                                        if(etoileg >= 8990 && etoileg <= 9890){
                                            etoile = 4
                                        }
                                        if(etoileg >= 9890 && etoileg <= 9990){
                                            etoile = 5
                                        }

                                        if(etoileg >= 9990 && etoileg <= 10000){
                                            etoile = 6
                                        }
                                        

                                    }
                                    if(vraipack == 4){

                                        let etoileg =  Math.floor(Math.random() * 10001);
                                      
                                        if(etoileg >= 0 && etoileg <= 6388){
                                            etoile = 1
                                        }

                                        if(etoileg >= 6388 && etoileg <= 9388){
                                            etoile = 2
                                        }
                                        if(etoileg >= 9388 && etoileg <= 9888){
                                            etoile = 3
                                        }
                                        if(etoileg >= 9888 && etoileg <= 9988){
                                            etoile = 4
                                        }
                                        if(etoileg >= 9989 && etoileg <= 9999){
                                            etoile = 5
                                        }

                                        if(etoileg == 10000){
                                            etoile = 6
                                        }
                                    }

                                    if(vraipack == 6){
                                        let etoileg =  Math.floor(Math.random() * 10001);
                        
                                        if(etoileg >= 0 && etoileg <= 1900){
                                            etoile = 1
                                        }

                                        if(etoileg >= 1900 && etoileg <= 4900){
                                            etoile = 2
                                        }
                                        if(etoileg >= 4900 && etoileg <= 7900){
                                            etoile = 3
                                        }
                                        if(etoileg >= 7900 && etoileg <= 9400){
                                            etoile = 4
                                        }
                                        if(etoileg >= 9400 && etoileg <= 9900){
                                            etoile = 5
                                        }

                                        if(etoileg >= 9900  && etoileg <= 10000){
                                            etoile = 6
                                        }
                                    }
                              
                                    let tmp = Math.floor(Math.random() * pack.length)
                                    let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                    cardgain[t] = (make_card(charaT,numbtmp))
                                    idchoisis[t] = pack[tmp]
                                    if(etoile == 1){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut2.png" || ca.find((element)=> element == cardgain[t].getAttribute("data")) != undefined){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            idchoisis[t] = pack[tmp]
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 2){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut3.png" || ca.find((element)=> element == cardgain[t].getAttribute("data")) != undefined){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            idchoisis[t] = pack[tmp]
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 3){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut4.png" || ca.find((element)=> element == cardgain[t].getAttribute("data")) != undefined){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            idchoisis[t] = pack[tmp]
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 4){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut5.png" || ca.find((element)=> element == cardgain[t].getAttribute("data")) != undefined){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            idchoisis[t] = pack[tmp]
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 5){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut6.png" || ca.find((element)=> element == cardgain[t].getAttribute("data")) != undefined){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            idchoisis[t] = pack[tmp]
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 6){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut7.png" || ca.find((element)=> element == cardgain[t].getAttribute("data")) != undefined){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            idchoisis[t] = pack[tmp]
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }


                                    
                                }
                                let str = "ids="
                                var money = 0
                                var doublons = [false,false,false,false,false]
                                for(let k = 0; k<5; k++){
                                    
                                
                                    if(cards.find((element) => element == idchoisis[k])==undefined){
                                        str += idchoisis[k]+","
                                    
                                    }
                                    else{
                                        doublons[k] = true
                                        if(cardgain[k].children[0].getAttribute("src")=="fut2.png") money+=100
                                        if(cardgain[k].children[0].getAttribute("src")=="fut3.png") money+=200
                                        if(cardgain[k].children[0].getAttribute("src")=="fut4.png") money+=400
                                        if(cardgain[k].children[0].getAttribute("src")=="fut5.png") money+=600
                                        if(cardgain[k].children[0].getAttribute("src")=="fut6.png") money+=1000
                                        if(cardgain[k].children[0].getAttribute("src")=="fut7.png") money+=2000

                                
                                    }
                                }

                                let from = document.createElement("form")
                                from.setAttribute("action","")
                                from.setAttribute("method","POST")
                                let hid = document.createElement("input")
                                hid.setAttribute("type","hidden")
                                hid.setAttribute("value",str)
                                hid.setAttribute("name","newsid")
                                let submitte = document.createElement("input")
                                submitte.setAttribute("type","submit")
                                from.appendChild(submitte)
                                from.appendChild(hid)
                                
                                var data = str+"&userid="+ idsession+"&pack="+vraipack+"&nbpack="+nbpack+"&money="+money;
                                var xhttp = new XMLHttpRequest();
                                xhttp.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        cards =xhttp.responseText.split(",")
                                        tab = []
                                        document.body.removeChild(document.getElementById("collection"))
                                        collection = document.createElement("div")
                                        collection.setAttribute("id","collection")
                                        collection.classList.add("right")
                                        document.body.appendChild(collection)
                                        for(var i=0;i< charaT.length;i++){
                                            
                                            if(cards.includes((charaT[i].id).toString())){
                                                let bloc = make_card(charaT,i,true)
                                                tab.push(bloc)
                                                document.getElementById("collection").appendChild(bloc)
                                            }
                                        }
                                        rhaut.click()
                                    }
                                }   
                                
                                
                                xhttp.open("POST", "updatecards.php", true);
                                xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                xhttp.send(data);

                                for(var l =0; l< 5; l++){
                                    cardgain[l].classList.remove("bloque")
                                    cardgain[l].classList.add("bloque2")
                                    
                                }
                            
                               
                                
                                let to2 = setInterval(function(){

                                    nbclick3 += 5
                                    if(nbclick3 > 70){
                                        nbclick3 = 70
                                        clearInterval(to2)
                                        let list = document.createElement("div")
                                        list.setAttribute("id","newitems")
                                        document.body.appendChild(list)
                                        for(var i =0; i<5;i++){
                                            let vari;
                                            if(i==0) vari=2
                                            if(i==1) vari=1
                                            if(i==2) vari=3
                                            if(i==3) vari=0
                                            if(i==4) vari=4
                                            

                                            list.appendChild(cardgain[i])
                                            if(doublons[i]){

                                                
                                                
                                                let tmp = document.createElement("img")
                                                tmp.setAttribute("src","doublon.png")
                                                tmp.classList.add("bloque3")
                                                tmp.style.left = 1.5 + 18*vari +"%"
                                                list.appendChild(tmp)
                                                                                                
                                            }

                                        }
                                        for(var l =0; l< 5; l++){
                                            cardgain[l].style.opacity = '1';
                                            cardgain[l].style.left = '46%';
                                            cardgain[l].style.transform = 'translateX(-50%)';
                                            cardgain[l].style.border = 'none';
                                            cardgain[l].style.zIndex = '12';
                                            cardgain[l].style.bottom = '8%';
                                            cardgain[l].style.position = 'absolute';
                                        }

                                        anime({
                                            targets:cardgain[0],
                                            bottom:["0px","400px"]
                                        })
                                        setTimeout(function(){
                                            cardgain[0].style.zIndex = 14
                                            anime({
                                                targets:cardgain[0],
                                                bottom:["400px","0px"],
                                                duration:2000
                                            })
                                            setTimeout(function(){
                                                anime({
                                                    targets:cardgain[1],
                                                    bottom:["0px","400px"]
                                                })
                                                setTimeout(function(){
                                                    cardgain[1].style.zIndex = 14
                                                    anime({
                                                        targets:cardgain[1],
                                                        bottom:["400px","0px"],
                                                        left:["46%","28%"],
                                                        duration:2000
                                                    })

                                                    setTimeout(function(){
                                                        anime({
                                                            targets:cardgain[2],
                                                            bottom:["0px","400px"]
                                                        })
                                                        setTimeout(function(){
                                                            cardgain[2].style.zIndex = 14
                                                            anime({
                                                                targets:cardgain[2],
                                                                bottom:["400px","0px"],
                                                                left:["46%","64%"],
                                                                duration:2000
                                                            })
                                                            setTimeout(function(){
                                                                anime({
                                                                    targets:cardgain[3],
                                                                    bottom:["0px","400px"]
                                                                })
                                                                setTimeout(function(){
                                                                    cardgain[1].style.zIndex = 14
                                                                    anime({
                                                                        targets:cardgain[3],
                                                                        bottom:["400px","0px"],
                                                                        left:["46%","10%"],
                                                                        duration:2000
                                                                    })

                                                                    setTimeout(function(){
                                                                        anime({
                                                                            targets:cardgain[4],
                                                                            bottom:["0px","400px"]
                                                                        })
                                                                        setTimeout(function(){
                                                                            cardgain[1].style.zIndex = 14
                                                                            anime({
                                                                                targets:cardgain[4],
                                                                                bottom:["400px","0px"],
                                                                                left:["46%","82%"],
                                                                                duration:2000
                                                                            })
                                                                            anime({
                                                                                targets:document.getElementsByClassName("bloque3"),
                                                                                opacity:[0,1],
                                                                                delay:300
                                                                            })
                                                                            let btnback = document.createElement("button")
                                                                            btnback.setAttribute("id","btnback")
                                                                            btnback.innerHTML = "OK"
                                                                            btnback.addEventListener("click",function(){
                                            
                                                                                if(money > 0){
                                                                                    let moneyearn = document.createElement("p")
                                                                                    moneyearn.setAttribute("id","moneyearn")
                                                                                    moneyearn.innerHTML = "+" + money 
                                                                                    document.body.appendChild(moneyearn)
                                                                                    anime({
                                                                                        targets:moneyearn,
                                                                                        opacity:[0,1],
                                                                                        direction: 'alternate',
                                                                                        duration:500
                                                                                    })
                                                                                }
                                                                                anime({
                                                                                    targets:document.getElementsByClassName("bloque3"),
                                                                                    opacity:[1,0]

                                                                                })

                                                                                anime({
                                                                                    targets:document.getElementsByClassName("bloque2"),
                                                                                    left:"46%",
                                                                                    delay:200
                                                                                })
                                                                                let tmpcanvas = document.getElementById("canvas")
                                                                                let tmpb2 = document.getElementsByClassName("bloque2")
                                                                                setTimeout(function(){
                                                                                    anime({
                                                                                        targets:[tmpcanvas,tmpb2,fond],
                                                                                        opacity:[1,0]
                                                                                    })
                                                                                },1000)
                                                                                
                                                                                setTimeout(function(){
                                                                                    document.body.removeChild(document.getElementById("fond"))
                                                                                    document.body.removeChild(document.getElementById("newitems"))
                                                                                    document.body.removeChild(document.getElementById("canvas"))
                                                                                    document.body.removeChild(document.getElementById("btnback"))
                                                                                },1400)
                                                                                
                                                                            })
                                                                            document.body.appendChild(btnback)
                                                                        },time1)
                                                                        
                                                                    },time2)

                                                                },time1)
                                                                
                                                            },time2)

                                                        },time1)
                                                        
                                                    },time2)

                                                },time1)
                                                
                                            },time2)
                                        },time1)
                                        
                                    }
                                    let wid = 0.25*(document.body.clientWidth) -  180
                                    ctx.clearRect(wid, prev, 500, 1750);
                                
                                    var image3 = new Image();
                                    image3.src = srcim; 

                                    image3.onload = function(){
                                        ctx.drawImage(image3, 0, 150, 500, 2000, wid,70-nbclick3, 500, 1750);
                                    }
                                
                                    prev3 = nbclick3

                                })
                            })
                            
                    })
            }
            let wid = 0.25*(document.body.clientWidth) -  180
            nbclick2+=1
            ctx.clearRect(wid, 0-prev2, 500, 60);
            var image2 = new Image();
            image2.src = srcim; 
            image2.onload = function(){
                ctx.drawImage(image2, 0, 80, 500, 60, wid,0-nbclick2*2.5, 500, 60);
            }
            prev2 = nbclick2
        })
       

    }
    else{
        var image = new Image();
        image.src = srcim; 
        let wid = 0.25*(document.body.clientWidth) -  180
        ctx.clearRect(wid+prev, 60, 500, 10);
        image.onload = function(){
            ctx.drawImage(image, 0, 140, (500- 50*nbclick), 10, wid,60, (500- 50*nbclick), 10);
        }
        prev = (500- 50*nbclick)
    }


}
