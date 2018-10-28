$(function () { //Add Schedule

    let i = 1;
    $('#addSchedule').on('click',function(event){
        i++;
        event.preventDefault();
        $('#dynamic_schedule').append('<tr id="row'+i+'"><td> <input type="text" name="event[]" id="description" placeholder="Event Name" class="form-control name_list"> </td><td> <input type="text" name="event[]" id="location" placeholder="Event Location" class="form-control name_list"> </td><td> <input type="date" name="event[]" id="date" placeholder="Enter Date" class="form-control name_list"></td><td><input type="time" name="event[]" id="time" placeholder="Enter Time" class="form-control name_list"></td><td><button name="remove" id="'+i+'" class="btn btn-danger btn_remove">X</button></td></tr>');
        $(document).on('click', '.btn_remove', function(){
            var button_id= $(this).attr("id");
            $('#row'+button_id+'').remove();
        })
    })
    let r = 1;
    $('#addRented').on('click',function(event){
        r++;
        event.preventDefault();
        $('#dynamic_carrental').append('<tr id="row'+r+'"><td> <input type="text" name="rental[]" id="company" placeholder="Company Name" class="form-control name_list"> </td><td> <input type="text" name="rental[]" id="carName" placeholder="Car Name" class="form-control name_list"> </td><td> <input type="date" name="rental[]" id="startdate" class="form-control name_list"> </td><td> <input type="date" name="rental[]" id="enddate" class="form-control name_list"></td><td><input type="number" name="rental[]" id="price" placeholder="Enter Price" class="form-control name_list"></td><td><button name="remove" id="'+r+'" class="btn btn-danger btn_remove">X</button></td></tr>');
        $(document).on('click', '.btn_remove', function(){
            var button_id= $(this).attr("id");
            $('#row'+button_id+'').remove();
        })
    })
})
