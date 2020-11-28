//Useful links:
//  Object.keys() 
//      - https://stackoverflow.com/questions/26025433/firefox-keys-is-not-a-function
//  Template Literals
//      -https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//  JSON file loading
//      -https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript/19706080
function load_images(){
    all_buttons = document.getElementsByClassName("toggle");
    all_keys = Object.keys(data)
    for (i =0; i <80; i++){
        fish_link = data[all_keys[i]]['icon_url']
        all_buttons[i].innerHTML = `<img src="${fish_link}" alt="">`
    }
}