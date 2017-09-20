var base_url_modul = global_url+'bpjs/kegiatan/';
var kegiatan = "";
var peserta = "";
$(function () {
   
  
        $("#lblclub").css("display","none");
      
    
     $( "#jenis_kelompok" ).change(function() {
         var kelompok = $( "#jenis_kelompok" ).val();
         
                if(kelompok == 01){
                     var $el = $("#club");
                    $el.empty(); // remove old options
                    $el.append($("<option></option>")
                            .attr("value", '4496').text('Bululawang (Diabetes Melitus)'));
                $("#lblclub").css("display","inline");
                $("#club").css("display","inline");
                } else if (kelompok == 02) {
                      var $el = $("#club");
                    $el.empty(); // remove old options
                    $el.append($("<option></option>")
                            .attr("value", '4497').text('Bululawang (Hipertensi)'));
                $("#lblclub").css("display","inline");
                $("#club").css("display","inline");
                }else if(kelompok != 02 && kelompok != 01 ){
                       var $el = $("#club");
                    $el.empty();
                   $("#lblclub").css("display","none");
                $("#club").css("display","none");
                }

         
          });
        
    kegiatan = $('#table-kegiatan').DataTable({
        "paging": true,
        "ordering": false,
        ajax: {
            url: global_url + "bpjs/kegiatan/getDataKegiatan/",
            type: "POST",
            dataSrc: 'data',
            data: function (d) {
                d.tahun = $('#tahun').val();
                d.bulan = $('#bulan').val();
                
            }
        }
    });
    
    peserta = $('#table-peserta').DataTable({
        "paging": true,
        "ordering": false,
        ajax: {
            url: global_url + "bpjs/kegiatan/getPesertaKelompok/",
            type: "POST",
            dataSrc: 'data',
            data: function (d) {
                d.eID = $('#id').val();
                
            }
        }
    });

    $('#searchBtn').click(function () {
        refresh_grid();
    });
     $('#saveBtn').click(function () {
        saveData();
    });

    $('.datepicker').datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
    });

    $('.datepicker').datepicker({
    "format": 'dd-mm-yyyy',
    "locale" : 'id',
    autoclose : true,
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
    kegiatan.ajax.reload();
}
function refresh_table(){
    peserta.ajax.reload();
}
function saveData(){
    $.ajax({
        url : global_url + 'bpjs/kegiatan/saveData',
        type : "POST",
        data : $('#frm-kegiatan').serialize(),
        success : function msg(response){
            var data = jQuery.parseJSON(response);
            var status = data['status']; 
            var message = data['message'];
            var id = data['id'];
            $('#id').val(id);
            refresh_table()
             bootbox.alert({
                title : "berhasil" , 
                message : message,
                className : "modal-success",
                backdrop : true,
            });
           
        }
    });
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