// $(function () {

// })
$(function () {
    let r = 0;
    $('#addRented').on('click', function (event) {
        r++;
        event.preventDefault();
        $('#dynamic_carrental').append('<tr id="rentalRow' + r + '">' +
            '<td> <input type="text" name="rental[]" id="company" placeholder="Company Name" class="form-control name_list"></td>' +
            '<td> <input type="text" name="rental[]" id="carName" placeholder="Car Name" class="form-control name_list"></td>' +
            '<td> <input type="date" name="rental[]" id="startdate" class="form-control name_list"></td>' +
            '<td> <input type="date" name="rental[]" id="enddate" class="form-control name_list"></td>' +
            '<td> <input type="number" name="rental[]" id="price" placeholder="Enter Price" class="form-control name_list"></td>' +
            '<td> <button name="remove" id="' + r + '" class="btn btn-danger btn_remove_rental">X</button></td></tr>');
        $(document).on('click', '.btn_remove_rental', function () {
            var button_id = $(this).attr("id");
            $('#rentalRow' + button_id + '').remove();
        })
    })
    let s = -1;
    var schedulePlacesIDs = new Array();
    $('#addSchedule').on('click', function (event) {
        s++;
        event.preventDefault();
        $('#dynamic_schedule').append('<table class="col table" id="scheduleRow' + s + '"><tr>'
            + '<td class="label">Event Details</td>'
            + '<td class="col"> <input type="text" name="event[]" id="eventName' + s + '" placeholder="Event Name" class="form-control name_list"> <div id="locOutput"></div></td>'
            + '<td> <input type="date" name="event[]" id="date" class="form-control name_list"></td>'
            + '<td> <input type="time" name="event[]" id="time" class="form-control name_list"></td>'
            + '<td> <button name="remove" id="' + s + '" class="btn btn-danger btn_remove_schedule">X</button></td></tr><tr>'
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
        var input = document.getElementById('location' + s + '');
        autocomplete = new google.maps.places.Autocomplete(input);

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
            schedulePlacesIDs[s] = place.place_id;
            for (var component in componentForm) {
                document.getElementById('scheduleRow' + s).getElementsByClassName(component)[0].value = '';
                document.getElementById('scheduleRow' + s).getElementsByClassName(component)[0].disabled = false;
            }

            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];
                    document.getElementById('scheduleRow' + s).getElementsByClassName(addressType)[0].value = val;
                }
            }
        });
        $(document).on('click', '.btn_remove_schedule', function () {
            var button_id = $(this).attr("id");
            $('#scheduleRow' + button_id + '').remove();
        })
    })

    let h = -1;
    var hotelPlacesIDs = new Array();
    $('#addHotel').on('click', function (event) {
        h++;
        event.preventDefault();
        $('#dynamic_hotel').append('<table class="table" id="hotelRow' + h + '"><tr>' +
            '<td class="label align-middle" rowspan="3">Hotel Details</td>' +
            '<td class="slimField" colspan ="2" ><input id="hotelName'+h+'" type="text" placeholder="Name" class="form-control name_list controls field"></td>'+
            '<td> <button name="remove" id="' + h + '" class="btn btn-danger btn_remove_hotel">X</button></td></tr><tr>' +
            '<td class="slimField" > <input type="text" name="hotel[]" id="hotelLocation' + h +
            '" placeholder="Location" class="form-control name_list controls field"></td>'+
            '<td class="slimField"><input class="form-control name_list controls field" id="hotelPrice" type="number" placeholder="Price" ></td></tr><tr>' +
            '<td class="slimField"><input class="form-control name_list controls field" id="hotelIn" type="date" placeholder="Check In"></td>' +   
            '<td class="slimField"><input class="form-control name_list controls field" id="hotelOut" type="date" placeholder="Check Out"></td><tr>' +
            '<td class="label">Street address</td>' +
            '<td class="slimField"><input class="field street_number"  disabled="true"></td>' +
            '<td class="wideField" colspan="2"><input class="field route"  disabled="true"></td></tr><tr>' +
            '<td class="label">City</td>' +
            '<td class="wideField" colspan="3"><input class="field locality"  disabled="true"></td></tr><tr>' +
            '<td class="label">State</td>' +
            '<td class="slimField "><input class="field administrative_area_level_1"  disabled="true"></td>' +
            '<td class="label">Zip code</td>' +
            '<td class="wideField"><input class="field postal_code" disabled="true"></td></tr><tr>' +
            '<td class="label">Country</td>' +
            '<td class="wideField" colspan="3"><input class="field country"  disabled="true"></td>' +
            '</tr></table>');
        var input = document.getElementById('hotelLocation' + h + '');
        autocomplete = new google.maps.places.Autocomplete(input);
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
            hotelPlacesIDs[h] = place.place_id;
            for (var component in componentForm) {
                document.getElementById('hotelRow' + h).getElementsByClassName(component)[0].value = '';
                document.getElementById('hotelRow' + h).getElementsByClassName(component)[0].disabled = false;
            }

            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];
                    document.getElementById('hotelRow' + h).getElementsByClassName(addressType)[0].value = val;
                }
            }
        });


        $(document).on('click', '.btn_remove_hotel', function () {
            var button_id = $(this).attr("id");
            $('#hotelRow' + button_id + '').remove();
        })
    })
    let a = -1;
    $('#addAirport').on('click', function (event) {
        a++;
        event.preventDefault();
        $('#dynamic_airport').append('<table class="table" id="airportRow' + a + '"><tr>' +
        '<td class="label">Airport Name</td>' +
        '<td class="wideField" colspan="1"> <input type="text" name="airport[]" id="airportName' + a +
        '" placeholder="Airport Name" class="form-control name_list controls field"></td>' +
        '<td class="label">Origin Selection:</td>' +
        '<td><div class="dropdown">'+
        '<button class="btn btn-secondary dropbtn dropdown-toggle" id="ddmb'+a+'" type="button">Choose Origin</button>'+
        '<div class="dropdown-menu dropdown-content" id="content'+a+'"></div></div></td>'+
        '<td> <button name="remove" id="' + a + '" class="btn btn-danger btn_remove_airport">X</button></td></tr><tr>' +
        '<td class="label">Time of Arrival:</td>'+
        '<td> <input class="form-control name_list" type="date"> <input type="time" id="'+a+'"class="form-control name_list arrivalTime"></td>' +
        
        '</tr></table>');
        var input = document.getElementById('airportName' + a + '');
        autocomplete = new google.maps.places.Autocomplete(input);

        $(document).on('click', '.btn_remove_airport', function () {
            var button_id = $(this).attr("id");
            $('#airportRow' + button_id + '').remove();
        })

        $(document).on('click', '.dropbtn', function() {

            var button_id = $(this).attr("id");
            var button_num = button_id[4];
            $('#content' + button_num).empty();
            for (i=0; i<=h; i++){
                var val = document.getElementById('hotelName'+i+'')
                if (val!=null){
                    val=val.value;
                    if (val!=''){
                        $('#content'+button_num+'').append('<a class="dropdown-item" id="ddih'+i+'">'+val+'</a>')
                    }
                }
            }
            for (i=0; i<=s; i++){
                var val = document.getElementById('eventName'+i+'')
                if (val!=null){
                    val=val.value;
                    if (val!=''){
                        $('#content'+button_num+'').append('<a class="dropdown-item" id="ddis'+i+' ">'+val+'</a>')     
                    }
                }
            }
            
            document.getElementById('content' + button_num).classList.toggle("show");
        })

        $(document).click(function(event){
            if (!event.target.matches('.dropbtn')) {

                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                  var openDropdown = dropdowns[i];
                  if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                  }
                }
            }
          });
        
        $(document).on('change', '.arrivalTime', function () {
            var arrival_time_id = $(this).attr("id");
            console.log(document.getElementById(arrival_time_id).value);
        })

        $(document).on('click','.dropdown-item', function(){
            var ddi = $(this).attr("id");
            var button_num = ddi[4];
            if (ddi[3]=='h'){
                var placeId = hotelPlacesIDs[button_num];
            }
            else {
                var placeId = schedulePlacesIDs[button_num];
            }
            var prefix = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=place_id:'
            var origin = placeId;
            var destination = '&destinations=place_id:' + autocomplete.getPlace().place_id;
            var key = '&key=AIzaSyAe8sF9Lwqp5e11N7ljaUHdFAYfcSmPAXg';
            var url = prefix + origin + destination + key;
            fetch(url, {mode: 'cors'})
            .then(function(response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(JSON.stringify(myJson));
            })
        })
        // The user will choose from the dropdown list and will get the estimated time of arrival to the airport
    })


}
)
