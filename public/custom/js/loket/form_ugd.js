var base_url_register = global_url+'loket/';
$( document ).ready(function() {
  // Handler for .ready() called.
  $('#registerButton').click(function(e){
    e.preventDefault();
    if ($('#form-detail-pelayanan').valid()) {
        //code
        saveDataLayanan();
    }
  });
  
  $('#form-detail-pelayanan').validate({
    ignore : "",
    rules : {
           inputNoJamkes : {
                  required : true,
           },
    }
  });
  
  
  
});


function setNoJaminanKesehatan() {
    //code
    if ($('#selectJamkes').val()!='0') {
        //code
        if ($('#inputNoJamkes').attr('disabled')) {
            //code
            $('#inputNoJamkes').removeAttr("disabled");
        }else if ($('#inputNoJamkes').attr('readonly')){
            $('#inputNoJamkes').removeAttr("readonly");
        }
    }else{
        $('#inputNoJamkes').attr("disabled" , "disabled");
    }
}

function saveDataLayanan() {
    //code
    $.ajax({
        url : base_url_register+"saveDataLoketUGD/",
        type : "POST",
        data : $('#form-detail-pelayanan').serialize(),
        dataType : "html",
        success: function msg(res){
            var data = jQuery.parseJSON(res);
            console.log(data);
            var status = data['status'];
            var message = data['message'];
            if (status==true) {
                //code
                var status = data['status'];
                var message = data['message'];
                var urlRedirect = data['link_rekam_medis'];
                var mode = data['mode'];
                messageBox(status , message , 'alert_message');
                window.location = urlRedirect;
            }
        }
    });
}


