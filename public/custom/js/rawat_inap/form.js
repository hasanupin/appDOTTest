var idDataRekmed = "";
$(function(){
    $('#frm-registrasi-pasien').validate({
        ignore : "",
        rules : {
            "txtNamaKeluarga" : {
                required : true,
            },
            "txtUmurKeluarga" : {
                required : true,
            },
        }
    });
    
    $('#simpanDataIdentitas').click(function(){
        if($('#frm-registrasi-pasien').valid()){
            saveDataRegistrasi();
        }
    });
});

function saveDataRegistrasi(){
    var urlDetailRekamMedis = global_url+"rawat-inap/detail/";
    var intIDRekmed = $('input[name=txtIdRekamMedis]').val();
    $.ajax({
        url : global_url + "rawat-inap/save-registrasi-pasien/",
        type : "POST",
        data : $('#frm-registrasi-pasien').serialize() + "&" + $('#frm-ruangan-pasien').serialize(),
        success : function(msg){
            var data = jQuery.parseJSON(msg);
            var status = data['status'];
            var message = data['message'];
            var intIDRekmedDetail = data['id'];
            ///var intIDRekmed = data['id_rekmed'];
            var classDiv = (status==true) ? "modal-success" : "modal-danger";
            var messageComplete = (status==true) ? "Data Berhasil Di Simpan, Apakah Lanjut Ke Kelengkapan Detail Rekam Medis" : "Data Gagal Di Simpan";
            bootbox.confirm({
                size : "small",
                title : "Peringatan",
                message : messageComplete,
                className : classDiv,
                callback : function(result){
                    if(result==true){
                        window.location = urlDetailRekamMedis+intIDRekmed+"/"+intIDRekmedDetail;
                    }
                }
            })  
        } 
    });
}

function setNoJaminanKesehatan() {
    //code
    if ($('#selectJamkes').val()!='') {
        //code
        //$('#inputNoJamkes').removeAttr("disabled");
        if ($('#inputNoJamkes').is(":disabled")) {
            //code
            $('#inputNoJamkes').removeAttr("disabled");
        }else{
            $('#inputNoJamkes').removeAttr("readonly");
        }
    }else{
        $('#inputNoJamkes').attr("readonly" , "readonly");
    }
}

$('#txtTanggalMasuk').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
    autoclose : true
});