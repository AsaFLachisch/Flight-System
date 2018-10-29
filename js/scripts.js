$(function () { //Add Schedule

    let i = 1;
    $('#addSchedule').on('click',function(event){
        i++;
        event.preventDefault();
        $('#dynamic_schedule').append('<tr id="scheduleRow'+i+'">'
        +'<td> <input type="text" name="event[]" id="description" placeholder="Event Name" class="form-control name_list"> <div id="locOutput"></div></td>'
        +'<td> <input type="text" name="event[]" id="location" placeholder="Event Location" class="form-control name_list"></td>'
        +'<td> <input type="date" name="event[]" id="date" placeholder="Enter Date" class="form-control name_list"></td>'
        +'<td> <input type="time" name="event[]" id="time" placeholder="Enter Time" class="form-control name_list"></td>'
        +'<td> <button name="remove" id="'+i+'" class="btn btn-danger btn_remove_schedule">X</button></td></tr>');
        $(document).on('click', '.btn_remove_schedule', function(){
            var button_id= $(this).attr("id");
            $('#scheduleRow'+button_id+'').remove();
        })
    })
    let r = 1;
    $('#addRented').on('click',function(event){
        r++;
        event.preventDefault();
        $('#dynamic_carrental').append('<tr id="rentalRow'+r+'">'+
        '<td> <input type="text" name="rental[]" id="company" placeholder="Company Name" class="form-control name_list"></td>'+
        '<td> <input type="text" name="rental[]" id="carName" placeholder="Car Name" class="form-control name_list"></td>'+
        '<td> <input type="date" name="rental[]" id="startdate" class="form-control name_list"></td>'+
        '<td> <input type="date" name="rental[]" id="enddate" class="form-control name_list"></td>'+
        '<td> <input type="number" name="rental[]" id="price" placeholder="Enter Price" class="form-control name_list"></td>'+
        '<td> <button name="remove" id="'+r+'" class="btn btn-danger btn_remove_rental">X</button></td></tr>');
        $(document).on('click', '.btn_remove_rental', function(){
            var button_id= $(this).attr("id");
            $('#rentalRow'+button_id+'').remove();
        })
    })
})
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('hotelName')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  }
