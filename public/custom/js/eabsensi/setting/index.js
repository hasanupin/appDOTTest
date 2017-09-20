$(function(){
    $('.timepicker').datetimepicker({
            "format": 'HH:mm:00',
    });

    $('#btnSimpanTime').click(function(){
        if($('#frm-setting-day').valid()){
            saveDataWaktu();
        }
    });

    $('#frm-setting-day').validate({
        ignore : "",
        rules : {
            "dtJamMasuk[]" : {
                required : true,
            },
            "dtJamPulang[]" : {
                required : true,
            }
        }
    });
});


function saveDataWaktu(){

    $.ajax({
       url : global_url + "eabsensi/setting/simpanWaktu", 
       type : "POST",
       data : $('#frm-setting-day').serialize(),
       success : function msg(response) {
           var data = jQuery.parseJSON(response);
           var status = data['status'];
           var message = data['message'];
           alertRedirect(status, message , global_url + "e-absensi/setting/");
       }
    });
}
