import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
var coef = 1
var rotating = false;
var roat = true;
const inertie = -0.000
var naturalrotate = inertie
var rayonsphere =   1.7
const mouse3 = {
    x: undefined,
    y: undefined,
}
var translate = false
var scaleing = false
var Rtranslate = false
var Rscaleing = false
var growing = 0
var raycaster = new THREE.Raycaster();
var lieux = []
var locates = []
var rayon = 0.05
document.getElementById("back").style.display = "none"
var colo = true
var RtranslateLVL = false
var xLVL = 0
var yLVL = 0
var pomX = 0
var pomY = 0

var selected = -1

var lock = false

// TOOL DE PLACEMENT DE LIEUX
/*function SETT(){
    let id = document.getElementById("idlieu").value
    let phi = document.getElementById("phiint").value;
    let theta = document.getElementById("thetaint").value;
    let x =  rayonsphere* Math.cos(phi) * Math.sin(theta)
    let y = rayonsphere * Math.sin(phi) * Math.sin(theta)
    let z = rayonsphere * Math.cos(theta)
    lieux[id].position.set(x,y,z)
}

function GETT(){
    console.log("coucou ")
    let id = document.getElementById("idlieu").value
    fetch('./coord.json')
    .then(response => response.json())
    .then(json => {
        const act = json
        let thetaa = act[id].theta
        let phii = act[id].phi
        document.getElementById("phiint").value = phii
        document.getElementById("thetaint").value = thetaa
    })

}

function phiplus(){
    document.getElementById("phiint").value =  Math.round((parseFloat(document.getElementById("phiint").value ) + 0.01 + Number.EPSILON) * 100) / 100; 
    SETT()

}
function phimoins(){
    document.getElementById("phiint").value = Math.round((parseFloat(document.getElementById("phiint").value ) - 0.01 + Number.EPSILON) * 100) / 100;
    SETT()
    
}
function thetaplus(){

    document.getElementById("thetaint").value =    Math.round((parseFloat(document.getElementById("thetaint").value ) + 0.01 + Number.EPSILON) * 100) / 100;
    SETT()
    
}
function thetamoins(){
    document.getElementById("thetaint").value =     Math.round((parseFloat(document.getElementById("thetaint").value ) - 0.01 + Number.EPSILON) * 100) / 100;
    SETT()
    
}


document.getElementById("sett").addEventListener("click",SETT)
document.getElementById("gett").addEventListener("click",GETT)
document.getElementById("phi+").addEventListener("click",phiplus)
document.getElementById("phi-").addEventListener("click",phimoins)
document.getElementById("theta+").addEventListener("click",thetaplus)
document.getElementById("theta-").addEventListener("click",thetamoins)

*/

fetch('https://api.api-onepiece.com/locates')
    .then(response => response.json())
    .then(json => {
            locates = json
            fetch('./dataloc.json')
                .then(response => response.json())
                .then(json => {
                    for(var i=0;i<json.length;i++){
                        locates.push(json[i])
                    }
                    fetch('./coord.json')
                        .then(response => response.json())
                        .then(json => {
                            const coord = json;
                            for(var i=0; i< locates.length;i++){
                                lieux.push(new THREE.Mesh(
                                    new THREE.SphereGeometry(rayon,20,20),
                                    new THREE.MeshBasicMaterial({color:0xff0000})
                                ))
                                sphere.add(lieux[i])
                                //console.log(i)
                                let x =  rayonsphere* Math.cos(coord[i].phi) * Math.sin(coord[i].theta)
                                let y = rayonsphere * Math.sin(coord[i].phi) * Math.sin(coord[i].theta)
                                let z = rayonsphere * Math.cos(coord[i].theta)
                                lieux[i].position.set(x,y,z)
                            }
                            for(var i=0; i< lieux.length;i++){
                                let name = "lieu" + i
                                let tmp = document.getElementById(name)
                                if(coord[i].phi != null){
                                    
                                    //console.log(tmp)
                                    tmp.innerText = locates[i].french_name



                                    tmp.addEventListener("click", function(){
                                        openpanel(false,tmp)
                                    })

                                


                                    tmp.addEventListener("mouseover", function(){
                                        for(var i=0; i< lieux.length;i++){
                                            try{
                                                document.getElementById("lieu"+i).style.backgroundColor="#f0f0f0"
                                            }
                                            catch{
                                
                                            }
                                        }
                                        for(var i = 0; i< sphere.children.length;i++){
                                            sphere.children[i].material = new THREE.MeshBasicMaterial({color:0xff0000})                                           
                                        }
                                        //console.log(sphere.rotation)
                                        let indx = parseInt(tmp.getAttribute("id").substring(4,tmp.getAttribute("id").length))
                                        selected = indx
                                        document.getElementById("lieu"+selected).style.backgroundColor="red"
                                        //console.log(lieux[indx].position.y)
                                        //console.log(lieux[indx].position.x)
                                        //sphere.rotation.x = 0
                                        //sphere.rotation.y = 0 - (1.86 + 1.58)
                                        
                                        RtranslateLVL = true
                                        if(locates[indx].sea_name == "East Blue" || locates[indx].sea_name == "South Blue" || locates[indx].sea_name == "Paradis" || locates[indx].sea_name == "Mer Blanche" || locates[indx].french_name == "Nakrowa"){
                                            //console.log("ptn")
                                            yLVL = - (1.86 + 1.58) + (lieux[indx].position.x + 1)
                                            xLVL = lieux[indx].position.y
                                            if(sphere.rotation.y < yLVL) pomY = 1
                                            else pomY = -1
                                            if(sphere.rotation.x < xLVL) pomX = 1 
                                            else pomX = -1
                                            //sphere.rotation.y += (lieux[indx].position.x + 1)//(3.14 -theta + 0.5)
                                            //sphere.rotation.x += lieux[indx].position.y//(phi)
                                        }
                                        else{
                                            let offs = 2
                                            if(locates[indx].sea_name == "Nouveau Monde") offs = 2.5
                                            yLVL = - (1.86 + 1.58) -(lieux[indx].position.x + offs)
                                            xLVL = lieux[indx].position.y
                                            if(sphere.rotation.y < yLVL) pomY = 1
                                            else pomY = -1
                                            if(sphere.rotation.x < xLVL) pomX = 1 
                                            else pomX = -1
                                            //sphere.rotation.y += -(lieux[indx].position.x + offs)//(3.14 -theta + 0.5)
                                            //sphere.rotation.x += lieux[indx].position.y//(phi)
                                        }
                                        //console.log(sphere.rotation)
                                        colo = false
                                        lieux[indx].material = new THREE.MeshBasicMaterial({color:0xfff000})
                                        
                                    })

                                    tmp.addEventListener("mouseleave", function(){
                                        let indx = parseInt(tmp.getAttribute("id").substring(4,tmp.getAttribute("id").length))
                                        lieux[indx].material = new THREE.MeshBasicMaterial({color:0xff0000})
                                        colo = true
                                    })
                                }
                                else{
                                    document.getElementById("niveaux").removeChild(tmp)
                                }
                            }
                    })
                })
            
            
            //console.log(lieux)
    })

function onMouseHover( event ) {
    /*if(colo){
        for(var i = 0; i< sphere.children.length;i++){
            sphere.children[i].material = new THREE.MeshBasicMaterial({color:0xff0000})
            
        }
    }
    
    //var bol = false
    if(lock == false){
        raycaster.setFromCamera( mouse3, camera );
        var intersects = raycaster.intersectObjects( sphere.children );
        for(var i = 0; i< intersects.length;i++){
            intersects[i].object.material = new THREE.MeshBasicMaterial({color:0xfff000})
          
        }
    }
    
    
   

    */

    if(colo){
        for(var i = 0; i< sphere.children.length;i++){
            sphere.children[i].material = new THREE.MeshBasicMaterial({color:0xff0000})
            
        }
    }
    
    raycaster.setFromCamera( mouse3, camera );
    var intersects = raycaster.intersectObjects( sphere.children );
    if(lock == false){
        for(var i = 0; i< intersects.length;i++){
            intersects[i].object.material = new THREE.MeshBasicMaterial({color:0xfff000})
        
        }
    }
}

function onMouseClick( event ) {
    if(lock == true){
        lock = false
        colo = true
        try {
            lieux[selected].material = new THREE.MeshBasicMaterial({color:0xff0000})
        }catch{}
    }
    raycaster.setFromCamera( mouse3, camera );
    var intersectsTMP = raycaster.intersectObjects( scene.children );
    var intersects = raycaster.intersectObjects( sphere.children );

    /*for(var i = 0; i< intersects.length;i++){
        if(intersects[i].object == mesh){
            console.log(intersects[i].distance)
            if(intersects[i].distance < intersectsTMP[i].distance){
                bol = true;
            }
            else{
                console.log("nickel gros")
            }
        }
    }*/
    if(intersects.length > 0){
        //console.log(intersects)
        //console.log(intersectsTMP)
        if(intersects[0].distance < intersectsTMP[0].distance){
            
            openpanel(true,lieux.indexOf(intersects[0].object))
        }
        
            
        
    }
    
    

  
}

function openpanel(isobj, indox){
    //let indx = lieux.indexOf(obj)
    //console.log(locates[indx])
    //console.log(indox)
    var indx = -1
    if(isobj == true){
        indx = indox
    }
    else{
        indx = parseInt(indox.getAttribute("id").substring(4,indox.getAttribute("id").length))
    }
    let level = document.createElement("div")
    let name = document.createElement("p")
    name.innerText = locates[indx].french_name
    name.classList.add("levelname")
    level.appendChild(name)
    let back = document.createElement("button")
    back.innerText = "BACK"
    back.addEventListener("click", function(){
        document.body.removeChild(level)
    })
    level.classList.add("levelcard")
    level.appendChild(back)
    document.body.appendChild(level)

}
function onMouseMove( event ) {
    var offset = 0.06
    var offset2 = 0.00
    mouse3.x = ( event.clientX / innerWidth ) * 2 - 1 + offset2;
    mouse3.y = - ( event.clientY / innerHeight ) * 2 + 1 + offset;
}

const scene = new THREE.Scene()
const camera = new THREE.
    PerspectiveCamera(
        40,
        innerWidth / innerHeight,
        0.1,
        1000
    )
const renderer = new THREE.WebGLRenderer({ alpha: true } )
renderer.setSize(innerWidth,innerHeight)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(rayonsphere,50,50),
    new THREE.MeshBasicMaterial({
        map : new THREE.TextureLoader().load('mapV22.png')
}))
sphere.position.x = 3
sphere.rotation.y-= (1.86 + 1.58)
scene.add(sphere)




//scene.add(mesh)


camera.position.z = 9

function animate(){
    raycaster.setFromCamera( mouse3, camera );
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    sphere.rotation.y += naturalrotate
    if(translate){
        if(sphere.position.x <= -3){
            translate = false
        }
        sphere.position.x -= 0.15
    }
    if(scaleing){
        if(growing >= 1.2){
            scaleing = false

        }
        let coefficient = 1 + growing
        sphere.scale.setScalar(coefficient)
        growing+=0.03
    }
    if(Rtranslate){
        if(sphere.position.x >= 3){
            Rtranslate = false
        }
        sphere.position.x += 0.15
    }
    if(Rscaleing){
        if(growing <= 0){
            Rscaleing = false

        }
        let coefficient = 1 + growing
        sphere.scale.setScalar(coefficient)
        growing-=0.03
    }

    if(RtranslateLVL){
        var detente = 0.07
        if(pomX == -1){
            if(sphere.rotation.x <= xLVL){
                pomX = 0
            }
            else sphere.rotation.x -= detente
        }
        else{
            if(pomX == 1){
                if(sphere.rotation.x >= xLVL){
                    //console.log("test")
                    pomX = 0
                }
                else sphere.rotation.x += detente
            }
        }



        if(pomY == -1){
            if(sphere.rotation.y <= yLVL){
                pomY = 0
            }
            else sphere.rotation.y -= detente
        }
        else{
            if(pomY == 1){
                if(sphere.rotation.y >= yLVL){
                    //console.log("ok")
                    pomY = 0
                }
                else sphere.rotation.y += detente
            }
        }
        
        if(pomY == 0 && pomX ==0) RtranslateLVL = false
        
    }
}
animate()

const mouse = {
    x : undefined,
    y : undefined
}
const mouse2 = {
    x : undefined,
    y : undefined
}
function select(){
    //console.log(sphere)
    scaleing = true
    translate = true
    document.getElementById("menu").style.display = "none"
    document.getElementById("back").style.display = "block"
}

function back(){
    Rscaleing = true
    Rtranslate = true
    document.getElementById("menu").style.display = "block"
    document.getElementById("back").style.display = "none"
}

document.getElementById("back").addEventListener("click", back)
document.getElementById("history").addEventListener("click", select)
addEventListener('mousemove',()=>{
    if(rotating){
        mouse2.x = (event.clientX / innerWidth)*2 - 1
        mouse2.y = (event.clientY / innerHeight)*2 - 1
        if(sphere.rotation.x >= 6.5){
            sphere.rotation.x = 0
        }
        if(sphere.rotation.y >= 6.5){
            sphere.rotation.y = 0
        }
        if(sphere.rotation.x > 1.5 && sphere.rotation.x < 4.5 ){
            sphere.rotation.y -= ((mouse2.x)-(mouse.x))*coef
        }
        else{
            sphere.rotation.y += ((mouse2.x)-(mouse.x))*coef
        }
        // if(sphere.rotation.y > 1.5 && sphere.rotation.y < 4.5){ // 1.5 et  4.5  8 et 11.5
        //     sphere.rotation.x -= ((mouse2.y)-(mouse.y))*coef
        // }
        // else{
        //     sphere.rotation.x += ((mouse2.y)-(mouse.y))*coef
        // }   
        sphere.rotation.x += ((mouse2.y)-(mouse.y))*coef
        mouse.x = mouse2.x
        mouse.y = mouse2.y


    }
})
addEventListener('mousedown',()=>{
    naturalrotate = 0
    rotating = true
    mouse.x = (event.clientX / innerWidth)*2 - 1
    mouse.y = (event.clientY / innerHeight)*2 - 1


})
addEventListener('mouseup',()=>{
    rotating = false
    naturalrotate = inertie

})

document.addEventListener('keydown', function(event) {
    if(event.code == 'Enter'){
        try{
            document.getElementById("lieu"+selected).click()
        }catch{}
    }
    if (event.code == 'ArrowDown' || event.code == 'ArrowUp'){
        lock = true
        let heit = document.getElementById("lieu0").clientHeight
        for(var i=0; i< lieux.length;i++){
            try{
                document.getElementById("lieu"+i).style.backgroundColor="#f0f0f0"
            }
            catch{

            }
        }
        
        let previous = selected
        if(event.code == 'ArrowDown'){
            if(selected == lieux.length-1) selected = 0
            else{
                do selected+=1
                while(lieux[selected].position.y == 0 && lieux[selected].position.x == 0)
            }
        }
        else{
            if(selected == 0) selected = lieux.length-1
            else{
                do selected-=1
                while(lieux[selected].position.y == 0 && lieux[selected].position.x == 0)
            }
        }
        
            //console.log(lieux[selected-1])
        if(previous >=0) lieux[previous].material = new THREE.MeshBasicMaterial({color:0xff0000})
            //console.log(document.getElementById("lieu"+(selected-1)))
        

        
        var collection = document.getElementById("niveaux").childNodes
        for (var a=[], i=collection.length; i;){
            a[--i] = collection[i];
        }
        let numerous = a.indexOf(document.getElementById("lieu"+selected))
        let middleheit = heit*10 - (numerous/5)* 18
        document.getElementById("niveaux").scroll(0,-middleheit + heit*numerous)
        document.getElementById("lieu"+selected).style.backgroundColor="red"
        RtranslateLVL = true
        if(locates[selected].sea_name == "East Blue" || locates[selected].sea_name == "South Blue" || locates[selected].sea_name == "Paradis" || locates[selected].sea_name == "Mer Blanche" || locates[selected].french_name == "Nakrowa"){
            console.log("ptn")
            yLVL = - (1.86 + 1.58) + (lieux[selected].position.x + 1)
            xLVL = lieux[selected].position.y
            if(sphere.rotation.y < yLVL) pomY = 1
            else pomY = -1
            if(sphere.rotation.x < xLVL) pomX = 1 
            else pomX = -1
            //sphere.rotation.y += (lieux[indx].position.x + 1)//(3.14 -theta + 0.5)
            //sphere.rotation.x += lieux[indx].position.y//(phi)
        }
        else{
            let offs = 2
            if(locates[selected].sea_name == "Nouveau Monde") offs = 2.5
            yLVL = - (1.86 + 1.58) -(lieux[selected].position.x + offs)
            xLVL = lieux[selected].position.y
            if(sphere.rotation.y < yLVL) pomY = 1
            else pomY = -1
            if(sphere.rotation.x < xLVL) pomX = 1 
            else pomX = -1
            //sphere.rotation.y += -(lieux[indx].position.x + offs)//(3.14 -theta + 0.5)
            //sphere.rotation.x += lieux[indx].position.y//(phi)
        }
        //console.log(sphere.rotation)
        colo = false
        lieux[selected].material = new THREE.MeshBasicMaterial({color:0xfff000})

    }
});
window.addEventListener( 'click', onMouseClick, false );
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'mousemove', onMouseHover, false );



document.getElementById("test").addEventListener("click", test)