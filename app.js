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
document.getElementById("back").style.display = "none"



function SETT(){
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

fetch('https://api.api-onepiece.com/locates')
    .then(response => response.json())
    .then(json => {
            locates = json
            console.log(locates)
            var rayon  = 0.05
            var pi = 3.14
            var phi = pi/5
            var theta = pi/2
            let x =  rayonsphere* Math.cos(phi) * Math.sin(theta)
            let y = rayonsphere * Math.sin(phi) * Math.sin(theta)
            let z = rayonsphere
            fetch('./coord.json')
                .then(response => response.json())
                .then(json => {
                    const coord = json;
                    for(var i=0; i<locates.length;i++){
                        lieux.push(new THREE.Mesh(
                            new THREE.SphereGeometry(rayon,20,20),
                            new THREE.MeshBasicMaterial({color:0xff0000})
                        ))
                        sphere.add(lieux[i])
                        if(i==1){
                            console.log(coord)
                        }
                        x =  rayonsphere* Math.cos(coord[i].phi) * Math.sin(coord[i].theta)
                        y = rayonsphere * Math.sin(coord[i].phi) * Math.sin(coord[i].theta)
                        z = rayonsphere * Math.cos(coord[i].theta)
                        lieux[i].position.set(x,y,z)
                    }
            })
            
            //console.log(lieux)
    })

function onMouseHover( event ) {
    for(var i = 0; i< sphere.children.length;i++){
        sphere.children[i].material = new THREE.MeshBasicMaterial({color:0xff0000})
        /*if(intersects[0].object == mesh){
            bol = true
        }*/
    }
    raycaster.setFromCamera( mouse3, camera );
    var intersects = raycaster.intersectObjects( sphere.children );
    //var bol = false
    for(var i = 0; i< intersects.length;i++){
        //console.log(intersects[i].object.material)
        intersects[i].object.material = new THREE.MeshBasicMaterial({color:0xfff000})
        /*if(intersects[0].object == mesh){
            bol = true
        }*/
    }
    
    
    /*if (bol) {
        mesh.material = new THREE.MeshBasicMaterial({color:0xfff000})
    }
    else{
        mesh.material = new THREE.MeshBasicMaterial({color:0xff0000})
    }*/
}

function onMouseClick( event ) {

    raycaster.setFromCamera( mouse3, camera );
    //var intersectsTMP = raycaster.intersectObjects( scene.children );
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
        let indx = lieux.indexOf(intersects[0].object)
        console.log(locates[indx])
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
scene.add(sphere)




//scene.add(mesh)


camera.position.z = 9

function animate(){
    raycaster.setFromCamera( mouse3, camera );
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    sphere.rotation.y += naturalrotate
    if(translate){
        if(sphere.position.x <= 0/*5*/){
            translate = false
        }
        sphere.position.x -= 0.15
    }
    if(scaleing){
        if(growing >= 1.3){
            scaleing = false

        }
        let coefficient = 1 + growing
        sphere.scale.setScalar(coefficient)
        growing+=0.025
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
        growing-=0.025
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
    console.log(sphere)
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


window.addEventListener( 'click', onMouseClick, false );
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'mousemove', onMouseHover, false );



document.getElementById("sett").addEventListener("click",SETT)
document.getElementById("gett").addEventListener("click",GETT)
document.getElementById("phi+").addEventListener("click",phiplus)
document.getElementById("phi-").addEventListener("click",phimoins)
document.getElementById("theta+").addEventListener("click",thetaplus)
document.getElementById("theta-").addEventListener("click",thetamoins)