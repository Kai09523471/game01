let textSpeed = 40
let currentText = ""
let textIndex = 0
let typing = false

function showText(){

currentText = story[storyIndex]
textIndex = 0
text.textContent = ""
typing = true

typeText()

}

function typeText(){

if(textIndex < currentText.length){

text.textContent += currentText[textIndex]
textIndex++

setTimeout(typeText, textSpeed)

}else{

typing = false

}

}


if(state==="story"){

if(e.key==="Enter"){

if(typing){
text.textContent = currentText
typing = false
return
}

storyIndex++

if(storyIndex < story.length){
showText()
}

}





function startShootingGame(){

state = "shooting"

screen.innerHTML = "<canvas id='game' width='600' height='400'></canvas>"

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let playerX = 280
let bullets = []
let enemies = []

document.addEventListener("keydown",(e)=>{

if(e.key==="ArrowLeft"){
playerX -= 20
}

if(e.key==="ArrowRight"){
playerX += 20
}

if(e.key===" "){
bullets.push({x:playerX+10,y:350})
}

})

function spawnEnemy(){

enemies.push({
x:Math.random()*560,
y:0
})

}

setInterval(spawnEnemy,1000)

function update(){

ctx.fillStyle="black"
ctx.fillRect(0,0,600,400)



ctx.fillStyle="white"
ctx.fillRect(playerX,360,20,20)



bullets.forEach(b=>{
b.y -= 5
ctx.fillRect(b.x,b.y,5,10)
})



ctx.fillStyle="red"

enemies.forEach(e=>{
e.y += 2
ctx.fillRect(e.x,e.y,20,20)
})

requestAnimationFrame(update)

}

update()

}
