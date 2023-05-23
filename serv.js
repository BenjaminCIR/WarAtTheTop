const fs = require('fs');

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

function getDATA(){
    var chara = []

    fetch('https://optc-db.github.io/common/data/aliases.js',{method:'GET'})
                .then(res => res.text())
                .then(text => {
                    let position = text.search("const calcGhostStartIDStart")
                    const tableau = "listeALIASES" +  text.substring(30,position)
                    eval(tableau)
                    //console.log(listeALIASES)
                    fetch('https://optc-db.github.io/common/data/units.js',{method:'GET'})
                        .then(res1 => res1.text())
                        .then(text1 => {
                            let position = text1.search("var calcGhostStartID")
                            const stats = "listeSTAT" +  text1.substring(13,position)
                            eval(stats)    
                            
                            fetch("https://api.api-onepiece.com/characters",{method:'GET'})
                                .then(res2 => res2.text())
                                .then(text2 => {
                                    const dota = "data = "+ text2;
                                    eval(dota)
                                    //console.log(data[0])
                                    
                                    for(var i = 0; i< data.length; i++){
                                        //console.log(data[i])
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
                                                        job : (data[i]).job,
                                                        crew_id : (data[i]).crew_id
                                                    })
                                                    break;
                                                }
                                            
                                                
                                            }
                                        }

                                    }
                                    const additionals = (require('./data.json'))
                                    //console.log(additionals)
                                    for(var j=0; j< additionals.length;j++){
                                        let name2 = (additionals[j]).name
                                        let ppm = 82
                                        if(additionals[j].job == "Pirate"){
                                            ppm = -1000
                                        }
                                        if(additionals[j].job == "Civil"){
                                            ppm = 87
                                        }
                                        if(additionals[j].job == "Famille Royal" || additionals[j].job == "Gouvernement Mondial"){
                                            ppm = 82
                                        }
                                        if(additionals[j].job == "Révolutionnaire"){
                                            ppm = 130
                                        }
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
                                                    job : (additionals[j]).job,
                                                    crew_id :ppm
                                                })
                                                break;
                                            }
                                        
                                        }
                                    }

                                })
                            
                            
                        
                            
                        
                      
                    })
                            
            })
    
    console.log(chara)
    return (chara)

    
}


charaT = getDATA()

setTimeout(function(){
    fs.writeFileSync("chara.json", JSON.stringify(charaT));
    console.log("finish")
},10000)