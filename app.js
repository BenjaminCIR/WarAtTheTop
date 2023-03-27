import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
var coef = 1
var rotating = false;
var roat = true;
const inertie = -0.001
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
document.getElementById("back").style.display = "none"



function onMouseHover( event ) {

    raycaster.setFromCamera( mouse3, camera );
    var intersects = raycaster.intersectObjects( sphere.children );
    var bol = false
    for(var i = 0; i< intersects.length;i++){
        if(intersects[0].object == mesh){
            bol = true
        }
    }
    
    
    if (bol) {
        mesh.material = new THREE.MeshBasicMaterial({color:0xfff000})
    }
    else{
        mesh.material = new THREE.MeshBasicMaterial({color:0xff0000})
    }
}

function onMouseClick( event ) {

    raycaster.setFromCamera( mouse3, camera );
    var intersects = raycaster.intersectObjects( sphere.children );
    var bol = false
    for(var i = 0; i< intersects.length;i++){
        if(intersects[0].object == mesh){
            bol = true
        }
    }
    
    
    if (bol) {
        let level = document.createElement("div")
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
    var offset = -0.00
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

var rayon  = 0.1
var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(rayon,20,20),
    new THREE.MeshBasicMaterial({color:0xff0000})
)
scene.add(mesh)
sphere.add(mesh)
var pi = 3.14
let x =  rayonsphere* Math.cos(pi/5)
let y = rayonsphere * Math.sin(pi/5)
let z = rayonsphere
mesh.position.set(x,0,-y)

camera.position.z = 9

function animate(){
    raycaster.setFromCamera( mouse3, camera );
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    sphere.rotation.y += naturalrotate
    if(translate){
        if(sphere.position.x <= -5){
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