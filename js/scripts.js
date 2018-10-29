$(function () {

    let i = 1;
    $('#addSchedule').on('click', function (event) {
        i++;
        event.preventDefault();
        $('#dynamic_schedule').append('<tr id="scheduleRow' + i + '">'
            + '<td> <input type="text" name="event[]" id="description" placeholder="Event Name" class="form-control name_list"> <div id="locOutput"></div></td>'
            + '<td> <input type="text" name="event[]" id="location'+i+'" placeholder="Event Location" class="form-control name_list"></td>'
            + '<td> <input type="date" name="event[]" id="date" placeholder="Enter Date" class="form-control name_list"></td>'
            + '<td> <input type="time" name="event[]" id="time" placeholder="Enter Time" class="form-control name_list"></td>'
            + '<td> <button name="remove" id="' + i + '" class="btn btn-danger btn_remove_schedule">X</button></td></tr>');
            var input = document.getElementById('location' + i + '');
            autocomplete = new google.maps.places.Autocomplete(input);
            $(document).on('click', '.btn_remove_schedule', function () {
            var button_id = $(this).attr("id");
            $('#scheduleRow' + button_id + '').remove();
        })
    })
    let r = 1;
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
    let h = 1;
    $('#addHotel').on('click', function (event) {
        h++;
        event.preventDefault();
        $('#dynamic_hotel').append('<table id="hotelRow' + h + '"><tr>' +
            '<td class="label">Hotel Name</td>'+
            '<td class="wideField" colspan="12"> <input type="text" name="hotel[]" id="hotelName' + h +
            '" placeholder="Hotel Name" class="form-control name_list controls field"></td>'+
            '<td> <button name="remove" id="' + h + '" class="btn btn-danger btn_remove_hotel">X</button></td></tr>' +
            '<tr>'+
            '<td class="label">Street address</td>'+
            '<td class="slimField"><input class="field" id="street_number" disabled="true"></input></td>'+
            '<td class="wideField" colspan="2"><input class="field" id="route" disabled="true"></input></td></tr>'+
            '<tr>'+
            '<td class="label">City</td>'+
            '<td class="wideField" colspan="3"><input class="field" id="locality" disabled="true"></input></td></tr><tr>'+
            '<td class="label">State</td>'+
            '<td class="slimField"><input class="field" id="administrative_area_level_1" disabled="true"></input></td>'+
            '<td class="label">Zip code</td>'+
            '<td class="wideField"><input class="field" id="postal_code" disabled="true"></input></td></tr><tr>'+
            '<td class="label">Country</td>'+
            '<td class="wideField" colspan="3"><input class="field" id="country" disabled="true"></input></td>'+
            '</tr></table>');
            var input = document.getElementById('hotelName' + h + '');
            autocomplete = new google.maps.places.Autocomplete(input);
            var placeSearch;
            var componentForm = {
              street_number: 'short_name',
              route: 'long_name',
              locality: 'long_name',
              administrative_area_level_1: 'short_name',
              country: 'long_name',
              postal_code: 'short_name'
            };
            autocomplete.addListener('place_changed', function (){
                var place = autocomplete.getPlace();
                for (var component in componentForm) {
                    document.getElementById(component).value = '';
                    document.getElementById(component).disabled = false;
                  }
          
                  // Get each component of the address from the place details
                  // and fill the corresponding field on the form.
                  for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                      var val = place.address_components[i][componentForm[addressType]];
                      document.getElementById(addressType).value = val;
                    }
            }});


        $(document).on('click', '.btn_remove_hotel', function () {
            var button_id = $(this).attr("id");
            $('#hotelRow' + button_id + '').remove();
        })
    })

}
)
