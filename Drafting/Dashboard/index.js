//Useful links:
//  Object.keys() 
//      - https://stackoverflow.com/questions/26025433/firefox-keys-is-not-a-function
//  Template Literals
//      -https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//  JSON file loading
//      -https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript/19706080
//  Setting onClick being inconsistent
//      -https://stackoverflow.com/questions/15097315/change-onclick-attribute-with-javascript/23412811
function load_images(){
    all_buttons = document.getElementsByClassName("toggle");
    all_keys = Object.keys(data)
    for (i =0; i <80; i++){
        // fish_link = data[all_keys[i]]['icon_url']
        // all_buttons[i].innerHTML = `<img src="${fish_link}" alt="">`
        
        var newButton = document.createElement("button");
        newButton.className = 'toggleON';
        newButton.id = `fish${i+1}`
        newButton.setAttribute('onclick',"toggleButton(this);");
        
        var innerImage = document.createElement("img");
        innerImage.className = "fish";
        innerImage.src = data[all_keys[i]]['icon_url']
        newButton.appendChild(innerImage);
        document.getElementById(`row${i%5}`).appendChild(newButton);

    }
}

//Useful Links
//  self referring onlcick
//      -https://stackoverflow.com/questions/619514/javascript-how-to-make-a-control-send-itself-in-a-method
function toggleButton(givenCreature){
    if (givenCreature.className == 'toggleON'){
        givenCreature.className = 'toggleOFF';
    }
    else{
        givenCreature.className = 'toggleON';
    }
}