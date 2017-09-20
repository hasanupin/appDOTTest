var base_url_form = global_url+'e-absensi/pegawai/';
$( document ).ready(function() {
  
  $('#saveBtn').click(function(e){
    e.preventDefault();
    if ($('#frm-input').valid()) {
        //code
        $('#frm-input').submit();
    }
  });
  
  $('#frm-input').validate({
    ignore : "",
    rules : {
        txtNoIndukPegawai : {
                required : true,
        },
        txtNamaPegawai : {
                required : true,
        },
        intJabatanPegawai : {
                required : true,
        },
    },messages : {
        txtNoIndukPegawai : "No Induk Harus Di isi",
        txtNamaPegawai : "Nama Pegawai Harus Di Isi",
        intJabatanPegawai : "Jabatan Harus Di Isi",
    }
  });

});




    
