var base_url_modul = global_url+'kegiatan_luar/imunisasi/';
var grid = "";
var peserta = "";
var id_kegiatan = "";
$(function () {
     $('.select2').select2({
          tags: "true",
          
     });
      
    id_kegiatan = $('#id_kegiatan').val();
     $('#start_date').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
});
     $('#end_date').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
});
   $('#tanggal_kegiatan').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
});
   
        grid = $('#table-imunisasi').DataTable({
         "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
        ajax: {
            url: base_url_modul + "getDaftarImunisasi/",
            type: "POST",
            dataSrc: 'data',
            data: function (d) {
                d.start_date = $('#start_date').val();
                d.end_date = $('#end_date').val();
                d.jenis_kegiatan = $('#jenis_kegiatan').val();
                d.kelurahan = $('#cmbKelurahan').val();
                
            }
        }
    });
     peserta = $('#table-pasien').DataTable({
           "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
        ajax: {
            url: base_url_modul + "getDaftarPesertaImun/",
            type: "POST",
            dataSrc: 'data',
            data: function (d) {
                d.id_kegiatan = $('#id_kegiatan').val();
               
                
            }
        }
    });
    
   
    $('#searchBtn').click(function () {
        refresh_grid();
    });
    $('#addPasien').click(function () {
         $.ajax({
      url : global_url + 'kegiatan_luar/imunisasi/form_peserta/',
      success : function(response) {
         bootbox.dialog({
          title : 'Cari Pasien',
          message : response
        });
      }
    });  
    });
    
    
    $('#btnCariPasien').click(function() {
   tambahims();
  });
  
   


});
function tambahims(){
     $.ajax({
      url : global_url + 'kegiatan_luar/imunisasi/form_peserta',
      success : function(response) {
         bootbox.dialog({
          title : 'Cari Pasien',
          message : response
        });
      }
    });   
}
function add(){
     var num = $('.row-form-petugas').length;
    var newNum = new Number(num + 1);
     
    var newSection = $('#row-form-petugas-' + num).clone().attr("id" , "row-form-petugas-" + newNum);
   newSection.children(":first").children(":first").attr("id","listPegawai"+newNum).val("");
   ///$('#listPegawai'+newNum)
    newSection.children(":nth-child(2)").html('<button type="button" onclick="hapusPetugas('+newNum+')" class="btn btn-danger btn-flat" id="btnHapusPetugas'+newNum+'"><i class="fa fa-trash"></i></button>');
     
    $('#cont-list-petugas').last().append(newSection);
   
  
}
function cancel_modal(){
    $('.bootbox').modal('hide');
}
function refresh_table(){
    peserta.ajax.reload();
}

function hapusPetugas(num){
  console.log(num);
  $('#row-form-petugas-' + num).remove();
  
}
function hapusImun(num){
  console.log(num);
  $('#row-form-imun-' + num).remove();
  
}
function getForm(id = ""){
     $.ajax({
      url : global_url + 'kegiatan_luar/imunisasi/form_detail_pasien/'+id,
      success : function(response) {
         bootbox.dialog({
          size : "large",
          title : 'Form Tambah Pasien Imunisasi',
          message : response
        });
      }
    });   
}
function getFormTambah(){
     var id = "";
     $.ajax({
      url : global_url + 'pasien/getFormPasienModal/insert/'+id,
      success : function(response) {
         bootbox.dialog({
          size : "large",
          title : 'Form Registrasi Pasien',
          message : response
        });
      }
    });   
}
function getFormDetail(id){
     $.ajax({
      url : global_url + 'kegiatan_luar/imunisasi/form_detail_pasien/'+id+'/1',
      success : function(response) {
         bootbox.dialog({
          size : "large",
          title : 'Form Edit Pasien',
          message : response
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
function hapusDataPasien(id) {
    //code
    var url_hapus = base_url_modul+"deletePasien/"+id+"/"+id_kegiatan;
  
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
function getKelurahan() {
    //code
    $.ajax({
      url : global_url+"pasien/getDataKelurahan/",
      type : "POST",
      data : "idKecamatan="+$('#selectKecamatan').val(),
      dataType : "html",
      success: function msg(res){
           var data = jQuery.parseJSON(res);
           var status = data['status'];
           var resHtml = data['html'];
           $('#selectKelurahan').html(resHtml);
      }
    });
}
function hide_form(){
  var jenis = $('#id_jenis_pasien_imunisasi').val();    
   if (jenis == "") {
       hide();
       $('#jenis').hide();
   }else if (jenis == 4) {
   $('#cont-nama_suami').show();
    $('#cont-status_nikah').show();
   $('#jenis').show();
   $('#cont-nama_ibu').hide();
   $('#cont-hpht').hide();
   $('#cont-kehamilan_ke').hide();
   $('#cont-jarak_kehamilan').hide();
  
  }else if (jenis == 5) {
     $('#cont-nama_suami').show();
    $('#cont-status_nikah').show();
    $('#cont-hpht').show();
   $('#cont-kehamilan_ke').show();
   $('#cont-nama_ibu').hide();
   $('#jenis').show();
       
   }else if (jenis == 6) {
      hide();
      $('#jenis').show();
   }else if (jenis == 7) {
      hide();
      $('#jenis').show();
   }else{
       $('#jenis').show();
   $('#cont-status_nikah').hide();
   $('#cont-nama_suami').hide();
   $('#cont-nama_ibu').show();
   $('#cont-hpht').hide();
   $('#cont-kehamilan_ke').hide();
   $('#cont-jarak_kehamilan').hide();
    
   }
}
function hide(){
   $('#cont-hpht').hide();
   $('#cont-status_nikah').hide();
   $('#cont-nama_suami').hide();
   $('#cont-nama_ibu').hide();
   $('#cont-hpht').hide();
   $('#cont-kehamilan_ke').hide();
   $('#cont-jarak_kehamilan').hide();
 
}
function savePasien(){
    var url = base_url_modul+"simpan/"+id_kegiatan;
      $.ajax({
        url : url,
        type: "POST",
        data: $('#form-peserta').serialize(),
        dataType: "JSON",
        success: function(data)
        {
            cancel_modal()
            refresh_table()
        }
      });
}
