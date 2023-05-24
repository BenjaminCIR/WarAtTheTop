import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.es.js';


var moneywin = 0
var listeALIASES = []
var listeSTAT = []

var deadR = false
var vainqueur = false
var positionclick = 0

var tabl = [0.6,0.8,0.9,1,1.1,1.2,1.4]

fetch('https://optc-db.github.io/common/data/aliases.js', { method: 'GET' })
    .then(res => res.text())
    .then(text => {
        let position = text.search("const calcGhostStartID")
        const tableau = "listeALIASES" + text.substring(30, position)
        eval(tableau)
         

    })
fetch('https://optc-db.github.io/common/data/units.js', { method: 'GET' })
    .then(res => res.text())
    .then(text => {
        let position = text.search("var calcGhostStartID")
        const stats = "listeSTAT" + text.substring(13, position)
        eval(stats)
    })



var orderfight = []
var clicked = []
var clicked2 = []
var countclicked = 0
var flip = 0
var charaT = []

var finalfighters = []
var countclicked2 = 0

var isdeckclicked = -1

var isattacking = -1

var fin = false
var fintour = false
var tour = 0



var links = []


function getLink(card1, card2) {
     
     
    let ret = 0
    if (card1.crew_id == card2.crew_id) {
         
        ret = 3
        if (card1.crew_id == -1000) {
            ret = 2
             
        }
    }
    else {
        if ((card1.crew_id >= 86 && card1.crew_id != 82 && card1.crew_id != 90 && card1.crew_id != 130) || (card2.crew_id >= 86 && card2.crew_id != 82 && card2.crew_id != 90 && card2.crew_id != 130)) {
            if (card1.crew_id == 130 || card2.crew_id == 130) {
                 
                ret = 3
            }
            else {
                ret = 2
                 
            }
        }
        else {
            if ((card1.crew_id == 90 || card1.crew_id == 82) && (card2.crew_id == 82 || card2.crew_id == 90)) {
                ret = 3
                 
            }
            else {
                if (card1.crew_id == 130 && card2.crew_id == 130) {
                    ret = 3
                     
                }
                else {
                    if (((card1.crew_id == 90 || card1.crew_id == 82) && (card2.crew_id != 90 || card2.crew_id != 82)) || ((card2.crew_id == 90 || card2.crew_id == 82) && (card1.crew_id != 90 || card1.crew_id != 82))) {
                        ret = 1
                         
                    }
                    else {
                        ret = 2
                         
                    }

                }
            }
        }
    }
    return ret
}






function make_card(charaTT, identifiant, clickable, little = false) { // 9 10 11
    let newind = (charaTT[identifiant]).id - 1
    let newid = ((charaTT[identifiant]).id).toString().padStart(4, '0')
    let millier = parseInt((charaTT[identifiant].id) / 1000).toString()
    let centaine = parseInt(((charaTT[identifiant].id) - millier * 1000) / 100).toString().padEnd(3, '0')
    let bloc = document.createElement("div")
    bloc.setAttribute("data", identifiant)
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
    crewlogo.setAttribute("src", "pirate.png")
    if (parseInt(charaTT[identifiant].crew_id) >= 86) {
        crew.innerText = "CIVIL"
        crewlogo.setAttribute("src", "civil.png")
    }
    if (parseInt(charaTT[identifiant].crew_id) == 130) {
        crew.innerText = "REVOLUTIONNAIRE"
        crewlogo.setAttribute("src", "revo.png")
    }
    if (parseInt(charaTT[identifiant].crew_id) == 82 || parseInt(charaTT[identifiant].crew_id) == 90) {
        crew.innerText = "MARINE"
        crewlogo.setAttribute("src", "marine.png")
    }

    bloc.classList.add("bloque")
    image2.setAttribute("src", "fut2.png")
    image.setAttribute("src", "https://optc-db.github.io//api/images/full/transparent/" + millier + "/" + centaine + "/" + newid + ".png")
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
    if (sizee == "") sizee = "175"
    vitesse.innerText = parseInt(10 * ((parseInt(attaque.innerText) ** (2.5)) / (parseInt(sizee.replace(" ", "")) * parseInt(HP.innerText))))
    let tmpp = (parseInt(0.01 * ((listeSTAT[newind])[12]) ** 2 + parseInt((listeSTAT[newind])[13]) ** 2 + parseInt(10 * ((parseInt(attaque.innerText) ** (2.5)) / (parseInt(sizee.replace(" ", "")) * parseInt(HP.innerText)))) ** (1))) / 3
    if (tmpp >= 100000 && tmpp <= 300000) {
        image2.setAttribute("src", "fut3.png")
        //bloc.style.color = "white"
    }
    if (tmpp >= 300000 && tmpp <= 500000) {
        image2.setAttribute("src", "fut4.png")
        bloc.style.color = "white"
    }
    if (tmpp >= 500000 && tmpp <= 700000) {
        image2.setAttribute("src", "fut5.png")
        bloc.style.color = "white"
    }
    if (tmpp >= 700000 && tmpp <= 900000) {
        image2.setAttribute("src", "fut6.png")
        bloc.style.color = "white"
    }
    if (tmpp > 900000) {
        naming.style.color = "#fec832"
        image2.setAttribute("src", "fut7.png")
        anime({
            targets: naming,
            endDelay: 1000,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true,
            color: "#f6363a"

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
    if (clickable) {
        bloc.addEventListener("click", function () {
            if (clicked[identifiant] == false) {
                 
                countclicked += 1
                anime({
                    targets: bloc,
                    borderColor: ['rgb(255, 255, 255)', '#e3bc5c'],
                    //easing:'easeInOutExpo',
                    duration: 600,
                    borderRadius: [0, 15]
                });
                clicked[identifiant] = true
                let newbloc = bloc.cloneNode(true)
                newbloc.addEventListener("click", function () {
                    bloc.click()

                })
                newbloc.classList.remove("bloque")
                newbloc.classList.add("newbloque")
                let comptf = 0
                let firstempty = document.getElementById("hdeck").children[0]
                while (firstempty.children[0].classList.contains("card") == false) {
                    comptf += 1
                    firstempty = document.getElementById("hdeck").children[comptf]
                }
                firstempty.removeChild(firstempty.children[0])
                firstempty.appendChild(newbloc)
                anime({
                    targets: newbloc,
                    scale: [1.2, 1]
                })
                // document.getElementById("hdeck").children[countclicked-1].removeChild(document.getElementById("hdeck").children[countclicked-1].children[0])
                // document.getElementById("hdeck").children[countclicked-1].appendChild(newbloc)
            }
            else {
                 
                countclicked -= 1
                anime({
                    targets: bloc,
                    borderColor: ['#e3bc5c', 'rgb(255, 255,255,0)'],
                    //easing:'easeInOutExpo',
                    duration: 600,
                    borderRadius: [15, 0]
                })
                clicked[identifiant] = false
                let newbloc = document.createElement("img")
                newbloc.setAttribute("src", "futskull.png")
                newbloc.style.opacity = 0.3
                newbloc.classList.add("card")

                let par = bloc.getAttribute("data")

                let rem = document.querySelector(".newbloque[data='" + par + "']")
                 
                var parent = rem.parentNode
                anime({
                    targets: rem,
                    scale: [1, 1.2],
                    opacity: [1, 0],
                    easing: "linear",
                    duration: 300
                })
                setTimeout(function () {
                    parent.removeChild(rem)
                    parent.appendChild(newbloc)
                }, 300)


                // document.getElementById("hdeck").children[countclicked].removeChild(document.getElementById("hdeck").children[countclicked].children[0])
                // document.getElementById("hdeck").children[countclicked].appendChild(newbloc)
            }
            if (countclicked == 15) {
                let doc = document.getElementsByClassName("bloque")
                for (let u = 0; u < doc.childElementCount; u += 1) {
                    doc.children[u].style.pointer_events = 'none';
                }
                document.getElementById("start").removeAttribute("disabled")
            }
            else {
                let doc = document.getElementsByClassName("bloque")
                for (let u = 0; u < doc.childElementCount; u += 1) {
                    doc.children[u].style.pointer_events = 'all';
                }
                //document.getElementsByClassName("bloque").style.pointer_events = 'all';
                document.getElementById("start").setAttribute("disabled", "")
            }
            anime({
                targets: document.getElementById("compteur").children[0],
                innerHTML: "Cartes sélectionnées : " + countclicked + "/15",
                round: 5,
                easing: 'linear',
                duration: 400
            })

        })
    }

    return bloc
}


function cleardeck() {

    let li = document.getElementById("list")

    for (let i = 0; i < li.childElementCount; i++) {
        if (li.children[i].style.borderColor == "rgb(227, 188, 92)") {
            li.children[i].click()
        }
    }

}

document.getElementById("clear").addEventListener("click", cleardeck)

fetch('./chara.json', { method: 'GET' })
    .then(res1 => res1.text())
    .then(text1 => {
        eval("charaT =" + text1)
        // 

         
        setTimeout(function () {

            for (var i = 0; i < charaT.length; i++) {
                if (cards.includes((charaT[i].id).toString())) {
                    let bloc = make_card(charaT, i, true)
                    document.getElementById("list").appendChild(bloc)
                    clicked[i] = false
                }
            }
             
            for (var y = 0; y < decks.length; y += 1) {
                let dek = document.querySelector(".cdeck[data=deck" + y + "]")
                dek.style.top = y * 20 + "%"
                dek.addEventListener("click", function () {
                    cleardeck()
                    let idx = parseInt(dek.getAttribute("data").substring(4, dek.getAttribute("data").length))
                    if (isdeckclicked == -1 || isdeckclicked == idx) {
                        // 

                        let dekjs = decks[idx].split(",")

                        for (var ko = 0; ko < dekjs.length; ko++) {
                            let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjs[ko]))
                            // 
                            document.querySelector(".bloque[data='" + ix + "']").click()
                        }
                        isdeckclicked = idx;
                    }
                    else {
                        /*let dekjsUC = decks[isdeckclicked].split(",")

                        for(var ko=0; ko< dekjsUC.length;ko++){
                            let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjsUC[ko]))
                            document.querySelector(".bloque[data='"+ix+"']").click()
                        }*/



                        let dekjs = decks[idx].split(",")

                        for (var ko = 0; ko < dekjs.length; ko++) {
                            let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjs[ko]))
                            document.querySelector(".bloque[data='" + ix + "']").click()
                        }
                        isdeckclicked = idx;

                    }
                })
                let dekjs = decks[y].split(",")

                for (var l = 1; l < dekjs.length; l++) {
                     
                    // 
                    let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjs[l]))
                     
                    let carto = make_card(charaT, ix, false, true)
                    carto.classList.remove("bloque")
                    carto.classList.add("bloquedeck")
                    carto.style.left = (l - 1) * 5 + ("%")
                    carto.style.border = "none"
                    dek.appendChild(carto)

                }

            }

        }, 100)


        function erase_childs(node) {
            if (node.childNodes) {
                var childs = node.childNodes;
                for (var i = 0; i < childs.length; i++) {
                    node.removeChild(childs[i]);
                }
            }

        }





        function setTargetOP(e) {
            let cart = e//.target.parentElement
            let blank = cart.cloneNode(true)
            blank.style.filter = "grayscale(100%)"
            blank.style["-webkit-filter"] = "grayscale(100%)"
            blank.setAttribute("id", "blank")
            isattacking = cart
            // 
            for (var arr = [], i = document.getElementById("fightlistOP").children.length; i;) arr[--i] = document.getElementById("fightlistOP").children[i];
            let pos = arr.indexOf(cart)
            if (pos == 0) {
                document.getElementById("fightlistOP").prepend(blank)
            }
            else {
                document.getElementById("fightlistOP").children[pos - 1].after(blank)
            }
            // 
            cart.style.position = "absolute"
            cart.style.right = (pos % 2) * 22 + "%"
            cart.style.top = parseInt(pos / 2) * 30 + "%"
            cart.style.zIndex = "2"

            anime({
                targets: cart,
                width: "30%",
                //zIndex: "2",
                fontSize: "100%",
                float: "none",
                top: "50%",
                right: "50%",
                translateX: "50%",
                translateY: "-50%",
                scale: "1",
                delay: 100
            })

            for (var card = 0; card <= 6; card++) {
                anime({
                    targets: document.getElementById("linksblocOP" + card),
                    opacity: 0.3
                })
                if (document.getElementById("fightlistOP").children[card] != cart && document.getElementById("fightlistOP").children[card].getAttribute("id") != "blank") {
                    document.getElementById("fightlistOP").children[card].removeEventListener("click", setTarget)
                    anime({
                        targets: document.getElementById("fightlistOP").children[card],
                        opacity: 0.3
                    })
                }
            }

            setTimeout(function () {
                let targ = document.getElementById("fightlist").children[Math.floor(Math.random() * 6)]
                while (targ.children[4].innerHTML == "0") {
                    targ = document.getElementById("fightlist").children[Math.floor(Math.random() * 6)]
                }
                betargetOP(targ)
            }, 750)
        }


        function betargetOP(e) {


            for (var card = 0; card < 6; card++) {
                let targ = document.getElementById("fightlist").children[card]
                targ.removeEventListener("click", betargetOP)
            }




            let targ = e
            for (var arr = [], i = document.getElementById("fightlist").children.length; i;) arr[--i] = document.getElementById("fightlist").children[i];
            let pos = arr.indexOf(targ)
            // 

            for (var arr2 = [], i = document.getElementById("fightlistOP").children.length; i;) arr2[--i] = document.getElementById("fightlistOP").children[i];
            let posin = arr2.indexOf(isattacking) - 1

            anime({
                targets: isattacking,
                translateX: ["50%", -(260 + ((pos + 1) % 2) * 60) + "%"],
                translateY: ["-50%", (-50 + ((parseInt(pos / 2) - 1) * 70) + "%")],
                direction: 'alternate',
                loop: 2,
                duration: 700,
                easing: 'easeInOutExpo'
            })

            setTimeout(function () {
                let tmp = parseInt(e.children[4].innerHTML)
                // 
                // 
                let col = e.style.color
                if (col == "") col = 'rgb(0,0,0)'
                else col = 'rgb(255,255,255)'
                // 
                let tmp2 = tmp - parseInt(isattacking.children[3].innerHTML)
                if (tmp2 < 0) {
                    deadR = true
                    tmp2 = 0
                    anime({
                        targets: e,
                        opacity: 0.3,
                        duration: 300
                    })
                    // 
                    orderfight[orderfight.findIndex((a) => a == parseInt(e.getAttribute("data")))] = -1
                    let deadaf = document.createElement("img")
                    deadaf.classList.add("dead")
                    deadaf.setAttribute("src", "dead.png")
                    setTimeout(function () {
                        // 
                        e.appendChild(deadaf)
                        anime({
                            targets: deadaf,
                            easing: 'easeInOutSine',
                            opacity: 1,
                            duration: 300
                        })
                    }, 300)
                }
                anime({
                    targets: e.children[4],
                    innerHTML: [tmp, tmp2],
                    easing: 'linear',
                    round: 1
                })

                anime({
                    targets: e.children[4],
                    color: [col, 'rgb(255, 0, 0)'],
                    direction: 'alternate',
                    loop: 2,
                })
            }, 700)

            setTimeout(function () {
                // 
                // 
                isattacking.style.position = "relative"
                isattacking.style.right = "0%"
                isattacking.style.top = "0%"


                document.getElementById("fightlistOP").removeChild(document.getElementById("blank"))
                fintour = true


            }, 2450)

            setTimeout(function () {

                let rit = 27
                if (posin == 3) rit = 20

                anime({
                    targets: isattacking,
                    width: "26%",
                    zIndex: "0",
                    fontSize: "100%",
                    float: "right",
                    top: parseInt(posin / 2) * 30 + "%",
                    right: (posin % 2) * rit + "%",
                    translateX: ["50%", "0%"],
                    translateY: ['-50%', "0%"],
                    scale: "0.7",
                    easing: "easeInOutExpo"
                })



                for (var card = 0; card <= 6; card++) {
                    anime({
                        targets: document.getElementById("linksblocOP" + card),
                        opacity: 1
                    })

                    if (document.getElementById("fightlistOP").children[card] != isattacking && document.getElementById("fightlistOP").children[card] != document.getElementById("blank") && document.getElementById("fightlistOP").children[card].childElementCount < 9) {

                        anime({
                            targets: document.getElementById("fightlistOP").children[card],
                            opacity: 1
                        })
                    }
                }
            }, 1400)




        }




        function setTarget(e) {
            let cart = e//.target.parentElement
            let blank = cart.cloneNode(true)
            blank.style.filter = "grayscale(100%)"
            blank.style["-webkit-filter"] = "grayscale(100%)"
            blank.setAttribute("id", "blank")
            isattacking = cart
            // 
            for (var arr = [], i = document.getElementById("fightlist").children.length; i;) arr[--i] = document.getElementById("fightlist").children[i];
            let pos = arr.indexOf(cart)
            if (pos == 0) {
                document.getElementById("fightlist").prepend(blank)
            }
            else {
                document.getElementById("fightlist").children[pos - 1].after(blank)
            }
            cart.style.position = "absolute"
            cart.style.left = (pos % 2) * 22 + "%"
            cart.style.top = parseInt(pos / 2) * 30 + "%"
            cart.style.zIndex = "2"

            anime({
                targets: cart,
                width: "30%",
                //zIndex: "2",
                fontSize: "100%",
                float: "none",
                top: "50%",
                left: "50%",
                translateX: "-50%",
                translateY: "-50%",
                scale: "1",
                delay: 100
            })

            for (var card = 0; card <= 6; card++) {
                anime({
                    targets: document.getElementById("linksbloc" + card),
                    opacity: 0.3
                })

                if (document.getElementById("fightlist").children[card] != cart && document.getElementById("fightlist").children[card].getAttribute("id") != "blank") {
                    document.getElementById("fightlist").children[card].removeEventListener("click", setTarget)
                    anime({
                        targets: document.getElementById("fightlist").children[card],
                        opacity: 0.3
                    })
                }
            }

            for (var card = 0; card < 6; card++) {
                let targ = document.getElementById("fightlistOP").children[card]
                if (targ.children[4].innerHTML != "0") targ.addEventListener("click", betarget)
            }
        }


        function betarget(e) {

            for (var card = 0; card < 6; card++) {
                let targ = document.getElementById("fightlistOP").children[card]
                targ.removeEventListener("click", betarget)
            }


            let targ = e.target.parentElement
            for (var arr = [], i = document.getElementById("fightlistOP").children.length; i;) arr[--i] = document.getElementById("fightlistOP").children[i];
            let pos = arr.indexOf(targ)
            // 

            for (var arr2 = [], i = document.getElementById("fightlist").children.length; i;) arr2[--i] = document.getElementById("fightlist").children[i];
            let posin = arr2.indexOf(isattacking) - 1

            anime({
                targets: isattacking,
                translateX: ["-50%", (260 + ((pos + 1) % 2) * 60) + "%"],
                translateY: ["-50%", (-50 + ((parseInt(pos / 2) - 1) * 70) + "%")],
                direction: 'alternate',
                loop: 2,
                duration: 700,
                easing: 'easeInOutExpo'
            })


            setTimeout(function () {
                let tmp = parseInt(targ.children[4].innerHTML)
                let tmp2 = tmp - parseInt(isattacking.children[3].innerHTML)
                if (tmp2 < 0) {
                    deadR = true
                    tmp2 = 0
                    anime({
                        targets: targ,
                        opacity: 0.3,
                        duration: 300
                    })
                    // 
                    // 
                    orderfight[orderfight.findIndex((a) => a == parseInt(targ.getAttribute("data")))] = -1
                    // 
                    let deadaf = document.createElement("img")
                    deadaf.classList.add("dead")
                    deadaf.setAttribute("src", "dead.png")
                    setTimeout(function () {

                        targ.appendChild(deadaf)
                        anime({
                            targets: deadaf,
                            easing: 'easeInOutSine',
                            opacity: 1,
                            duration: 300
                        })
                    }, 300)

                }
                // 
                // 
                let col = targ.style.color
                if (col == "") col = 'rgb(0,0,0)'
                else col = 'rgb(255,255,255)'
                // 
                anime({
                    targets: targ.children[4],
                    innerHTML: [tmp, tmp2],
                    easing: 'linear',
                    round: 1
                })

                anime({
                    targets: targ.children[4],
                    color: [col, 'rgb(255, 0, 0)'],
                    direction: 'alternate',
                    loop: 2,
                })
            }, 700)


            setTimeout(function () {
                // 
                // 
                isattacking.style.position = "relative"
                isattacking.style.left = "0%"
                isattacking.style.top = "0%"


                document.getElementById("fightlist").removeChild(document.getElementById("blank"))
                fintour = true


            }, 2450)

            setTimeout(function () {


                let rit = 29
                if (posin == 3) rit = 22


                anime({
                    targets: isattacking,
                    width: "26%",
                    zIndex: "0",
                    fontSize: "100%",
                    float: "left",
                    top: parseInt(posin / 2) * 30 + "%",
                    left: (posin % 2) * rit + "%",
                    translateX: ["-50%", "0%"],
                    translateY: ['-50%', "0%"],
                    scale: "0.7",
                    easing: "easeInOutExpo"
                })



                for (var card = 0; card <= 6; card++) {
                    anime({
                        targets: document.getElementById("linksbloc" + card),
                        opacity: 1,
                    })
                    if (document.getElementById("fightlist").children[card] != isattacking && document.getElementById("fightlist").children[card] != document.getElementById("blank") && document.getElementById("fightlist").children[card].childElementCount < 9) {
                        document.getElementById("fightlist").children[card].addEventListener("click", setTarget)
                        anime({
                            targets: document.getElementById("fightlist").children[card],
                            opacity: 1
                        })
                    }
                }
            }, 1400)



        }


        function game() {

            let bonus = []
            let pop = document.createElement("p")

            pop.innerHTML = "3 Cartes sont tirées au hasard..."

            pop.setAttribute("id", "popu")

            anime({
                targets: pop,
                left: ['-27%', "50%"],
                duration: 2000
            })


            setTimeout(function () {
                anime({
                    targets: pop,
                    left: ['52%', "140%"],
                    duration: 2000
                })
            }, 2000)

            document.body.appendChild(pop)
            document.body.style.overflow = "hidden"
            let cartees = []
            for (var i = 0; i < clicked.length; i++) {
                if (clicked[i]) {
                    cartees.push(i)
                }
            }

            let tmp = 10

            document.body.removeChild(document.getElementById("list"))
            document.body.removeChild(document.getElementById("decks"))

            var threerandom = []
            // 
            for (var b = 0; b < 3; b++) {
                let isin = true
                let ultmp = Math.floor(Math.random() * 14)
                // 
                let tmp = cartees[ultmp]
                // 
                if (threerandom.includes(tmp)) isin = true
                else isin = false
                while (isin == true) {
                    tmp = cartees[Math.floor(Math.random() * 14)]
                    if (threerandom.includes(tmp)) isin = true
                    else isin = false
                }
                threerandom[b] = tmp
            }

            // 

            // 

            let overlay = document.createElement("div")
            overlay.setAttribute("id", "overlay")

            let lancer = document.createElement("button")
            lancer.setAttribute("id", "startgame")
            lancer.setAttribute("disabled", "")
            lancer.addEventListener("click", startgame)
            lancer.innerHTML = "LANCER"

            let ph = document.createElement("p")
            ph.innerHTML = "Ajoutez 3 cartes pour constituer une équipe !"
            overlay.appendChild(lancer)
            overlay.appendChild(ph)
            document.body.appendChild(overlay)

            anime({
                targets: overlay,
                right: 0,
                delay: 2100
            })

            let horizontal = document.createElement("div")
            horizontal.setAttribute("id", "listee")

            for (var o = 0; o < threerandom.length; o++) {
                finalfighters.push(threerandom[o])
                let carte = make_card(charaT, threerandom[o])
                carte.classList.remove("bloque")
                carte.classList.add("bloquel")
                horizontal.appendChild(carte)
                anime({
                    targets: carte,
                    translateY: 250,
                    //direction: 'reverse',
                    //easing: 'easeInOutSine',
                    delay: o * 700,
                    duration: 1200
                });
            }
            setTimeout(function () {
                horizontal.style.overflow = "visible"
            }, 1400)
            links[0] = getLink(charaT[threerandom[0]], charaT[threerandom[1]])
            let link = document.createElement("div")
            link.setAttribute("id", "linkbl")
            if (links[0] == 3) link.style.backgroundColor = "green"
            if (links[0] == 2) link.style.backgroundColor = "orange"
            if (links[0] == 1) link.style.backgroundColor = "red"
            bonus[0] = (links[0]-2)
             

            
      
            horizontal.appendChild(link)
            links[1] = getLink(charaT[threerandom[1]], charaT[threerandom[2]])
            let link2 = document.createElement("div")
            link2.setAttribute("id", "linkbr")
            if (links[1] == 3) link2.style.backgroundColor = "green"
            if (links[1] == 2) link2.style.backgroundColor = "orange"
            if (links[1] == 1) link2.style.backgroundColor = "red"
            bonus[1] = (links[1]-2 + links[0]-2)
            bonus[2] = (links[1]-2)
            horizontal.appendChild(link2)
            // 
            let link3 = document.createElement("div")
            link3.setAttribute("id", "linkml")
            let link4 = document.createElement("div")
            link4.setAttribute("id", "linkmr")
            let link5 = document.createElement("div")
            link5.setAttribute("id", "linktl")
            let link6 = document.createElement("div")
            link6.setAttribute("id", "linktr")
            let link7 = document.createElement("div")
            link7.setAttribute("id", "linkmm")

            horizontal.appendChild(link3)
            horizontal.appendChild(link4)
            horizontal.appendChild(link5)
            horizontal.appendChild(link6)
            horizontal.appendChild(link7)



            document.body.append(horizontal)

            setTimeout(function(){
            
                for(var i=0; i<3;i++){
                     
                     
                     
                     
                    let col2 ='rgb(0,0,0)'
                    if(document.getElementById("listee").children[i].children[0].getAttribute("src") == 'fut4.png' || document.getElementById("listee").children[i].children[0].getAttribute("src") == 'fut5.png' || document.getElementById("listee").children[i].children[0].getAttribute("src") == 'fut6.png'){
                        col2 ='rgb(255,255,255)'
                    }
                     
                    let color = 'rgb(255, 0, 0)'
                    if(tabl[bonus[0]+2] > 1) color = 'rgb(0, 255, 0)'
                    if(tabl[bonus[0]+2] == 1) color = 'rgb(255, 165, 0)'
                    anime({
                        targets:document.getElementById("listee").children[i].children[3],
                        innerHTML: parseInt(document.getElementById("listee").children[i].children[3].innerHTML)*tabl[bonus[0]+2],
                        round: 1
                    })
                    anime({
                        targets: document.getElementById("listee").children[i].children[3],
                        color: [col2, color],
                        direction: 'alternate',
                        loop: 2,
                    })
                    anime({
                        targets:document.getElementById("listee").children[i].children[4],
                        innerHTML: parseInt(document.getElementById("listee").children[i].children[4].innerHTML)*tabl[bonus[0]+2],
                        round: 1

                    })
                    anime({
                        targets: document.getElementById("listee").children[i].children[4],
                        color: [col2,color],
                        direction: 'alternate',
                        loop: 2,
                    })
                    anime({
                        targets:document.getElementById("listee").children[i].children[5],
                        innerHTML: parseInt(document.getElementById("listee").children[i].children[5].innerHTML)*tabl[bonus[0]+2],
                        round: 1

                    })
                    anime({
                        targets: document.getElementById("listee").children[i].children[5],
                        color: [col2, color],
                        direction: 'alternate',
                        loop: 2,
                    })
                }

            },2500)
            

            anime({
                targets: [link, link2],
                width: ["0px", "100px"],
                easing: 'easeInOutQuad',
                delay: 3 * 800
            })

            let xx = -(horizontal.clientWidth) / 2
            let yy = -(horizontal.clientHeight) / 2
            // 
            // 
            anime({
                targets: horizontal,
                borderColor: ['rgb(0, 0, 0)', 'rgba(255, 255, 255,0)'],
                translateY: [yy, yy + 180],
                translateX: [xx, xx + 320],
                duration: 600,
                easing: 'easeInOutQuad',
                delay: 3 * 800
            })

            let newpick = document.createElement("div")
            newpick.setAttribute("id", "newpick")
            let compt = 0;
            for (var g = 0; g < cartees.length; g++) {
                if (!(threerandom.includes(cartees[g]))) {
                    // 
                    let blocc = make_card(charaT, cartees[g], false)
                    clicked2[cartees[g]] = false
                    blocc.addEventListener("click", function () {
                        // 
                        positionclick += 1
                        if (positionclick == 3) {
                            let linktmp4 = document.getElementById("linktr")
                            let linktmp5 = document.getElementById("linkmr")
                            let tt = parseInt(blocc.getAttribute("data"))
                            let tt2 = parseInt(document.getElementById("listee").children[11].getAttribute("data"))
                            links[2] = getLink(charaT[tt], charaT[tt2])
                            // 
                            
                            if (links[2] == 3) linktmp4.style.backgroundColor = "green"
                            if (links[2] == 2) linktmp4.style.backgroundColor = "orange"
                            if (links[2] == 1) linktmp4.style.backgroundColor = "red"
                            anime({
                                targets: [linktmp5],
                                height: ["0px", "100px"],
                                easing: 'easeInOutQuad',
                            })
                            links[3] = getLink(charaT[tt], charaT[threerandom[2]])
                            if (links[3] == 3) linktmp5.style.backgroundColor = "green"
                            if (links[3] == 2) linktmp5.style.backgroundColor = "orange"
                            if (links[3] == 1) linktmp5.style.backgroundColor = "red"
                            anime({
                                targets: [linktmp4],
                                width: ["0px", "100px"],
                                easing: 'easeInOutQuad',
                            })
                        }
                        if (positionclick == 2) {
                            let linktmp2 = document.getElementById("linktl")
                            let linktmp3 = document.getElementById("linkmm")
                            anime({
                                targets: [linktmp3],
                                height: ["0px", "100px"],
                                easing: 'easeInOutQuad',
                            })
                            let tt = parseInt(blocc.getAttribute("data"))
                            let tt2 = parseInt(document.getElementById("listee").children[10].getAttribute("data"))
                            links[4] = getLink(charaT[tt], charaT[tt2])
                            if (links[4] == 3) linktmp2.style.backgroundColor = "green"
                            if (links[4] == 2) linktmp2.style.backgroundColor = "orange"
                            if (links[4] == 1) linktmp2.style.backgroundColor = "red"
                            anime({
                                targets: [linktmp2],
                                width: ["0px", "100px"],
                                easing: 'easeInOutQuad',
                            })
                            links[5] = getLink(charaT[threerandom[1]], charaT[tt])
                            if (links[5] == 3) linktmp3.style.backgroundColor = "green"
                            if (links[5] == 2) linktmp3.style.backgroundColor = "orange"
                            if (links[5] == 1) linktmp3.style.backgroundColor = "red"
                        }
                        if (positionclick == 1) {
                            // 
                            let linktmp = document.getElementById("linkml")
                            anime({
                                targets: [linktmp],
                                height: ["0px", "100px"],
                                easing: 'easeInOutQuad',
                            })
                            let tt = parseInt(blocc.getAttribute("data"))
                            links[6] = getLink(charaT[tt], charaT[threerandom[0]])
                            // 
                            if (links[6] == 3) linktmp.style.backgroundColor = "green"
                            if (links[6] == 2) linktmp.style.backgroundColor = "orange"
                            if (links[6] == 1) linktmp.style.backgroundColor = "red"

                        }
                        let newindx = parseInt(blocc.getAttribute("data"))

                        if (clicked2[newindx] == false && countclicked2 < 3) {
                            // 
                            countclicked2 += 1

                            if (countclicked2 == 3) {
                                document.getElementById("startgame").removeAttribute("disabled")
                            }
                            else {
                                document.getElementById("startgame").setAttribute("disabled", "")
                            }
                            document.getElementById("listee").style.overflow = "visible"
                            let p = ([].slice.call(document.getElementById("newpick").children)).indexOf(blocc)
                            // 

                            anime({
                                targets: blocc,
                                width: "27%",
                                easing: 'easeInOutSine',
                                direction: 'alternate',
                                duration: 250
                            })
                            anime({
                                targets: blocc,
                                easing: 'easeInOutSine',
                                opacity: 0,
                                duration: 250,
                                delay: 250
                            })


                            let tmp = make_card(charaT, newindx, false)
                            // 
                            tmp.classList.remove("bloque")
                            tmp.classList.add("bloquel")
                            horizontal.appendChild(tmp)
                            tmp.style.transform = "translateY(-320px)"
                            tmp.addEventListener("click", function () {
                                let dat = tmp.getAttribute("data")



                                anime({
                                    targets: tmp,
                                    width: ["25%", "40%"],
                                    easing: 'easeInOutSine',
                                    duration: 250,
                                    opacity: 0
                                })
                                setTimeout(function () {
                                    document.getElementById("listee").removeChild(tmp)
                                    positionclick -= 1

                                }, 250)

                                setTimeout(function () {
                                    if (positionclick == 2) {
                                        let linktmp4 = document.getElementById("linktr")
                                        let linktmp5 = document.getElementById("linkmr")
                                        let linktmp0 = document.getElementById("linktl")
                                        let linktmp00 = document.getElementById("linkmm")
                                        links[2] = 0
                                        anime({
                                            targets: [linktmp5],
                                            height: ["100px", "0px"],
                                            easing: 'easeInOutQuad',
                                        })
                                        links[3] = 0
                                        anime({
                                            targets: [linktmp4],
                                            width: ["100px", "0px"],
                                            easing: 'easeInOutQuad',
                                        })
                                        let tt = parseInt(document.getElementById("listee").children[10].getAttribute("data"))
                                        let tt2 = parseInt(document.getElementById("listee").children[11].getAttribute("data"))
                                        links[4] = getLink(charaT[tt2], charaT[tt])
                                         
                                        let coltmp = ""
                                        if (links[4] == 3) coltmp = "rgb(0, 128, 0)"
                                        if (links[4] == 2) coltmp = 'rgb(255, 165, 0)'
                                        if (links[4] == 1) coltmp = 'rgb(255, 0, 0)'
                                        anime({
                                            targets: linktmp0,
                                            backgroundColor: coltmp,
                                            duration: 1500
                                        })
                                        links[5] = getLink(charaT[tt2], charaT[threerandom[1]])

                                        let coltmp2 = ""
                                        if (links[5] == 3) coltmp2 = "rgb(0, 128, 0)"
                                        if (links[5] == 2) coltmp2 = 'rgb(255, 165, 0)'
                                        if (links[5] == 1) coltmp2 = 'rgb(255, 0, 0)'
                                        anime({
                                            targets: linktmp00,
                                            backgroundColor: coltmp2,
                                            duration: 1500
                                        })

                                    }
                                    if (positionclick == 1) {
                                        let linktmp2 = document.getElementById("linktl")
                                        let linktmp3 = document.getElementById("linkmm")
                                        let linktmp03 = document.getElementById("linkml")
                                        links[4] = 0
                                        anime({
                                            targets: [linktmp3],
                                            height: ["100px", "0px"],
                                            easing: 'easeInOutQuad',
                                        })
                                        links[5] = 0
                                        anime({
                                            targets: [linktmp2],
                                            width: ["100px", "0px"],
                                            easing: 'easeInOutQuad',
                                        })
                                        let tt = parseInt(document.getElementById("listee").children[10].getAttribute("data"))

                                        links[6] = getLink(charaT[threerandom[0]], charaT[tt])


                                        let coltmp3 = ""
                                        if (links[6] == 3) coltmp3 = "rgb(0, 128, 0)"
                                        if (links[6] == 2) coltmp3 = 'rgb(255, 165, 0)'
                                        if (links[6] == 1) coltmp3 = 'rgb(255, 0, 0)'
                                        anime({
                                            targets: linktmp03,
                                            backgroundColor: coltmp3,
                                            duration: 1500
                                        })

                                    }
                                    if (positionclick == 0) {
                                        // 
                                        let linktmp = document.getElementById("linkml")
                                        links[6] = 0
                                        anime({
                                            targets: [linktmp],
                                            height: ["100px", "0px"],
                                            easing: 'easeInOutQuad',
                                        })

                                    }
                                }, 300)


                                let newtarget = ".bloque2[data='" + dat + "']"
                                // 
                                anime({
                                    targets: newtarget,
                                    width: ["21%", "24%"],
                                    easing: 'easeInOutSine',
                                    duration: 250,
                                    opacity: 1
                                })
                                clicked2[parseInt(dat)] = false
                                countclicked2 -= 1
                                if (countclicked2 == 3) {
                                    document.getElementById("startgame").removeAttribute("disabled")
                                }
                                else {
                                    document.getElementById("startgame").setAttribute("disabled", "")
                                }


                            })

                            anime({
                                targets: tmp,
                                width: ["40%", "25%"],
                                easing: 'easeInOutSine',
                                duration: 250
                            })

                            clicked2[newindx] = true

                        }


                    })
                    if (compt % 4 == 0) {
                        blocc.style.clear = "left"
                    }
                    blocc.classList.remove("bloque")
                    blocc.classList.add("bloque2")
                    newpick.appendChild(blocc)
                    compt++
                }
            }


            document.body.appendChild(newpick)

            anime({
                targets: newpick,
                translateX: 620,
                translateY: '-50%',
                duration: 700,
                delay: 3 * 900,
                easing: 'easeInOutExpo'
            })





        }



        function startgame() {
            anime({
                targets: document.getElementById("opa"),
                backgroundColor: ["rgba(255,255,255,0.6)", "rgba(255,255,255,0)"]
            })
            // 
            document.body.removeChild(document.getElementById("listee"))
            document.body.removeChild(document.getElementById("newpick"))
            document.body.removeChild(document.getElementById("overlay"))
            // 
            let t = document.createElement("div")
            t.setAttribute("id", "fightlist")
            document.body.appendChild(t)
            let t2 = document.createElement("div")
            t2.setAttribute("id", "fightlistOP")
            document.body.appendChild(t2)

            for (var i = 0; i < clicked2.length; i++) {
                if (clicked2[i] == true) {
                    finalfighters.push(i)
                }
            }

            // 
            let ofight = []
            let ordappear = [0, 3, 1, 4, 2, 5]
            for (var i = 0; i < finalfighters.length; i++) {
                let nindex = ordappear[i]
                let cart = make_card(charaT, finalfighters[nindex], false)
                ofight.push({
                    id: finalfighters[nindex],
                    vit: parseInt(cart.children[5].innerHTML)
                })
                if (i == 0 || i == 4) {
                    if (i == 4) cart.style.clear = "left"
                    cart.classList.add("bloque4")
                    cart.classList.remove("bloque")
                }
                if (i == 1 || i == 3 || i == 5) {
                    cart.classList.add("bloque3")
                    cart.classList.remove("bloque")
                }
                if (i == 2) {
                    cart.classList.add("bloque5")
                    cart.classList.remove("bloque")
                }
                document.getElementById("fightlist").appendChild(cart)
                //cart.addEventListener("click",setTarget)
            }

            anime({
                targets: t,
                translateX: [-500, 0],
                duration: 700,
                easing: 'easeInOutExpo'
            })

            ofight.sort((a, b) => b.vit - a.vit)
             


             


            fetch('./game.json', { method: 'GET' })
                .then(res => res.json())
                .then(json => {
                    const opponents = json
                    let opolvl = opponents.find((element) => element[0] == nivo)

                    //let opjolvl = opponents[0]
                     
                     

                     
                    let links2 = [
                        getLink(charaT.find((element) => element.id == opolvl[1]), charaT.find((element) => element.id == opolvl[3])),
                        getLink(charaT.find((element) => element.id == opolvl[3]), charaT.find((element) => element.id == opolvl[5])),
                        getLink(charaT.find((element) => element.id == opolvl[4]), charaT.find((element) => element.id == opolvl[6])),
                        getLink(charaT.find((element) => element.id == opolvl[5]), charaT.find((element) => element.id == opolvl[6])),
                        getLink(charaT.find((element) => element.id == opolvl[2]), charaT.find((element) => element.id == opolvl[4])),
                        getLink(charaT.find((element) => element.id == opolvl[3]), charaT.find((element) => element.id == opolvl[4])),
                        getLink(charaT.find((element) => element.id == opolvl[1]), charaT.find((element) => element.id == opolvl[2]))
                    ]
                    let ofight2 = []
                    let linksbloc2 = []

                    for (var i = 1; i < opolvl.length; i++) {
                        let cart = make_card(charaT, charaT.findIndex((a) => a.id == opolvl[i]), false)
                        moneywin += parseInt(cart.children[4].innerText)
                        ofight2.push({
                            id: charaT.findIndex((a) => a.id == opolvl[i]),
                            vit: parseInt(cart.children[5].innerHTML)
                        })

                        if (i == 1 || i == 5) {
                            if (i == 5) cart.style.clear = "right"
                            cart.classList.add("bloque44")
                            cart.classList.remove("bloque")
                        }
                        if (i == 2 || i == 4 || i == 6) {
                            cart.classList.add("bloque33")
                            cart.classList.remove("bloque")
                        }
                        if (i == 3) {
                            cart.classList.add("bloque55")
                            cart.classList.remove("bloque")
                        }
                        document.getElementById("fightlistOP").appendChild(cart)
                    }
                    for (var i = 0; i < 7; i++) {
                        linksbloc2[i] = document.createElement("div")
                        linksbloc2[i].setAttribute("id", "linksblocOP" + i)
                        document.getElementById("fightlistOP").appendChild(linksbloc2[i])
                        if (links2[i] == 3) {
                            linksbloc2[i].style.backgroundColor = "green"
                        }
                        if (links2[i] == 2) {
                            linksbloc2[i].style.backgroundColor = "orange"
                        }
                        if (links2[i] == 1) {
                            linksbloc2[i].style.backgroundColor = "red"
                        }
                    }
                    anime({
                        targets: t2,
                        translateX: [500, 0],
                        duration: 700,
                        easing: 'easeInOutExpo'
                    })

                    ofight2.sort((a, b) => b.vit - a.vit)

                    let firstfight = -1

                    if (ofight[0].vit > ofight2[0].vit) {
                        firstfight = 0
                    }
                    else firstfight = 1
                     
                    if (firstfight == 0) {
                        for (let b = 0; b < 12; b++) {
                            if (b % 2 == 0) {
                                 
                                orderfight.push(ofight[b / 2].id)
                            }
                            else {
                                orderfight.push(ofight2[(b - 1) / 2].id)
                            }


                        }
                    }
                    else {
                        for (let b = 0; b < 12; b++) {
                            if (b % 2 == 0) {
                                orderfight.push(ofight2[b / 2].id)
                            }
                            else {
                                orderfight.push(ofight[(b - 1) / 2].id)
                            }


                        }
                    }

                    let linksbloc = []
                    let bonusA = [0,0,0,0,0,0]
                    for (var i = 0; i < 7; i++) {
                        linksbloc[i] = document.createElement("div")
                        linksbloc[i].setAttribute("id", "linksbloc" + i)
                        document.getElementById("fightlist").appendChild(linksbloc[i])
                        if (links[i] == 3) {
                            linksbloc[i].style.backgroundColor = "green"
                        }
                        if (links[i] == 2) {
                            linksbloc[i].style.backgroundColor = "orange"
                        }
                        if (links[i] == 1) {
                            linksbloc[i].style.backgroundColor = "red"
                        }
                        if(i == 6){
                            bonusA[0] = bonusA[0] + links[i] - 2
                            bonusA[1] = bonusA[1] + links[i] - 2
                        }
                        if(i == 5){
                            bonusA[2] = bonusA[2] + links[i]- 2
                            bonusA[3] = bonusA[3] + links[i]- 2
                        }
                        if(i == 4){
                            bonusA[1] = bonusA[1] + links[i]- 2
                            bonusA[3] = bonusA[3] + links[i]- 2
                        }
                        if(i == 3){
                            bonusA[4] = bonusA[4] + links[i]- 2
                            bonusA[5] = bonusA[5] + links[i]- 2
                        }
                        if(i == 2){
                            bonusA[3] = bonusA[3] + links[i]- 2
                            bonusA[5] = bonusA[5] + links[i]- 2
                        }
                        if(i == 1){
                            bonusA[2] = bonusA[2] + links[i]- 2
                            bonusA[4] = bonusA[4] + links[i]- 2
                        }
                        if(i == 0){
                            bonusA[0] = bonusA[0] + links[i]- 2
                            bonusA[2] = bonusA[2] + links[i]- 2
                        }
                     
                    }
                    let bonusA1 = []
                    for(var kk = 0; kk< 6; kk++){
                        bonusA1.push(tabl[bonusA[kk]+3])
                    }
                    let d = document.getElementById("fightlist")
                    for(let g=0; g<6;g++){
                        
                        let col2 ='rgb(0,0,0)'
                        if(d.children[g].children[0].getAttribute("src") == 'fut4.png' || d.children[g].children[0].getAttribute("src") == 'fut5.png' || d.children[g].children[0].getAttribute("src") == 'fut6.png'){
                            col2 ='rgb(255,255,255)'
                        }
                        let color = 'rgb(255, 0, 0)'
                        if(bonusA1[g] > 1) color = 'rgb(0, 255, 0)'
                        if(bonusA1[g] == 1) color = 'rgb(255, 165, 0)'
                         
                        anime({
                            targets: d.children[g].children[4],
                            round:1,
                            innerHTML:parseInt(d.children[g].children[4].innerHTML)*bonusA1[g]
                        })
                        anime({
                            targets: d.children[g].children[4],
                            color: [col2, color],
                            direction: 'alternate',
                            loop: 2,
                        })
                    }
                     
                    setTimeout(function () {
                        if (firstfight == 0) {
                            document.getElementById("fightlistOP").style.zIndex = "1"
                            document.getElementById("fightlist").style.zIndex = "2"
                            setTarget(document.querySelector("#fightlist div[data='" + orderfight[tour % 12] + "']"))
                            tour += 1
                            fintour = false
                            var tours = setInterval(function () {
                                 
                                let fin = true
                                let carts = document.getElementById("fightlist").children
                                for (var cr = 0; cr < 6; cr++) {
                                     
                                    if (parseInt(carts[cr].children[4].innerHTML) > 0) {
                                        fin = false
                                        break
                                    }
                                }
                                if (fin == false) {
                                    fin = true
                                    let cartsOP = document.getElementById("fightlistOP").children
                                    for (var cr = 0; cr < 6; cr++) {
                                         
                                        if (parseInt(cartsOP[cr].children[4].innerHTML) > 0) {
                                            fin = false
                                            break
                                        }
                                    }
                                    if (fin == true) vainqueur = true
                                }
                                if (fin == true) {
                                    clearInterval(tours)
                                    fingame(vainqueur)
                                }
                                if (fintour == true) {
                                    if (orderfight[tour % 12] == -1) {
                                        tour += 1
                                    }
                                    else {
                                        if (tour % 2 == 0) {
                                             
                                            document.getElementById("fightlistOP").style.zIndex = "1"
                                            document.getElementById("fightlist").style.zIndex = "2"
                                            // 
                                            setTarget(document.querySelector("#fightlist div[data='" + orderfight[tour % 12] + "']"))


                                        }
                                        else {

                                            document.getElementById("fightlistOP").style.zIndex = "2"
                                            document.getElementById("fightlist").style.zIndex = "1"
                                            // 
                                            setTargetOP(document.querySelector("#fightlistOP div[data='" + orderfight[tour % 12] + "']"))

                                        }

                                        tour += 1

                                        fintour = false
                                    }
                                }
                            }, 100)
                        }
                        else {

                            document.getElementById("fightlistOP").style.zIndex = "2"
                            document.getElementById("fightlist").style.zIndex = "1"
                            setTargetOP(document.querySelector("#fightlistOP div[data='" + orderfight[tour % 12] + "']"))
                            tour += 1

                            fintour = false

                            var tours2 = setInterval(function () {
                                 
                                let fin = true
                                let carts = document.getElementById("fightlist").children
                                for (var cr = 0; cr < 6; cr++) {
                                     
                                    if (parseInt(carts[cr].children[4].innerHTML) > 0) {
                                        fin = false
                                        break
                                    }
                                }
                                if (fin == false) {
                                    fin = true
                                    let cartsOP = document.getElementById("fightlistOP").children
                                    for (var cr = 0; cr < 6; cr++) {
                                         
                                        if (parseInt(cartsOP[cr].children[4].innerHTML) > 0) {
                                            fin = false
                                            break
                                        }
                                    }
                                    if (fin == true) vainqueur = true
                                }

                                if (fin == true) {
                                    clearInterval(tours2)
                                    fingame(vainqueur)
                                }

                                if (fintour == true) {
                                    if (orderfight[tour % 12] == -1) {
                                        tour += 1
                                    }
                                    else {
                                        // 
                                        if (tour % 2 == 0) {
                                            // 

                                            document.getElementById("fightlistOP").style.zIndex = "2"
                                            document.getElementById("fightlist").style.zIndex = "1"
                                            setTargetOP(document.querySelector("#fightlistOP div[data='" + orderfight[tour % 12] + "']"))


                                        }
                                        else {
                                            // 

                                            document.getElementById("fightlistOP").style.zIndex = "1"
                                            document.getElementById("fightlist").style.zIndex = "2"
                                            setTarget(document.querySelector("#fightlist div[data='" + orderfight[tour % 12] + "']"))

                                        }

                                        tour += 1

                                        fintour = false
                                    }
                                }
                            }, 100)
                        }
                    }, 1000)






                })
        }

        // 



        document.getElementById("start").addEventListener("click", game)
        //document.getElementById("startgame").addEventListener("click",startgame)
        /*let intev = setInterval(function () {
                if(ccom >= charaT.length) clearInterval(intev) 
                if(cards.includes(ccom.toString())){
                    make_card(charaT, ccom)     
                }
                ccom+=1
            }, 50);*/

    })



function fingame(vainqueur) {

    setTimeout(function () {
        const body = document.body

        //body.removeChild(document.getElementById("fightlistOP"))


        if (!vainqueur) {
            let fond = document.createElement("div")
            fond.setAttribute("id", "fond")
            body.appendChild(fond)


            anime({
                targets: fond,
                background: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.6)"]
            })

            let btn = document.createElement("a")
            let moneye = document.createElement("p")
            let cont = document.createElement("div")
            cont.setAttribute("id", "cont")

            moneye.setAttribute("id", "moneye")


            btn.setAttribute("href", "index.php")
            btn.setAttribute("id", "bouton")
            btn.innerHTML = "ACCUEIL"

            let btnret = document.createElement("p")

            btnret.addEventListener("click", function () {
                location.reload()
            })
            btnret.setAttribute("id", "boutonret")
            btnret.innerHTML = "REESSAYER"


            fond.appendChild(moneye)
            cont.appendChild(btnret)
            cont.appendChild(btn)
            fond.appendChild(cont)
            moneye.innerText = "PERDU !"
        }
        else {
            var data = "userid=" + idsession + "&actlvl=" + actlvl + "&moneywin=" + moneywin;
             
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    let fond = document.createElement("div")
                    fond.setAttribute("id", "fond")
                    body.appendChild(fond)


                    anime({
                        targets: fond,
                        background: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.6)"]
                    })

                    let btn = document.createElement("a")
                    let moneye = document.createElement("p")


                    btn.setAttribute("href", "index.php")
                    btn.setAttribute("id", "bouton")
                    btn.innerHTML = "ACCUEIL"
                    fond.appendChild(btn)
                    fond.appendChild(moneye)
                    anime({
                        targets: moneye,
                        innerHTML: "+" + moneywin,
                        round: 0
                    })

                }
            }


            xhttp.open("POST", "updatecards.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(data);
        }

    }, 3000)

}
