var base_url_modul = global_url+'kegiatan_luar/dasar_target/';
var grid = "";
var peserta = "";
$(function () {
   
    grid = $('#table-dasar').DataTable({
        "paging": true,
        "ordering": false,
        ajax: {
            url: base_url_modul + "getDasarTarget/",
            type: "POST",
            dataSrc: 'data',
            data: function (d) {
                d.tahun = $('#tahun').val();
                d.kelurahan = $('#cmbKelurahan').val();
                
            }
        }
    });
    
   
    $('#searchBtn').click(function () {
        refresh_grid();
    });
    

    });

function getForm(){
    $.ajax({
        url :  global_url + 'bpjs/kegiatan/form_input',
        type : "POST",
        success : function msg(result){
            bootbox.dialog({
                title : "Tambah Anggota Kegiatan" , 
                message : result,
            });
        }
    });
}
function refresh_grid(){
    grid.ajax.reload();
}


function hapusData(id) {
    //code
    var url_hapus = base_url_modul+"delete/"+id;
  
   bootbox.confirm({
        size : "small",
        title : "Konfirmasi",
        message : "Apakah Anda Akan Menghapus Data Ini?",
        callback : function(response){
            if(response==true){
                window.location = url_hapus;               
            }
            
        }
    });
   
}