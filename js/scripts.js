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
    var placesIDs = new Array();
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
            placesIDs[s] = place.place_id;
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
    $('#addHotel').on('click', function (event) {
        h++;
        event.preventDefault();
        $('#dynamic_hotel').append('<table class="table" id="hotelRow' + h + '"><tr>' +
            '<td class="label">Hotel Details</td>' +
            '<td class="wideField" colspan="1"> <input type="text" name="hotel[]" id="hotelName' + h +
            '" placeholder="Hotel Name" class="form-control name_list controls field"></td>' +
            '<td class="slimField"><input class="field" id="hotelPrice" type="number" placeholder="Price"></td>' +
            '<td> <button name="remove" id="' + h + '" class="btn btn-danger btn_remove_hotel">X</button></td></tr>' +
            '<tr>' +
            '<td class="label">Street address</td>' +
            '<td class="slimField"><input class="field street_number"  disabled="true"></td>' +
            '<td class="wideField" colspan="2"><input class="field route"  disabled="true"></td></tr>' +
            '<tr>' +
            '<td class="label">City</td>' +
            '<td class="wideField" colspan="3"><input class="field locality"  disabled="true"></td></tr><tr>' +
            '<td class="label">State</td>' +
            '<td class="slimField "><input class="field administrative_area_level_1"  disabled="true"></td>' +
            '<td class="label">Zip code</td>' +
            '<td class="wideField"><input class="field postal_code" disabled="true"></td></tr><tr>' +
            '<td class="label">Country</td>' +
            '<td class="wideField" colspan="3"><input class="field country"  disabled="true"></td>' +
            '</tr></table>');
        var input = document.getElementById('hotelName' + h + '');
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
        '" placeholder="Airport Name" class="form-control name_list controls field"></td></tr><tr>' +
        '<td class="label">Origin:</td>'+
        '<td class=wideField" colspan="1"> <select id="origins" name="origins"></select>'+
        '<td> <button name="remove" id="' + a + '" class="btn btn-danger btn_remove_airport">X</button></td>' +
        '</tr></table>');
        var input = document.getElementById('airportName' + a + '');
        autocomplete = new google.maps.places.Autocomplete(input);
        for (i=0; i<h+s; i++) {
            if (i<h) {
                $('#origins').append($('#hotelName' + i).val);
            }
            else {
                $('#origins').append($('#eventName' + i).val);
            }
        }
        $(document).on('click', '.btn_remove_airport', function () {
            var button_id = $(this).attr("id");
            $('#airportRow' + button_id + '').remove();
        })
        // Create a dropdown list of locations that are either from the schedule or from the hotel
        // The user will choose from the dropdown list and will get the estimated time of arrival to the airport
    })

}
)
