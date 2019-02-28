// Select all tags that are likely to have text content
var contents = document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,th,li,b')
// Set vars for the text we're looking for
var awhileText = "it's been awhile"
var goodGrammar = "it's been a while"

// For each tag, go through to look for the text we want

for (var i = 0; i < contents.length; i++) {
  var innards = contents[i]
  var content = contents[i].innerHTML;
  var awhileIndex = content.toLowerCase().indexOf(awhileText)
  var goodIndex = content.toLowerCase().indexOf(goodGrammar)

  // If the text it there, add a class to it
  // and add an event handler for the audio clip
  if (awhileIndex > -1) {

    innards.innerHTML = content.substring(0, awhileIndex) + "<span class='theMagicWords'>" + content.substring(awhileIndex, awhileIndex + 16) + "</span>" + content.substring((awhileIndex + 16), content.length)
  } 

  if (goodIndex > -1) {

    innards.innerHTML = content.substring(0, goodIndex) + "<span class='theMagicWords'>" + content.substring(goodIndex, goodIndex + 17) + "</span>" + content.substring((goodIndex + 17), content.length)

  }
}

// THERE'S DEFINITELY SOME STUFF TO DO HERE:
  // Find a way to get the key value as a variable
  // If extStatus isn't already define, set it to true
  // If it's true, mark it up
  // If it's false, mark it down
// IN THE MEANTIME, SAVE THIS COMMENTED CODE 
// BECAUSE IT AT LEAST WORKS

/*
chrome.storage.local.set({"extStatus": true}, function(){
  // Saved the status
})

chrome.storage.local.get(["extStatus"], function(items){
  // Report back the status
  console.log(items.extStatus)
})
*/

chrome.storage.local.get(["extStatus"], function(items){
  // Report back the status
  if (items.extStatus == true) {
    markItUp()
  } else if (items.extStatus == false) {
    markItDown()
  } else if (items.extStatus == undefined) {
    chrome.storage.local.set({"extStatus": true}, function(){
      // Saved the status
    })
    markItUp()
  }
})


function markItUp() {
  // Find each of the phrases and add a click event handler
  // And add styles for text
  var instances = document.querySelectorAll('.theMagicWords')

  for (var j = 0; j < instances.length; j++) {
    instances[j].addEventListener('click', playAwhile)
    instances[j].style.backgroundColor = "yellow"
    instances[j].style.color = "black"
    instances[j].innerHTML = "It's Been Awhile"
  }
}

function markItDown() {
  // Find each of the phrases and add a click event handler
  // And add styles for text
  var instances = document.querySelectorAll('.theMagicWords')

  for (var j = 0; j < instances.length; j++) {
    instances[j].removeEventListener('click', playAwhile)
    instances[j].removeAttribute('style')
  }
}

// Play the audio clip
function playAwhile() {
  var song = document.createElement('audio')
  song.src = chrome.extension.getURL("awhile.mp3")
  song.play()
}

//TODO: Find a way to select/change multiple instances within the same tag

//TO(maybe)DO: Add an animated head to sing the song when clicked
