var base_url_form = global_url+'master/kamar/';
$( document ).ready(function() {

$('#saveBtn').click(function(e){
    e.preventDefault();
    if ($('#frm-input').valid()) {
        //code
        saveRedirect(base_url_form+"simpanData/" , "frm-input" , base_url_form , "Data Gagal Di Simpan");
    }
  });

$('#frm-input').validate({
    ignore : "",
    rules : {
           txtKamar : {
                  required : true,
           },
           intKapasitasKamar : {
                  required : true,
           },
    },messages : {
        txtKamar : "Isikan Nama Kamar / Ruangan",
        intKapasitasKamar : "Isikan Kapasitas Kamar / Ruangan",
    }
  });
});