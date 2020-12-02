var num_toggled = 0;
var all_keys;
var current_toggled = new Set([])
var names_of_fish = ""


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
    all_keys = Object.keys(data)
    for (i =0; i <80; i++){
        // creates the button to place the image into
        var newButton = document.createElement("button");
        newButton.className = 'toggleON';
        newButton.id = `fish${(i+1).toString().padStart(2, '0')}`
        newButton.setAttribute('onclick',"toggleButton(this);");
        
        // places the image in the button
        var innerImage = document.createElement("img"); 
        innerImage.className = "fish";
        innerImage.src = data[all_keys[i]]['icon_url'] // sets the image source to the correct fish
        newButton.appendChild(innerImage);
        
        // places the button in the right row
        document.getElementById(`row${i%5}`).appendChild(newButton);
    }
}
//Useful Links
//  self referring onlcick
//      -https://stackoverflow.com/questions/619514/javascript-how-to-make-a-control-send-itself-in-a-method
function toggleButton(givenCreature){
    fish_id = Number((givenCreature.id).slice(-2));
    fish_name = all_keys[fish_id-1];
    if (givenCreature.className == 'toggleON'){
        givenCreature.className = 'toggleOFF';
        num_toggled += 1;
        current_toggled.add(fish_name);
    }
    else{
        givenCreature.className = 'toggleON';
        num_toggled -= 1;
        current_toggled.delete(fish_name);
    }
    document.getElementById('num_toggled').innerHTML = `Total Missing Fish: ${num_toggled}`;
    
    // making a string of all fish names
    var curr_names = Array.from(current_toggled)
    names_of_fish = ''
    for (i = 0; i < current_toggled.size; i++){
        names_of_fish += curr_names[i] + ', ';
    }
    names_of_fish = names_of_fish.slice(0, -2)

    document.getElementById('name_toggled').innerHTML = `Names of Missing Fish: ${names_of_fish}`;
}