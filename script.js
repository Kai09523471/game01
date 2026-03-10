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


function startLobby(){

state = "lobby"

document.getElementById("lobby").style.display = "block"

story = [
"卓志: ここが噂の絶叫スポットか...",
"ミキ: なんだか寒いわ",
"たかし: お...おいもう帰ろう"
playerName + ": 化物なんているわけないでしょう実際",

]

storyIndex = 0
showText()

}


