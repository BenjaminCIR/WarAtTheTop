import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.es.js';



var listeALIASES = []
var listeSTAT = []

var orderfight = []
var clicked = []
var clicked2 = []
var countclicked = 0
var flip = 0
var charaT = []

var finalfighters =[]
var countclicked2 = 0

var isdeckclicked = -1

var isattacking = -1

var fin = false
var fintour = false
var tour = 0

var offset1 = 0
var offset2 = 0


String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
     
    return str;
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
    console.log((charaTT[identifiant].name))
    console.log(parseInt(charaTT[identifiant].crew_id))
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

function getDATA(){
    var chara = []
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.api-onepiece.com/characters");
    xhr.send();
    xhr.responseType = "json";

    fetch('https://optc-db.github.io/common/data/aliases.js',{method:'GET'})
                .then(res => res.text())
                .then(text => {
                    const tableau = "listeALIASES" +  text.substring(30,text.length - 28049)
                    eval(tableau)
                    
    })
    fetch('https://optc-db.github.io/common/data/units.js',{method:'GET'})
                .then(res => res.text())
                .then(text => {
                    let position = text.search("var calcGhostStartID")
                    const stats = "listeSTAT" +  text.substring(13,position)
                    eval(stats)            
    })

    

    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            
            for(var i = 0; i< data.length; i++){
                let nametmpp = (data[i]).french_name
                let name = ""
                let find = false
                
                var id = -1
                let nametmp = nametmpp.sansAccent()
                if(nametmp.search(" D ") != -1){
                    name = nametmp.replace(" D "," D. ")
                }
                else{
                    if(nametmp.search("-") !=-1){
                        name = nametmp.replace("-"," ")
                    }
                    else{
                        if(nametmp.search(" / ") !=-1){
                            name = nametmp.substring(0, nametmp.search(" / "))
                        }
                        else{
                            name = nametmp
                        }
                    }
                }
                
                // MUGIWARA + ACE + SABO + SHANKS + BB + ROGER + PIHAWK
                for(let k= 0; k< listeSTAT.length; k++){
                    if(listeSTAT[k].includes(name)){
                        id = k+1
                        find = true
                        chara.push({
                            name : name,
                            id : id,
                            prime : (data[i]).bounty,
                            age : (data[i]).age,
                            size : (data[i]).size,
                            fruit : (data[i]).fruit_id,
                            fruit2 : (data[i]).second_fruit_id,
                            job : (data[i]).job,
                            crew_id:(data[i]).crew_id
                        })
                        break;
                    }
                }
                if(find === false){
                    for (const [key, value] of Object.entries(listeALIASES)) {
                        if(listeALIASES[key].includes(name)){
                            id = key
                            chara.push({
                                name : name,
                                id : (id),
                                prime : (data[i]).bounty,
                                age : (data[i]).age,
                                size : (data[i]).size,
                                fruit : (data[i]).fruit_id,
                                fruit2 : (data[i]).second_fruit_id,
                                job : (data[i]).job
                            })
                            break;
                        }
                    
                        
                    }
                }
                
               
            

            }
            fetch('./data.json')
                .then(response => response.json())
                .then(json => {
                    const additionals = json
                    for(var j=0; j< additionals.length;j++){
                        let name2 = (additionals[j]).name
                        for(let k= 0; k< listeSTAT.length; k++){
                            if(listeSTAT[k].includes(name2)){          
                                id = (k+1)
                                chara.push({
                                    name : (additionals[j]).usagename,
                                    id : id,
                                    prime : (additionals[j]).bounty,
                                    age : (additionals[j]).age,
                                    size : (additionals[j]).size,
                                    fruit : (additionals[j]).fruit_id,
                                    fruit2 : (additionals[j]).second_fruit_id,
                                    job : (additionals[j]).job
                                })
                                break;
                            }
                        
                        }
                    }
                })
            
        

        

        
        }
        else {
            console.log(`Error: ${xhr.status}`);
        }
    }
    return (chara)
}


charaT = getDATA()


console.log(charaT)
setTimeout(function(){
    for(var i=0;i< charaT.length;i++){
        if(cards.includes((charaT[i].id).toString())){
            let bloc = make_card(charaT,i,true)
            document.getElementById("list").appendChild(bloc)
            clicked[i] = false
        }
    }

    for(var y = 0; y < decks.length; y+=1){
        let dek = document.querySelector(".cdeck[data=deck"+y+"]")  
        dek.style.top = y*20 +"%"
        dek.addEventListener("click",function(){
            let idx = parseInt(dek.getAttribute("data").substring(4,dek.getAttribute("data").length))
            if(isdeckclicked == -1 || isdeckclicked == idx){
                console.log(dek.getAttribute("data"))
                let dekjs = decks[idx].split(",")

                for(var ko=0; ko< dekjs.length;ko++){
                    let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjs[ko]))
                    console.log(ix)
                    document.querySelector(".bloque[data='"+ix+"']").click()
                }
                isdeckclicked = idx;
            }
            else{
                let dekjsUC = decks[isdeckclicked].split(",")

                for(var ko=0; ko< dekjsUC.length;ko++){
                    let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjsUC[ko]))
                    document.querySelector(".bloque[data='"+ix+"']").click()
                }

                let dekjs = decks[idx].split(",")

                for(var ko=0; ko< dekjs.length;ko++){
                    let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjs[ko]))
                    document.querySelector(".bloque[data='"+ix+"']").click()
                }
                isdeckclicked = idx;

            }
        })
        let dekjs = decks[y].split(",")
    
        for(var l = 1; l < dekjs.length; l++){
            console.log(dekjs[l])
            let ix = charaT.findIndex(element => parseInt(element.id) === parseInt(dekjs[l]))
            console.log(ix)
            let carto = make_card(charaT,ix,false,true)
            carto.classList.remove("bloque")
            carto.classList.add("bloquedeck")
            carto.style.left = (l-1)*5+("%")
            carto.style.border = "none" 
            dek.appendChild(carto)
        
        }
    
    }
    
},1000)


function erase_childs(node){
	if(node.childNodes){
		var childs=node.childNodes;
		for(var i=0;i<childs.length;i++){
			node.removeChild(childs[i]);
		}
	}
 
}





function setTargetOP(e){
    let cart = e//.target.parentElement
    let blank = cart.cloneNode(true)
    blank.style.opacity = "0"
    blank.setAttribute("id","blank")
    isattacking = cart
    console.log(cart)
    for (var arr=[], i=document.getElementById("fightlistOP").children.length; i;) arr[--i] = document.getElementById("fightlistOP").children[i];
    let pos = arr.indexOf(cart)
    if(pos == 0){
        document.getElementById("fightlistOP").prepend(blank)
    }
    else{
        document.getElementById("fightlistOP").children[pos-1].after(blank)
    }
    console.log(pos)
    cart.style.position ="absolute"
    cart.style.right = (pos%2)*22+"%"
    cart.style.top = parseInt(pos/2)*30 +"%"
    cart.style.zIndex = "2"
    
    anime({
        targets:cart,
        width : "30%",
        //zIndex: "2",
        fontSize : "100%",
        float: "none",
        top:"50%",
        right: "50%",
        translateX: "50%",
        translateY:"-50%",
        scale:"1",
        delay:100
    })
    
    for(var card = 0; card <= 6;card++){
        if(document.getElementById("fightlistOP").children[card] != cart && document.getElementById("fightlistOP").children[card].getAttribute("id") != "blank"){
            document.getElementById("fightlistOP").children[card].removeEventListener("click",setTarget)
            anime({
                targets:document.getElementById("fightlistOP").children[card],
                opacity:0.3
            })
        }
    }

    setTimeout(function(){
        let targ = document.getElementById("fightlist").children[Math.floor(Math.random() * 6)]
        while(targ.children[4].innerHTML == "0"){
            targ = document.getElementById("fightlist").children[Math.floor(Math.random() * 6)]
        }
        betargetOP(targ)
    },750)
}


function betargetOP(e){

    
    for(var card = 0; card < 6;card++){
        let targ = document.getElementById("fightlist").children[card]
        targ.removeEventListener("click",betargetOP)
    }

    


    let targ = e
    for (var arr=[], i=document.getElementById("fightlist").children.length; i;) arr[--i] = document.getElementById("fightlist").children[i];
    let pos = arr.indexOf(targ)
    console.log(pos)

    for (var arr2=[], i=document.getElementById("fightlistOP").children.length; i;) arr2[--i] = document.getElementById("fightlistOP").children[i];
    let posin = arr2.indexOf(isattacking) - 1

    anime({
        targets:isattacking,
        translateX:["50%",-(260+ ((pos+1)%2)*60)+"%"],
        translateY:["-50%", (  -50 + (   ( parseInt(pos/2) - 1 )   *   70   ) +"%")],
        direction: 'alternate',
        loop:2,
        duration:700,
        easing:'easeInOutExpo'
    })

    setTimeout(function(){
        let tmp = parseInt(e.children[4].innerHTML)
        console.log(isattacking.children[3])
        console.log(tmp)
        let col = e.style.color
        if(col == "") col = 'rgb(0,0,0)'
        else col = 'rgb(255,255,255)'
        console.log(col)
        let tmp2 = tmp-parseInt(isattacking.children[3].innerHTML)
        if(tmp2 < 0){
            tmp2 = 0
            anime({
                targets:e,
                opacity:0.3,
                duration:300
            })
            console.log(orderfight.findIndex((a) => a == parseInt(e.getAttribute("data"))))
            orderfight[orderfight.findIndex((a) => a == parseInt(e.getAttribute("data")))] = -1
            let deadaf = document.createElement("img")
            deadaf.classList.add("dead")
            deadaf.setAttribute("src","dead.png")
            setTimeout(function(){
                console.log(e)
                e.appendChild(deadaf)
                anime({
                    targets:deadaf,
                    easing: 'easeInOutSine',
                    opacity:1,
                    duration:300
                })
            },300)
        } 
        anime({
            targets:e.children[4],
            innerHTML:[tmp,tmp2],
            easing: 'linear',
            round: 1
        }) 

        anime({
            targets:e.children[4],
            color:[col,'rgb(255, 0, 0)'],
            direction:'alternate',
            loop:2,
        })
    },700)
    
    setTimeout(function(){
        console.log(isattacking)
        console.log(isattacking.style.top)
        isattacking.style.position = "relative"
        isattacking.style.right = "0%"
        isattacking.style.top = "0%"


        document.getElementById("fightlistOP").removeChild(document.getElementById("blank"))
        fintour = true

        
    },2450)

    setTimeout(function(){

        let rit = 27
        if(posin == 3) rit = 20

        anime({
            targets:isattacking,
            width : "26%",
            zIndex: "0",
            fontSize : "100%",
            float: "right",
            top:parseInt(posin/2)*30 +"%",
            right: (posin%2)*rit+"%",
            translateX:["50%","0%"],
            translateY:['-50%',"0%"],
            scale:"0.7",
            easing:"easeInOutExpo"
        })

       

        for(var card = 0; card <= 6;card++){
            if(document.getElementById("fightlistOP").children[card] != isattacking && document.getElementById("fightlistOP").children[card] !=  document.getElementById("blank") && document.getElementById("fightlistOP").children[card].childElementCount < 9){
                
                anime({
                    targets:document.getElementById("fightlistOP").children[card],
                    opacity:1
                })
            }
        }
    },1400)
 
    


}




function setTarget(e){
    let cart = e//.target.parentElement
    let blank = cart.cloneNode(true)
    blank.style.opacity = "0"
    blank.setAttribute("id","blank")
    isattacking = cart
    console.log(cart)
    for (var arr=[], i=document.getElementById("fightlist").children.length; i;) arr[--i] = document.getElementById("fightlist").children[i];
    let pos = arr.indexOf(cart)
    if(pos == 0){
        document.getElementById("fightlist").prepend(blank)
    }
    else{
        document.getElementById("fightlist").children[pos-1].after(blank)
    }
    cart.style.position ="absolute"
    cart.style.left = (pos%2)*22+"%"
    cart.style.top = parseInt(pos/2)*30 +"%"
    cart.style.zIndex = "2"

    anime({
        targets:cart,
        width : "30%",
        //zIndex: "2",
        fontSize : "100%",
        float: "none",
        top:"50%",
        left: "50%",
        translateX: "-50%",
        translateY:"-50%",
        scale:"1",
        delay:100
    })
    
    for(var card = 0; card <= 6;card++){
        if(document.getElementById("fightlist").children[card] != cart && document.getElementById("fightlist").children[card].getAttribute("id") != "blank"){
            document.getElementById("fightlist").children[card].removeEventListener("click",setTarget)
            anime({
                targets:document.getElementById("fightlist").children[card],
                opacity:0.3
            })
        }
    }

    for(var card = 0; card < 6;card++){
        let targ = document.getElementById("fightlistOP").children[card]
        if(targ.children[4].innerHTML != "0")  targ.addEventListener("click",betarget)
    }
}


function betarget(e){

    for(var card = 0; card < 6;card++){
        let targ = document.getElementById("fightlistOP").children[card]
        targ.removeEventListener("click",betarget)
    }

    
    let targ = e.target.parentElement
    for (var arr=[], i=document.getElementById("fightlistOP").children.length; i;) arr[--i] = document.getElementById("fightlistOP").children[i];
    let pos = arr.indexOf(targ)
    console.log(pos)

    for (var arr2=[], i=document.getElementById("fightlist").children.length; i;) arr2[--i] = document.getElementById("fightlist").children[i];
    let posin = arr2.indexOf(isattacking) - 1

    anime({
        targets:isattacking,
        translateX:["-50%",(260+ ((pos+1)%2)*60)+"%"],
        translateY:["-50%", (  -50 + (   ( parseInt(pos/2) - 1 )   *   70   ) +"%")],
        direction: 'alternate',
        loop:2,
        duration:700,
        easing:'easeInOutExpo'
    })


    setTimeout(function(){
        let tmp = parseInt(targ.children[4].innerHTML)
        let tmp2 = tmp-parseInt(isattacking.children[3].innerHTML)
        if(tmp2 < 0) {
            tmp2 = 0
            anime({
                targets:targ,
                opacity:0.3,
                duration:300
            })
            console.log(parseInt(targ.getAttribute("data")))
            console.log(orderfight)
            orderfight[orderfight.findIndex((a) => a == parseInt(targ.getAttribute("data")))] = -1
            console.log(orderfight)
            let deadaf = document.createElement("img")
            deadaf.classList.add("dead")
            deadaf.setAttribute("src","dead.png")
            setTimeout(function(){

                targ.appendChild(deadaf)
                anime({
                    targets:deadaf,
                    easing: 'easeInOutSine',
                    opacity:1,
                    duration:300
                })
            },300)
            
        }
        console.log(isattacking.children[3])
        console.log(tmp)
        let col = targ.style.color
        if(col == "") col = 'rgb(0,0,0)'
        else col = 'rgb(255,255,255)'
        console.log(col)
        anime({
            targets:targ.children[4],
            innerHTML:[tmp,tmp2],
            easing: 'linear',
            round: 1
        }) 

        anime({
            targets:targ.children[4],
            color:[col,'rgb(255, 0, 0)'],
            direction:'alternate',
            loop:2,
        })
    },700)


    setTimeout(function(){
        console.log(isattacking)
        console.log(isattacking.style.top)
        isattacking.style.position = "relative"
        isattacking.style.left = "0%"
        isattacking.style.top = "0%"


        document.getElementById("fightlist").removeChild(document.getElementById("blank"))
        fintour = true

        
    },2450)

    setTimeout(function(){

      
        let rit = 29
        if(posin == 3) rit = 22
        

        anime({
            targets:isattacking,
            width : "26%",
            zIndex: "0",
            fontSize : "100%",
            float: "left",
            top:parseInt(posin/2)*30 +"%",
            left: (posin%2)*rit+"%",
            translateX:["-50%","0%"],
            translateY:['-50%',"0%"],
            scale:"0.7",
            easing:"easeInOutExpo"
        })

       

        for(var card = 0; card <= 6;card++){
            if(document.getElementById("fightlist").children[card] != isattacking && document.getElementById("fightlist").children[card] !=  document.getElementById("blank") && document.getElementById("fightlist").children[card].childElementCount < 9){
                document.getElementById("fightlist").children[card].addEventListener("click",setTarget)
                anime({
                    targets:document.getElementById("fightlist").children[card],
                    opacity:1
                })
            }
        }
    },1400)
 


}


function game(){
    document.body.style.overflow = "hidden"
    let cartees = []
    for(var i=0; i<clicked.length;i++){
        if(clicked[i]){
            cartees.push(i)
        }
    }

    let tmp = 10

    document.body.removeChild(document.getElementById("list"))
    document.body.removeChild(document.getElementById("decks"))
    
    var threerandom = []
    console.log(Math.floor(Math.random() * 16))
    for(var b=0; b<3; b++){
        let isin = true
        let ultmp = Math.floor(Math.random() * 14)
        console.log(ultmp)
        let tmp = cartees[ultmp]
        console.log(tmp)
        if(threerandom.includes(tmp)) isin = true
        else isin = false
        while(isin == true){
            tmp = cartees[Math.floor(Math.random() * 14)]
            if(threerandom.includes(tmp)) isin = true
            else isin = false
        }
        threerandom[b] = tmp
    }
    
    console.log(threerandom)

    
    
    let horizontal = document.createElement("div")
    horizontal.setAttribute("id","listee")

    for(var o=0; o<threerandom.length;o++){
        finalfighters.push(threerandom[o])
        let carte = make_card(charaT,threerandom[o])
        carte.classList.remove("bloque")
        carte.classList.add("bloquel")
        horizontal.appendChild(carte)
        anime({
            targets: carte,
            translateY: 250,
            //direction: 'reverse',
            //easing: 'easeInOutSine',
            delay : o*700,
            duration:1200
        });
    }
    document.body.append(horizontal)

    let xx = -(horizontal.clientWidth)/2
    let yy = -(horizontal.clientHeight)/2
    console.log(xx)
    console.log(yy)
    anime({
        targets:horizontal,
        borderColor: ['rgb(0, 0, 0)','rgb(255, 255, 255)'],
        translateY:[yy,yy+180],
        translateX:[xx,xx+320],
        duration:600,
        easing:'easeInOutQuad',
        delay:3*800
    })

    let newpick = document.createElement("div")
    newpick.setAttribute("id","newpick")
    let compt=0;
    for(var g=0;g< charaT.length;g++){
        if(cards.includes(charaT[g].id.toString()) && !(threerandom.includes(g))    ){
            console.log("ok")
            let blocc = make_card(charaT,g,false)
            clicked2[g] = false
            blocc.addEventListener("click",function(){
                let newindx = parseInt(blocc.getAttribute("data"))
                if(clicked2[newindx] == false && countclicked2 < 3){
                    countclicked2+=1

                    if(countclicked2 == 3){
                        document.getElementById("startgame").removeAttribute("disabled")
                    }
                    else{
                        document.getElementById("startgame").setAttribute("disabled","")
                    }
                    document.getElementById("listee").style.overflow = "visible"
                    let p = ([].slice.call(document.getElementById("newpick").children)).indexOf(blocc)
                    console.log(p)
                    
                    anime({
                        targets:blocc,
                        width:"27%",
                        easing: 'easeInOutSine',
                        direction: 'alternate',
                        duration:250
                    })
                    anime({
                        targets:blocc,
                        easing: 'easeInOutSine',
                        opacity:0,
                        duration:250,
                        delay:250
                    })
                    
                    
                    let tmp = make_card(charaT,newindx,false)
                    tmp.classList.remove("bloque")
                    tmp.classList.add("bloquel")
                    tmp.style.transform = "translateY(-320px)"
                    tmp.addEventListener("click",function(){
                        let dat = tmp.getAttribute("data")
                        anime({
                            targets:tmp,
                            width:["25%","40%"],
                            easing: 'easeInOutSine',
                            duration:250,
                            opacity:0
                        })
                        setTimeout(function(){
                            document.getElementById("listee").removeChild(tmp)
                        },250)


                        let newtarget = ".bloque2[data='"+dat+"']"
                        console.log(document.querySelector(newtarget))
                        anime({
                            targets:newtarget,
                            width:["27%","32%"],
                            easing: 'easeInOutSine',
                            duration:250,
                            opacity:1
                        })
                        clicked2[parseInt(dat)] = false
                        countclicked2-=1
                        if(countclicked2 == 3){
                            document.getElementById("startgame").removeAttribute("disabled")
                        }
                        else{
                            document.getElementById("startgame").setAttribute("disabled","")
                        }


                    })
                    horizontal.appendChild(tmp)
                    anime({
                        targets:tmp,
                        width:["40%","25%"],
                        easing: 'easeInOutSine',
                        duration:250
                    })
                    
                    clicked2[newindx] = true
                
                }
                
                
            })
            if(compt%3 == 0){
                blocc.style.clear ="left"
            }
            blocc.classList.remove("bloque")
            blocc.classList.add("bloque2")
            newpick.appendChild(blocc)
            compt++
        }
    }


    document.body.appendChild(newpick)

    anime({
        targets:newpick,
        translateX:620,
        duration:700,
        delay:3*900,
        easing: 'easeInOutExpo'
    })

    
    

    
}
document.getElementById("facile").addEventListener("click",function(){
    let tmp = document.getElementsByClassName("bloque")
    for(var i=0; i<15;i++){
        tmp[i].click()
    }
})


function startgame(){
    document.body.removeChild(document.getElementById("listee"))
    document.body.removeChild(document.getElementById("newpick"))
    console.log("ok")
    let t = document.createElement("div")
    t.setAttribute("id","fightlist")
    document.body.appendChild(t)
    let t2 = document.createElement("div")
    t2.setAttribute("id","fightlistOP")
    document.body.appendChild(t2)

    for(var i=0; i<clicked2.length;i++){
        if(clicked2[i] == true){
            finalfighters.push(i)
        }
    }

    console.log(finalfighters)
    let ofight = []
    for(var i=0; i<finalfighters.length;i++){
        let cart = make_card(charaT,finalfighters[i],false)
        ofight.push({
            id:finalfighters[i],
            vit: parseInt(cart.children[5].innerHTML)
        })
        if(i == 0 || i == 4){
            if(i==4)cart.style.clear ="left"
            cart.classList.add("bloque4")
            cart.classList.remove("bloque")
        }
        if(i == 1 || i == 3 || i == 5){
            cart.classList.add("bloque3")
            cart.classList.remove("bloque")
        }
        if(i == 2){
            cart.classList.add("bloque5")
            cart.classList.remove("bloque")
        }
        document.getElementById("fightlist").appendChild(cart)
        //cart.addEventListener("click",setTarget)
    }

    anime({
        targets:t,
        translateX:[-500,0],
        duration:700,
        easing: 'easeInOutExpo'
    })

    ofight.sort((a, b) => b.vit - a.vit)
    console.log(ofight)


 
    

    fetch('./game.json',{method:'GET'})
                .then(res => res.json())
                .then(json => {
                    const opponents = json
                    let opolvl = opponents[0]
                    console.log(opolvl)
                    console.log(opolvl[0])
                    let ofight2 = []
                    for(var i=1; i<opolvl.length;i++){
                        let cart = make_card(charaT,charaT.findIndex((a) => a.id == opolvl[i]),false)

                        ofight2.push({
                            id:charaT.findIndex((a) => a.id == opolvl[i]),
                            vit: parseInt(cart.children[5].innerHTML)
                        })

                        if(i == 1 || i == 5){
                            if(i==5)cart.style.clear ="right"
                            cart.classList.add("bloque44")
                            cart.classList.remove("bloque")
                        }
                        if(i == 2 || i == 4 || i == 6){
                            cart.classList.add("bloque33")
                            cart.classList.remove("bloque")
                        }
                        if(i == 3){
                            cart.classList.add("bloque55")
                            cart.classList.remove("bloque")
                        }
                        document.getElementById("fightlistOP").appendChild(cart)
                    }
                    anime({
                        targets:t2,
                        translateX:[500,0],
                        duration:700,
                        easing: 'easeInOutExpo'
                    })

                    ofight2.sort((a, b) => b.vit - a.vit)
                    
                    let firstfight = -1

                    if(ofight[0].vit > ofight2[0].vit){
                        firstfight = 0
                    }
                    else firstfight = 1

                    if(firstfight==0){
                        for(let b = 0; b < 12;b++){
                            if(b%2==0){
                                orderfight.push(ofight[b/2].id)
                            }
                            else{
                                orderfight.push(ofight2[(b-1)/2].id)
                            }

                
                        }
                    }
                    else{
                        for(let b = 0; b < 12;b++){
                            if(b%2==0){
                                orderfight.push(ofight2[b/2].id)
                            }
                            else{
                                orderfight.push(ofight[(b-1)/2].id)
                            }

                
                        } 
                    }

                    console.log(orderfight)
                    setTimeout(function(){
                        if(firstfight == 0){
                            offset1 = 0
                            offset2 = 1
                            document.getElementById("fightlistOP").style.zIndex = "1"
                            document.getElementById("fightlist").style.zIndex = "2"
                            setTarget(document.querySelector("#fightlist div[data='"+orderfight[offset1%12]+"']"))
                            offset1+=2
                            tour+=1
                            fintour = false
                            var tours = setInterval(function(){
                                let fin = true
                                let carts = document.getElementById("fightlist").children
                                for(var cr = 0; cr< carts.length;cr++){
                                    if(parseInt(carts[cr].children[4].innerHTML) > 0){
                                        fin = false
                                        break
                                    }
                                }
                                if(fin == false){
                                    fin = true 
                                    let cartsOP = document.getElementById("fightlistOP").children
                                    for(var cr = 0; cr< cartsOP.length;cr++){
                                        if(parseInt(cartsOP[cr].children[4].innerHTML) > 0){
                                            fin = false
                                            break
                                        }
                                    }
                                }
                                if(fin == true) clearInterval(tours)
                                if(fintour == true){
                                    
                                    if(tour%2 == 0){
                                        while(orderfight[offset1%12] == -1){
                                            offset1+=2
                                        }
                                        document.getElementById("fightlistOP").style.zIndex = "1"
                                        document.getElementById("fightlist").style.zIndex = "2"
                                        console.log(tour+offset1)
                                        setTarget(document.querySelector("#fightlist div[data='"+orderfight[offset1%12]+"']"))    
                                        offset1+=2                        
                                    }
                                    else{
                                        while(orderfight[offset2%12] == -1){
                                            offset2+=2
                                        }
                                        document.getElementById("fightlistOP").style.zIndex = "2"
                                        document.getElementById("fightlist").style.zIndex = "1"
                                        console.log(tour+offset1)
                                        setTargetOP(document.querySelector("#fightlistOP div[data='"+orderfight[offset1%12]+"']")) 
                                        offset2+=2
                                    }
                                    tour+=1
                                    fintour = false
                                }
                            },100)
                        }
                        else{
                            offset1 = 1
                            offset2 = 0
                            document.getElementById("fightlistOP").style.zIndex = "2"
                            document.getElementById("fightlist").style.zIndex = "1"
                            setTargetOP(document.querySelector("#fightlistOP div[data='"+orderfight[offset2%12]+"']"))
                            tour+=1
                            offset2+=2
                            fintour = false
                            
                            var tours2 = setInterval(function(){
                                let fin = true
                                let carts = document.getElementById("fightlist").children
                                for(var cr = 0; cr< carts.length;cr++){
                                    if(parseInt(carts[cr].children[4].innerHTML) > 0){
                                        fin = false
                                        break
                                    }
                                }
                                if(fin == false){
                                    fin = true 
                                    let cartsOP = document.getElementById("fightlistOP").children
                                    for(var cr = 0; cr< cartsOP.length;cr++){
                                        if(parseInt(cartsOP[cr].children[4].innerHTML) > 0){
                                            fin = false
                                            break
                                        }
                                    }
                                }
                            
                                if(fin == true){
                                    clearInterval(tours2)
                                    console.log("fin")
                                } 

                                if(fintour == true){
                                    
                                    if(tour%2 == 0){
                                        console.log(orderfight)
                                        while(orderfight[offset2%12] == -1){
                                            offset2+=2
                                        }
                                        document.getElementById("fightlistOP").style.zIndex = "2"
                                        document.getElementById("fightlist").style.zIndex = "1"
                                        setTargetOP(document.querySelector("#fightlistOP div[data='"+orderfight[offset2%12]+"']"))
                                        offset2+=2                            
                                    }
                                    else{
                                        console.log(orderfight)
                                        while(orderfight[offset1%12] == -1){
                                            offset1+=2
                                        }
                                        document.getElementById("fightlistOP").style.zIndex = "1"
                                        document.getElementById("fightlist").style.zIndex = "2"
                                        setTarget(document.querySelector("#fightlist div[data='"+orderfight[offset1%12]+"']")) 
                                        offset1+=2
                                    }
                                    tour+=1
                                    fintour = false
                                }
                            },100)
                        }
                    },1000)
                    
                   



                    
    })
}

//console.log(charaT)



document.getElementById("start").addEventListener("click",game)
document.getElementById("startgame").addEventListener("click",startgame)
/*let intev = setInterval(function () {
        if(ccom >= charaT.length) clearInterval(intev) 
        if(cards.includes(ccom.toString())){
            make_card(charaT, ccom)     
        }
        ccom+=1
    }, 50);*/