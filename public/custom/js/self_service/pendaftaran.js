var base_url = global_url + "self-service/";
$(function(){

});

function daftarkan(txtIdPasien,intIDPoli) { 
    $.ajax({
        url : base_url + 'registrasi/'  ,
        type : "POST",
        data : "txtIdPasien=" + txtIdPasien + "&intIDPoli="+intIDPoli,
        success : function msg(response) {
            var data = jQuery.parseJSON(response);
            var status = data['status'];
            var message = data['message'];
            var idKunjungan = data['id_kunjungan'];
            if(status==true) {
                printNoAntrian(idKunjungan);
            }
            alertBig(status , message , base_url + "landing-page/" + idKunjungan);
        }     
    });
}

function printNoAntrian(id){
    $.ajax({
        url : global_url+"cetak/cetak-no-antrian/self-service/",
        type : "POST",
        data : "idKunjungan="+id,
        dataType : "html",
        success : function(response){
            ///var data = jQuery.parseJSON(response);
        }   
    });
}

