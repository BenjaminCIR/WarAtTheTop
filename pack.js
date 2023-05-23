import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.es.js';

var listeALIASES = []
var listeSTAT = []
var charaT
var cardgain = []

var nbclick = 0
var prev = 0
var nbclick2 = 0
var prev2 = 0
var nbclick3 = 0
var prev3 = 70




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


function opening(){
    console.log("ok")
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

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
                                var pack = jisone[0].list
                                console.log(pack)
                                console.log(charaT)
                      
                                let packd = []
                                for(var i=0; i< pack.length;i++){
                                    console.log(charaT.findIndex((element) => element.id == pack[i]))
                                    packd.push(make_card(charaT,charaT.findIndex((element) => element.id == pack[i])))
                                }
                                console.log(packd)
                               
                                console.log(cardgain)

                                let ca = []
                                for(let t=0; t< 5; t++){
                                    if(t>0) ca.push(cardgain[t-1].getAttribute("data"))
                                    let etoileg =  Math.floor(Math.random() * 781);
                                    let etoile
                                    console.log(etoileg)
                                
                                    if(etoileg >= 0 && etoileg <= 400){
                                        etoile = 1
                                    }

                                    if(etoileg >= 400 && etoileg <= 630){
                                        etoile = 2
                                    }
                                    if(etoileg >= 630 && etoileg <= 730){
                                        etoile = 3
                                    }
                                    if(etoileg >= 730 && etoileg <= 764){
                                        etoile = 4
                                    }
                                    if(etoileg >= 764 && etoileg <= 775){
                                        etoile = 5
                                    }

                                    if(etoileg >= 775  && etoileg <= 780){
                                        etoile = 6
                                    }

                                    
                                    let tmp = Math.floor(Math.random() * pack.length)
                                    let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                    cardgain[t] = (make_card(charaT,numbtmp))
                                    if(etoile == 1){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut2.png" && ca.includes(cardgain[t].getAttribute("data")) == false){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 2){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut3.png" && ca.includes(cardgain[t].getAttribute("data")) == false){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 3){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut4.png" && ca.includes(cardgain[t].getAttribute("data")) == false){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 4){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut5.png" && ca.includes(cardgain[t].getAttribute("data")) == false){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 5){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut6.png" && ca.includes(cardgain[t].getAttribute("data")) == false){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                    if(etoile == 6){
                                        while(cardgain[t].children[0].getAttribute("src") != "fut7.png" && ca.includes(cardgain[t].getAttribute("data")) == false){
                                            let tmp = Math.floor(Math.random() * pack.length)
                                            let numbtmp =  charaT.findIndex((element)=> element.id == pack[tmp])
                                            cardgain[t] = (make_card(charaT,numbtmp))
                                        }
                                    }
                                }
                                console.log(cardgain)
                            
                               
                                
                                let to2 = setInterval(function(){

                                    nbclick3 += 5
                                    if(nbclick3 > 70){
                                        nbclick3 = 70
                                        clearInterval(to2)
                                        let list = document.createElement("div")
                                        list.setAttribute("id","newitems")
                                        document.body.appendChild(list)
                                        for(var i =0; i<5;i++){
                                            list.appendChild(cardgain[i])

                                        }
                                        for(var l =0; l< 5; l++){
                                            cardgain[l].style.opacity = '1';
                                            cardgain[l].style.left = '46%';
                                            cardgain[l].style.transform = 'translateX(-50%)';
                                            cardgain[l].style.border = 'none';
                                            cardgain[l].style.zIndex = '0';
                                            cardgain[l].style.bottom = '8%';
                                            cardgain[l].style.position = 'absolute';
                                        }

                                        anime({
                                            targets:cardgain[0],
                                            bottom:["0px","400px"]
                                        })
                                        setTimeout(function(){
                                            cardgain[0].style.zIndex = 3
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
                                                    cardgain[1].style.zIndex = 3
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
                                                            cardgain[2].style.zIndex = 3
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
                                                                    cardgain[1].style.zIndex = 3
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
                                                                            cardgain[1].style.zIndex = 3
                                                                            anime({
                                                                                targets:cardgain[4],
                                                                                bottom:["400px","0px"],
                                                                                left:["46%","82%"],
                                                                                duration:2000
                                                                            })
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
                                    image3.src = "Pack/pack_silver.png"; 

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
            image2.src = "Pack/pack_silver.png"; 
            console.log(image2.style.opacity)
            image2.onload = function(){
                ctx.drawImage(image2, 0, 80, 500, 60, wid,0-nbclick2*2.5, 500, 60);
            }
            prev2 = nbclick2
        })
       

    }
    else{
        console.log(nbclick)
        var image = new Image();
        image.src = "Pack/pack_silver.png"; 
        let wid = 0.25*(document.body.clientWidth) -  180
        ctx.clearRect(wid+prev, 60, 500, 10);
        image.onload = function(){
            ctx.drawImage(image, 0, 140, (500- 50*nbclick), 10, wid,60, (500- 50*nbclick), 10);
        }
        prev = (500- 50*nbclick)
        console.log(image)
    }
}

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
    if(clickable){
        bloc.addEventListener("click",function(){
            if(clicked[identifiant] == false){
                console.log("1")
                countclicked+=1
                anime({
                    targets: bloc,
                    borderColor: ['rgb(255, 255, 255)','#e3bc5c'],
                    //easing:'easeInOutExpo',
                    duration:600,
                    borderRadius:[0,15]
                });
                clicked[identifiant] = true
            }
            else{
                console.log("2")
                countclicked -=1
                anime({
                    targets: bloc,
                    borderColor: ['#e3bc5c','rgb(255, 255,255)'],
                    //easing:'easeInOutExpo',
                    duration:600,
                    borderRadius:[15,0]
                })
                clicked[identifiant] = false
            }
            if(countclicked == 15){
                document.getElementById("start").removeAttribute("disabled")
            }
            else{
                document.getElementById("start").setAttribute("disabled","")
            }
        })
    }

    return bloc
}

document.getElementById("clik").oninput = opening

fetch('./chara.json',{method:'GET'})
    .then(res1 => res1.text())
    .then(text1 => {
        eval("charaT ="+text1)

        let wid = 0.25*(document.body.clientWidth) -  180
        console.log(wid)
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

    
        var image2 = new Image();
        image2.src = "Pack/pack_silver.png"; 

        var image3 = new Image();
        image3.src = "Pack/pack_silver.png"; 
        

        image2.onload = function(){
            ctx.drawImage(image2, 0, 80, 500, 60, wid,0, 500, 60);
        }
        
        var image = new Image();
        image.src = "Pack/pack_silver.png"; 
        ctx.clearRect(wid, 60, 500, 10);
        image.onload = function(){
            ctx.drawImage(image, 0, 140, 500, 10, wid,60,500, 10);
        }

        

        

            image3.onload = function(){
                ctx.drawImage(image3, 0, 150, 500, 2000,wid ,70, 500, 1750);
            }

        
       

    })


    