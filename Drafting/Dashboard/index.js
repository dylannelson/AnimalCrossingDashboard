var num_toggled = 0;
var all_keys;
var current_toggled = new Set([])
var names_of_fish = ""
var zone = 'northern'
var months_array = [0,0,0,0,0,0,0,0,0,0,0,0]


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
        // adding to months total
        var curr_months = data[fish_name]["months"][zone]
        for (const i in curr_months){
            months_array[curr_months[i]-1] += 1;
        }
    }
    else{
        givenCreature.className = 'toggleON';
        num_toggled -= 1;
        current_toggled.delete(fish_name);
        // removing from months total
        var curr_months = data[fish_name]["months"][zone]
        for (const i in curr_months){
            months_array[curr_months[i]-1] -= 1;
        }
    }

    // DISPLAY PURPOSES --------------------------------------------------------------------------
    // making a string of all fish names
    var curr_names = Array.from(current_toggled)
    names_of_fish = ''
    for (i = 0; i < current_toggled.size; i++){
        names_of_fish += curr_names[i] + ', ';
    }
    names_of_fish = names_of_fish.slice(0, -2).replace(/\_/g, " ");

    document.getElementById('name_toggled').innerHTML = `Names of Missing Fish: ${names_of_fish}`;
    document.getElementById('num_toggled').innerHTML = `Total Missing Fish: ${num_toggled}`;
    document.getElementById('months_toggled').innerHTML = `Fish Per Month: ${months_array}`;

}

// DOESN'T FIX ANY ALEADRY ADDED FISH DATA, START NEW TO FIX
function change_hemisphere(){
    clear_grid();
    if (zone == "northern"){
        document.getElementById('hemisphere').innerHTML = "Hemisphere: Southern";
        zone = 'southern'
        // change class/color
        var gridButtons = document.querySelectorAll(".gridButton");
        for (var i=0; i< gridButtons.length; i++){
            gridButtons[i].className = "gridButton south";
        }
    }
    else{
        document.getElementById('hemisphere').innerHTML = "Hemisphere: Northern";
        zone = 'northern'
        // change class/color
        var gridButtons = document.querySelectorAll(".gridButton");
        for (var i=0; i< gridButtons.length; i++){
            gridButtons[i].className = "gridButton north";
        }
    }
}

function clear_grid(){
    var curr_off = document.getElementsByClassName("toggleOFF");
    var curr_len = curr_off.length;
    for (var i =0; i < curr_len; i++){
        toggleButton(curr_off[0]);
    }
}