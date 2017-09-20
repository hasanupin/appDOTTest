$(function(){

    $('#intIdPegawai').select2();
    $('#frm-input-absensi').validate({
        ignore : "",
        rules : {
            "intIdPegawai" : {
                required : true,
            },
            "dtTanggal" : {
                required : true,
            }
        }
    });

    $('#saveBtn').click(function(){
        if($('#frm-input-absensi').valid()){
            $('#frm-input-absensi').submit();
        }
    });

    $('#dtTanggal').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });

    $('#dtJamMasuk').datetimepicker({
        "format": 'HH:mm',
        
    });

    $('#dtJamKeluar').datetimepicker({
        "format": 'HH:mm',
    });
    

});