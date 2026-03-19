
let state = "title"
let menuIndex = 0
let playerName = ""

const screen = document.getElementById("screen")
const dialogBox = document.getElementById("dialogBox")
const text = document.getElementById("text")

const menu = ["ニューゲーム","コンテニュー"]

let story = []
let storyIndex = 0


let textSpeed = 40
let currentText = ""
let textIndex = 0
let typing = false


function drawTitle(){

screen.innerHTML=""

const title = document.createElement("div")
title.className="title"
title.textContent="脱出ゲーム"
screen.appendChild(title)

menu.forEach((m,i)=>{
const div=document.createElement("div")
div.className="menu"

if(i===menuIndex){
div.classList.add("selected")
div.textContent="▶ "+m
}else{
div.textContent=m
}

screen.appendChild(div)
})

}


function nameInput(){

screen.innerHTML=""

const t=document.createElement("div")
t.textContent="名前を入力してください"
t.style.fontSize="24px"

const input=document.createElement("input")

input.addEventListener("keydown",(e)=>{
if(e.key==="Enter"){
playerName=input.value
startStory()
}
})

screen.appendChild(t)
screen.appendChild(input)
input.focus()

}


function startStory(){

state="story"
screen.innerHTML=""

story=[
"町外れにある館",
"そこには化物がでるという噂があった"
]

storyIndex=0
dialogBox.style.display="block"

showText()

}


function startLobby(){

state="lobby"

document.getElementById("lobby").style.display="block"

story=[
"卓志: ここが噂の館か…",
"美希: 気味が悪いわ",
"たかし: 帰ろうよ",
`${playerName}: 化物なんているわけ無いでしょう`
]

storyIndex=0
showText()

}


function showText(){

currentText = story[storyIndex]
text.textContent = ""
textIndex = 0
typing = true

typeText()

}

function typeText(){

if(textIndex < currentText.length){

text.textContent += currentText[textIndex]
textIndex++

setTimeout(typeText,textSpeed)

}else{
typing = false
}

}


document.addEventListener("keydown",(e)=>{

if(state==="title"){

if(e.key==="ArrowUp"){
menuIndex--
if(menuIndex<0) menuIndex=menu.length-1
drawTitle()
}

if(e.key==="ArrowDown"){
menuIndex++
if(menuIndex>=menu.length) menuIndex=0
drawTitle()
}

if(e.key==="Enter"){

if(menuIndex===0){
state="name"
nameInput()
}

if(menuIndex===1){
alert("セーブデータがありません")
}

}

}

else if(state==="story" || state==="lobby"){

if(e.key==="Enter"){

if(typing){
text.textContent=currentText
typing=false
return
}

storyIndex++

if(storyIndex < story.length){
showText()
}else{

if(state==="story"){
startLobby()
}else{
text.textContent="（ここからゲーム本編）"
}

}

}

}

})

drawTitle()
