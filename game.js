import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.es.js';

var listeALIASES = []
var listeSTAT = []

var clicked = []
var clicked2 = []
var countclicked = 0
var flip = 0

var finalfighters =[]
var countclicked2 = 0

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
var tmp = anime({
    targets: '.bloque',
    borderWidth: [0, 5],
    duration: 800
});





function make_card(charaTT, identifiant,clickable){ // 9 10 11
    let newind = (charaTT[identifiant]).id -1
    let newid = ((charaTT[identifiant]).id).toString().padStart(4,'0')
    let millier = parseInt((charaTT[identifiant].id) / 1000).toString()
    let centaine = parseInt(((charaTT[identifiant].id) - millier*1000)/100).toString().padEnd(3,'0')
    let bloc = document.createElement("div")
    bloc.setAttribute("data",identifiant)
    bloc.classList.add("bloque")
    let naming = document.createElement("p")
    let image2 = document.createElement("img")
    let image = document.createElement("img")
    let attaque = document.createElement("p")
    let HP = document.createElement("p")
    image2.setAttribute("src","fut.png")
    image.setAttribute("src","https://optc-db.github.io//api/images/full/transparent/"+millier+"/"+centaine+"/"+newid+".png")
    image.classList.add("pic")
    image2.classList.add("card")
    naming.classList.add("naming")
    attaque.classList.add("attaque")
    HP.classList.add("HP")
    naming.innerText = (charaTT[identifiant]).name
    attaque.innerText = (listeSTAT[newind])[9] 
    HP.innerText = (listeSTAT[newind])[10]
    bloc.append(image2)
    bloc.appendChild(image)
    bloc.appendChild(naming)
    bloc.append(attaque)
    bloc.append(HP)
    if(clickable){
        bloc.addEventListener("click",function(){
            if(clicked[identifiant] == false){
                countclicked+=1
                anime({
                    targets: bloc,
                    borderWidth: [0, 5],
                    duration: 800,
                    margin:"10px",
                });
                clicked[identifiant] = true
            }
            else{
                countclicked -=1
                anime({
                    margin:"20px",
                    targets: bloc,
                    borderWidth: [5, 0],
                    duration: 200,
                    easing: 'linear'
                })
                tmp.play()
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
                    const stats = "listeSTAT" +  text.substring(13,text.length - 74467)
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
                            job : (data[i]).job
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

let ccom=0
var charaT = getDATA()
setTimeout(function(){
    for(var i=0;i< charaT.length;i++){
        if(cards.includes(i.toString())){
            let bloc = make_card(charaT,i,true)
            document.getElementById("list").appendChild(bloc)
            clicked[i] = false
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

function game(){
    document.body.style.overflow = "hidden"
    let cartees = []
    for(var i=0; i<clicked.length;i++){
        if(clicked[i]){
            cartees.push(i)
        }
    }

    let tmp = 10

    for(var i=0; i<tmp; i++){
        erase_childs(document.getElementById("list"))
    }
    
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
        if(cards.includes(g.toString()) && !(threerandom.includes(g))    ){
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
                    tmp.style.transform = "translateY(-250px)"
                    tmp.addEventListener("click",function(){
                        let dat = tmp.getAttribute("data")
                        anime({
                            targets:tmp,
                            width:["32%","40%"],
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
                        width:["40%","32%"],
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
        duration:1500,
        delay:3*900
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

    for(var i=0; i<finalfighters.length;i++){
        let cart = make_card(charaT,finalfighters[i],false)
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
    }
    fetch('./game.json',{method:'GET'})
                .then(res => res.json())
                .then(json => {
                    const opponents = json
                    let opolvl = opponents[0]
                    console.log(opolvl)
                    console.log(opolvl[0])
                    for(var i=0; i<opolvl.length;i++){
                        let cart = make_card(charaT,opolvl[i],false)
                        if(i == 0 || i == 4){
                            if(i==4)cart.style.clear ="right"
                            cart.classList.add("bloque44")
                            cart.classList.remove("bloque")
                        }
                        if(i == 1 || i == 3 || i == 5){
                            cart.classList.add("bloque33")
                            cart.classList.remove("bloque")
                        }
                        if(i == 2){
                            cart.classList.add("bloque55")
                            cart.classList.remove("bloque")
                        }
                        document.getElementById("fightlistOP").appendChild(cart)
                    }

                    
    })
}
document.getElementById("start").addEventListener("click",game)
document.getElementById("startgame").addEventListener("click",startgame)
/*let intev = setInterval(function () {
        if(ccom >= charaT.length) clearInterval(intev) 
        if(cards.includes(ccom.toString())){
            make_card(charaT, ccom)     
        }
        ccom+=1
    }, 50);*/