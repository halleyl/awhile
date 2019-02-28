var isEnabled

chrome.storage.local.get(["extStatus"], function(items){
  // Report back the status
  if (items.extStatus == true) {
    isEnabled = true
    
  } else if (items.extStatus == false) {
    isEnabled = false
    document.querySelector('img').setAttribute('src','icon-gray.png')
    document.querySelector('p').innerHTML = "Click to enable"
  }
})

//function setOff() {
//  if (isEnabled == true) {
//    
//    chrome.browserAction.setIcon({ path: {'128': 'icon.png'} })
//    document.querySelector('img').setAttribute('src','icon.png')
//    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null,{"code" : "markItUp()"})
//  } 
//  
//  else if (isEnabled == false) {
//    chrome.browserAction.setIcon({ path: {'128': 'icon-gray.png'} })
//    document.querySelector('img').setAttribute('src','icon-gray.png')
//    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null,{"code" : "markItDown()"})
//  } 
////  else if (isEnabled == undefined) {
////    document.querySelector('img').setAttribute('src','icon-gray.png')
////    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null,{"code" : "markItUp()"})
////  }
//}

document.querySelector('img').addEventListener('click', toggle)

function toggle() {
  // This seems pretty good:
  // https://stackoverflow.com/questions/48524740/adding-a-disable-button-to-chrome-extension
  if (isEnabled) {
       
    chrome.browserAction.setIcon({ path: {'128': 'icon-gray.png'} })
    document.querySelector('img').setAttribute('src','icon-gray.png')
    document.querySelector('p').innerHTML = "Click to enable"
    
    isEnabled = false
     chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null,{"code" : "markItDown()"})
    
    chrome.storage.local.set({"extStatus": false}, function(){
      // Saved the status
    })

    
  } else if (!isEnabled) {

    chrome.browserAction.setIcon({ path: {'128': 'icon.png'} })
    document.querySelector('img').setAttribute('src','icon.png')
    document.querySelector('p').innerHTML = "Click to disable"
    
    isEnabled = true
    chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null,{"code" : "markItUp()"})
    
    chrome.storage.local.set({"extStatus": true}, function(){
      // Saved the status
    })
    
  } else {
    alert('ERROR')
  }
}