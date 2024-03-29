$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Image Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // calling /predict API from Flask and returning value
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // preparing the Flow of data to API 
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                if (data == "Elbes Mask ya ham :3") {
                    // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html('<h3 style="color: #dc3545;">Elbes Mask ya ham :3</h3>');
                console.log('Success!');
                } else if (data == "Sa7itek ya sidi") {
                    // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html('<h3 style="color: #28a745;">Sa7itek ya sidi</h3>');
                console.log('Success!');
                }
                
            },
        });
        // Processing data while loading the WEB APP     
        $.ajax({
            type :'GET' , 
            url : '/data', 
            data: form_data , 
            contentType:false, 
            cache:false, 
            processData:true, 
            async: true, 
            success: function(data){
                if(data == "Welcome Here"){ 
                    
                }else if(data == "Other") {
                    
                }
            }
        }); 
    });

});
