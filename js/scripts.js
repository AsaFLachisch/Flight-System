let r = -1;
let s = -1;
let h = -1;
let a = -1;
var schedulePlacesIDs = new Array();
var hotelPlacesIDs = new Array();

function deleteRow() {
    var idName = $(this).attr("id");
    var idNum = idName.substring(1);
    if (idName[0] == 'r') {
        $('#rentalRow' + idNum + '').remove();
    }
    if (idName[0] == 's') {
        $('#scheduleRow' + idNum + '').remove();
    }
    if (idName[0] == 'h') {
        $('#hotelRow' + idNum + '').remove();
    }
    if (idName[0] == 'a') {
        $('#airportRow' + idNum + '').remove();
    }
}

function fillAddress(idName, j, placesIDs, autocomplete) {
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        placesIDs[j] = place.place_id;
        for (var component in componentForm) {
            document.getElementById(idName + '' + j).getElementsByClassName(component)[0].value = '';
            document.getElementById(idName + '' + j).getElementsByClassName(component)[0].disabled = false;
        }

        // Get each component of the address from the place details -------------------- SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE
        // and fill the corresponding field on the form. -------------------- SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(idName + j).getElementsByClassName(addressType)[0].value = val;
            }
        }
    });
}
//***************************Rental Car********************************************
function addRental(r) {
    $('#dynamic_carrental').append('<tr id="rentalRow' + r + '">' +
        '<td> <input type="text" name="rental[]" id="company" placeholder="Company Name" class="form-control name_list"></td>' +
        '<td> <input type="text" name="rental[]" id="carName" placeholder="Car Name" class="form-control name_list"></td>' +
        '<td> <input type="date" name="rental[]" id="startdate" class="form-control name_list"></td>' +
        '<td> <input type="date" name="rental[]" id="enddate" class="form-control name_list"></td>' +
        '<td> <input type="number" name="rental[]" id="price" placeholder="Enter Price" class="form-control name_list"></td>' +
        '<td> <button name="remove" id="r' + r + '" class="btn btn-danger btn_remove_rental">X</button></td></tr>');
    $(document).on('click', '.btn_remove_rental', deleteRow)
}
// ***************************Schedule********************************************
function addSchedule(s, schedulePlacesIDs) {
    //Add the Schedule dynamic table -------------------- SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE
    $('#dynamic_schedule').append('<table class="col table" id="scheduleRow' + s + '"><tr>'
        + '<td class="label">Event Details</td>'
        + '<td class="col"> <input type="text" name="event[]" id="eventName' + s + '" placeholder="Event Name" class="form-control name_list"> <div id="locOutput"></div></td>'
        + '<td> <input type="date" name="event[]" id="date" class="form-control name_list"></td>'
        + '<td> <input type="time" name="event[]" id="time" class="form-control name_list"></td>'
        + '<td> <button name="remove" id="s' + s + '" class="btn btn-danger btn_remove_schedule">X</button></td></tr><tr>'
        + '<td class="label">Location</td>'
        + '<td colspan="12" class="wideField"> <input type="text" name="event[]" id="location' + s + '" placeholder="Event Location"  class="form-control name_list"></td></tr>'
        + '<tr>' +
        '<td class="label">Street address</td>' +
        '<td class="slimField"><input class="field street_number"  disabled="true"></input></td>' +
        '<td class="wideField" colspan="2"><input class="field route"  disabled="true"></input></td></tr>' +
        '<tr>' +
        '<td class="label">City</td>' +
        '<td class="wideField" colspan="3"><input class="field locality"  disabled="true"></input></td></tr><tr>' +
        '<td class="label">State</td>' +
        '<td class="slimField"><input class="field administrative_area_level_1"  disabled="true"></input></td>' +
        '<td class="label">Zip code</td>' +
        '<td class="wideField"><input class="field postal_code"  disabled="true"></input></td></tr><tr>' +
        '<td class="label">Country</td>' +
        '<td class="wideField" colspan="3"><input class="field country"  disabled="true"></input></td>' +
        '</tr></table>');
    //END OF Add the schedule dynamic table -------------------- SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE

    //Autocomplete the form by the google autocomplete -------------------- SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE
    var inputs = document.getElementById('location' + s + '');
    autocompletes = new google.maps.places.Autocomplete(inputs);
    fillAddress('scheduleRow', s, schedulePlacesIDs, autocompletes);
    //END OF Autocomplete the form by the google autocomplete -------------------- SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE

    //Add remove button to schedule -------------------- SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE
    $(document).on('click', '.btn_remove_schedule', deleteRow)
    //END OF Add remove button to schedule -------------------- SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE SCHEDULE
}
//***************************Hotel********************************************
function addHotel(h, hotelPlacesIDs) {
    //Add the Hotel dynamic table -------------------- HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL
    $('#dynamic_hotel').append('<table class="table" id="hotelRow' + h + '"><tr>' +
        '<td class="label align-middle" rowspan="3">Hotel Details</td>' +
        '<td class="slimField" colspan ="2" ><input id="hotelName' + h + '" type="text" placeholder="Name" class="form-control name_list controls field"></td>' +
        '<td> <button name="remove" id="h' + h + '" class="btn btn-danger btn_remove_hotel">X</button></td></tr><tr>' +
        '<td class="slimField" > <input type="text" name="hotel[]" id="hotelLocation' + h +
        '" placeholder="Location" class="form-control name_list controls field"></td>' +
        '<td class="slimField"><input class="form-control name_list controls field" id="hotelPrice" type="number" placeholder="Price" ></td></tr><tr>' +
        '<td class="slimField"><input class="form-control name_list controls field" id="hotelIn" type="date" placeholder="Check In"></td>' +
        '<td class="slimField"><input class="form-control name_list controls field" id="hotelOut" type="date" placeholder="Check Out"></td><tr>' +
        '<td class="label">Street address</td>' +
        '<td class="slimField"><input class="field street_number" disabled="true"></td>' +
        '<td class="wideField" colspan="2"><input class="field route" disabled="true"></td></tr><tr>' +
        '<td class="label">City</td>' +
        '<td class="wideField" colspan="3"><input class="field locality" disabled="true"></td></tr><tr>' +
        '<td class="label">State</td>' +
        '<td class="slimField "><input class="field administrative_area_level_1"  disabled="true"></td>' +
        '<td class="label">Zip code</td>' +
        '<td class="wideField"><input class="field postal_code" disabled="true"></td></tr><tr>' +
        '<td class="label">Country</td>' +
        '<td class="wideField" colspan="3"><input class="field country" disabled="true"></td>' +
        '</tr></table>');

    //END OF Add the Hotel dynamic table -------------------- HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL

    //Autocomplete the form by the google autocomplete -------------------- HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL
    var inputh = document.getElementById('hotelLocation' + h + '');
    autocompleteh = new google.maps.places.Autocomplete(inputh);
    fillAddress('hotelRow', h, hotelPlacesIDs, autocompleteh);
    //END OF Autocomplete the form by the google autocomplete -------------------- HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL

    //Add remove button to schedule -------------------- HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL

    $(document).on('click', '.btn_remove_hotel', deleteRow);
    //END OF Add remove button to schedule -------------------- HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL HOTEL
}


function addArrival() {
    var rowId = $(this).attr("id");
    var rowNum = rowId[7];
    $('#additionTable' + rowNum).remove();
    $('#airportRow' + rowNum).append('<table class="table" id="additionTable' + rowNum + '"><tr>' +
        '<td class="label">Origin Selection:</td>' +
        '<td><div class="dropdown">' +
            '<button class="btn dropbtn dropdown-toggle" id="ddmb' + rowNum + '" type="button"'+
            ' data-toggle="dropdown">Choose Origin<span class="caret"></span></button>' +
            '<ul class="dropdown-menu" id="content' + rowNum + '"></ul></div></td>' +
        '<td class="label">Airport Name</td>' +
        '<td class="wideField" colspan="1"> <input type="text" name="airport[]" id="airportName' + rowNum +
        '" placeholder="Airport Name" class="form-control name_list controls field"></td>' +
        '</tr><tr id="ETA' + rowNum + '">' +
        '<td class="label">Time of Arrival:</td>' +
        '<td> <input id="arrd' + rowNum + '" class="form-control name_list arrival_date" type="date">' +
        '<input type="time" id="arrt' + rowNum + '" class="form-control name_list arrival_time"></td>' +
        '</tr></table>');
    var inputa = document.getElementById('airportName' + rowNum + '');
    autocompletea = new google.maps.places.Autocomplete(inputa);
}

function addDeparture() {
    var rowId = $(this).attr("id");
    var rowNum = rowId[9];
    $('#additionTable' + rowNum).remove();
    $('#airportRow' + rowNum).append('<table class="table" id="additionTable' + rowNum + '"><tr><td class="label">Airport Name</td>' +
        '<td class="wideField" colspan="1"> <input type="text" name="airport[]" id="airportName' + rowNum +
        '" placeholder="Airport Name" class="form-control name_list controls field"></td>' +
        '<td class="label">Destination Selection:</td>' +
        '<td><div class="dropdown">' +
            '<button class="btn dropbtn dropdown-toggle" id="ddmb' + rowNum + '" type="button"'+
            ' data-toggle="dropdown">Choose Destination<span class="caret"></span></button>' +
            '<ul class="dropdown-menu" id="content' + rowNum + '"></ul></div></td>' +
        '</tr><tr id="ETA' + rowNum + '">' +
        '<td class="label">Time of Arrival:</td>' +
        '<td> <input id="arrd' + rowNum + '" class="form-control name_list arrival_date" type="date">' +
        '<input type="time" id="arrt' + rowNum + '" class="form-control name_list arrival_time"></td>' +
        '</tr></table>');
    var inputd = document.getElementById('airportName' + rowNum + '');
    autocompleted = new google.maps.places.Autocomplete(inputd);
}

function addDropdown() {

    var button_id = $(this).attr("id");
    var button_num = button_id[4];
    $('#content' + button_num).empty();
    for (i = 0; i <= h; i++) {
        var hotelLocation = document.getElementById('hotelLocation' + i + '');
        var val = document.getElementById('hotelName' + i + '');
        if (val != null && hotelLocation != null) {
            val = val.value;
            hotelLocation = hotelLocation.value;
            if (val != '' && hotelLocation != '') {
                $('#content' + button_num + '').append('<li><a class="dropdown-item" id="ddih' + button_num + '' + i + '">' + val + '</a></li>')
            }
        }
    }
    for (i = 0; i <= s; i++) {
        var val = document.getElementById('eventName' + i + '')
        var scheduleLocation = document.getElementById('location' + s + '');
        if (val != null && scheduleLocation != null) {
            val = val.value;
            scheduleLocation = scheduleLocation.value;
            if (val != '' && scheduleLocation != '') {
                $('#content' + button_num + '').append('<li><a class="dropdown-item" id="ddis' + button_num + '' + i + ' ">' + val + '</a></li>')
            }
        }
    }

}

function dateStringWithoutTimeZone(a) {
    var dateVal = new Date(document.getElementById('arrd' + a).value);
    var timeVal = document.getElementById('arrt' + a).value;
    var day = dateVal.getDate();
    var month = dateVal.getMonth();
    var year = dateVal.getFullYear();
    var hours = timeVal.split(":")[0];
    var minutes = timeVal.split(":")[1];
    var weekDay = dateVal.getDay();
    var wordDay;
    if (weekDay=='0')    {wordDay =  "Sunday";}
    if (weekDay=='1')    {wordDay = "Monday";}
    if (weekDay=='2')    {wordDay = "Tuesday";}
    if (weekDay=='3')    {wordDay = "Wednesday";}
    if (weekDay=='4')    {wordDay = "Thursday";}
    if (weekDay=='5')    {wordDay = "Friday";}
    if (weekDay=='6')    {wordDay = "Saturday";}
    var completeString = ''+wordDay+', '+day+'/'+month+'/'+year+', in '+hours+':'+minutes;
    return completeString;
}

function getDateFromInput(a) {

    var dateVal = new Date(document.getElementById('arrd' + a).value);
    var timeVal = document.getElementById('arrt' + a).value;
    var day = dateVal.getDate();
    var month = dateVal.getMonth();
    var year = dateVal.getFullYear();
    var hours = timeVal.split(":")[0];
    var minutes = timeVal.split(":")[1];
    var givenDate = new Date(year, month, day, hours, minutes);

    return givenDate;
}
function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function addETA() {
    var ddi = $(this).attr("id");
    var button_num = ddi[5];
    if (isValidDate(getDateFromInput(button_num))) {

        if (ddi[3] == 'h') {
            var placeId = hotelPlacesIDs[button_num];
        }
        else {
            var placeId = schedulePlacesIDs[button_num];
        }
        // END OF Get Location's Google Place ID -------------------- AIRPORT AIRPORT AIRPORT AIRPORT AIRPORT AIRPORT AIRPORT AIRPORT
        var inputa = document.getElementById('airportName' + button_num + '');
        //Get the distance between the airport and the place -------------------- AIRPORT AIRPORT AIRPORT AIRPORT AIRPORT AIRPORT AIRPORT AIRPORT
        if (inputa.value != "") {
            var dest = autocompletea.getPlace().place_id;
            var dmOptions = {
                origins: [{ 'placeId': placeId }, { 'placeId': dest }],
                destinations: [{ 'placeId': dest }, { 'placeId': placeId }],
                travelMode: 'DRIVING',
                transitOptions: {
                    arrivalTime: getDateFromInput(button_num) // **************************NEED TO MAKE IT ACCORDING TO LOCAL TIME ZONE***********
                }
            }
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(dmOptions, function (response, status) {
                if (status == 'OK') {
                    var desti = response.originAddresses[0];
                    var rows = response.rows;
                    var arrivalToAirport = rows[0].elements[0].duration.text;
                    var departureFromAirport = rows[1].elements[1].duration.text;
                    var stringifyDate = dateStringWithoutTimeZone(button_num);
                    $('#info').remove();
                    if ($('#arrival' + button_num).is(':checked')) {
                        $('#ETA' + button_num).append('<td colspan="2" id="info">If you want to get to the airport by ' +
                        stringifyDate + ', you will need to go out ' + arrivalToAirport + ' upfront.</td>')
                    }
                    else {
                        $('#ETA' + button_num).append('<td colspan="2" id="info">If you want to get to ' + desti + ' by ' +
                        stringifyDate + ', you will need to go out ' + departureFromAirport + ' upfront from the airport.</td>')
                    }
                }
            })
        }
        else {
            alert("Please insert an airport.")
        }
    }
    else {
        alert("Please insert time of desired arrival");
    }
}
//***************************Airport********************************************
function addAirport(a) {
    //Add the Airport dynamic table
    $('#dynamic_airport').append('<table class="table" id="airportRow' + a + '"><tr class="text-center">' +
        '<td> <div class="custom-control custom-radio">' +
        '<input id="arrival' + a + '" name="isArrival' + a + '" type="radio" class="custom-control-input arrival">' +
        '<label class="custom-control-label" for="arrival' + a + '"> Arrive to Airport</label></div>' +
        '<div class="custom-control custom-radio">' +
        '<input id="departure' + a + '" name="isArrival' + a + '" type="radio" class="custom-control-input departure">' +
        '<label class="custom-control-label" for="departure' + a + '">Departure from Airport</label></div></td>' +
        '<td> <button name="remove" id="a' + a + '" class="btn btn-danger btn_remove_airport">X</button></td></tr></table>');
    //If the user clicks on arrival:
    $(document).on('click', '.arrival', addArrival)
    //If the user clicks on departure:
    $(document).on('click', '.departure', addDeparture)
    //Add Dropdown table that composed of the hotels and schedule events the user inserted earlier
    $(document).on('click', '.dropbtn', addDropdown) //***Bug needed to be fixed: update the list EVERY TIME when the button clicked */
    //Add Estimated Time of Arrival
    $(document).on('click', '.dropdown-item', addETA)
    //Add remove button to Airport       
    $(document).on('click', '.btn_remove_airport', deleteRow)
}


$(function () { //This is the main function
    $('#addRented').on('click', function () {
        r++;
        addRental(r)
    })
    $('#addSchedule').on('click', function () {
        s++;
        addSchedule(s, schedulePlacesIDs)
    })
    $('#addHotel').on('click', function () {
        h++;
        addHotel(h, hotelPlacesIDs)
    })
    $('#addAirport').on('click', function () {
        a++;
        addAirport(a)
    })
}
)