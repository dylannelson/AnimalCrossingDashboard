var num_toggled = 0;
var all_keys;
var current_toggled = new Set([])
var names_of_fish = ""
var zone = 'northern'
var months_array = [0,0,0,0,0,0,0,0,0,0,0,0]
var missingFish = {}
var unique_locations = {"River":0,
                        "Pond":0,
                        "River (Clifftop)":0,
                        "River (Mouth)":0,
                        "Sea":0,
                        "Pier":0}
var availabilityData = [];

// seasonal colors
winter_color = '#4995C2'
spring_color = '#74AF6E'
summer_color = '#DD7A7A'
fall_color = '#A58257'


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
        var curr_months = data[fish_name]["months"][zone];
        for (const i in curr_months){
            months_array[curr_months[i]-1] += 1;
        }
        // updating location dict
        unique_locations[data[fish_name]["location"]] += 1;
        missingFish[fish_name] = fish_id;
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
        // updating location dict
        unique_locations[data[fish_name]["location"]] -= 1;

        delete missingFish[fish_name];
    }
    

    drawMonthsBar();
    drawMonthAvailabilityChart();


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
    document.getElementById('fish_locations').innerHTML = `Fish per Location:  ${Object.values(unique_locations)}`;

}

function drawMonthsBar() {
    // Consider adding which fish to catch during each month (or separate chart)
    // Coloring for seasons https://stackoverflow.com/questions/7737409/set-different-colors-for-each-column-in-highcharts
    Highcharts.chart('months-bar-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Best Months to Catch Fish'
        },
        xAxis: {
            categories: ['Jan','Feb','Mar','Apr','May',
                'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            crosshair: true
        },
        yAxis: {
            title: {
                text: '# Uncaught Fish'
            }
        },
        plotOptions: {
            column: {
                colorByPoint: true
            },
            series: {
                pointPadding: 0
            }
        },
        colors: [winter_color,winter_color,spring_color,
            spring_color,spring_color,summer_color,
            summer_color,summer_color,fall_color,
            fall_color,fall_color,winter_color,
        ],
        series: [{
            name: 'Fish not Caught',
            data: months_array
        }]
    });
}

function drawMonthAvailabilityChart() {
    // TODO: resize chart for consistent cell size, order fish in certain way (currently by order added in picker), show icons
    let availabilityData = [];
    let numMissing = Object.keys(missingFish).length;
    for (let i = 0; i < numMissing; i++) {
        for (let j = 0; j < 12; j++) {
            availabilityData.push([j, i, 0])
        }
    }

    for (let i = 0; i < numMissing; i++) {
        // get data from json, draw bars
        let fishName = Object.keys(missingFish)[i];
        for (let month of data[fishName]['months'][zone]) {
            availabilityData[12 * i + month - 1] = [month - 1, i, i+1]
        }
    }
    monthAvailabilityChart = Highcharts.chart('month-availability-chart', {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 80,
            plotBorderWidth: 1
        },
        title: {
            text: 'Fish Availability by Month'
        },
        xAxis: {
            categories: ['Jan','Feb','Mar','Apr','May',
            'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        },
        yAxis: {
            categories: Object.keys(missingFish),
            labels: { // see style option
                formatter: function() { 
                    return `<img src=${data[this.value]['icon_url']} alt="" style="vertical-align: middle; width: 32px; height: 32px"/>`
                    + this.value.split('_').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')
                },
                useHTML: true
            }
        },
        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: '#003694'
        },
        series: [{
            data: availabilityData
        }]
    })
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