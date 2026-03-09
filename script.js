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





