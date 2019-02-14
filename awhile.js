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
  
  // If the text it there, highlight it yellow
  // and add an event handler for the audio clip
  if (awhileIndex > -1) {
    
    innards.innerHTML = content.substring(0, awhileIndex) + "<a style='background-color: yellow; color: black;' onclick='playAwhile()'>It's Been Awhile</a>" + content.substring((awhileIndex + 16), content.length)
        
  } else if (goodIndex > -1) {
    
    innards.innerHTML = content.substring(0, goodIndex) + "<a style='background-color: yellow; color: black;' onclick='playAwhile()'>It's Been Awhile</a>" + content.substring((goodIndex + 17), content.length)
        
  }
}

// Play the audio clip
function playAwhile() {
  var song = document.createElement('audio')
  song.src = chrome.extension.getURL("awhile.mp3")
  song.play()
}
