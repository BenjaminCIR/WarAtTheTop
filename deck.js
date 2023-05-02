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


function make_card(charaTT, identifiant){ // 9 10 11
    let newind = (charaTT[identifiant]).id -1
    let newid = ((charaTT[identifiant]).id).toString().padStart(4,'0')
    let millier = parseInt((charaTT[identifiant].id) / 1000).toString()
    let centaine = parseInt(((charaTT[identifiant].id) - millier*1000)/100).toString().padEnd(3,'0')
    let bloc = document.createElement("div")
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
    attaque.innerText = charaTT[identifiant].id //(listeSTAT[newind])[9] 
    HP.innerText = ""//(listeSTAT[newind])[10]
    bloc.append(image2)
    bloc.appendChild(image)
    bloc.appendChild(naming)
    bloc.append(attaque)
    bloc.append(HP)
    document.getElementById("list").appendChild(bloc)
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
                    console.log(text)
                    let position = text.search("const calcGhostStartIDStart")
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
        //if(cards.includes(i.toString())){
            make_card(charaT,i)
        //}
    }
    
},1000)



/*let intev = setInterval(function () {
        if(ccom >= charaT.length) clearInterval(intev) 
        if(cards.includes(ccom.toString())){
            make_card(charaT, ccom)     
        }
        ccom+=1
    }, 50);*/