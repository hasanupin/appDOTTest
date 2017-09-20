var data_grid1 = "";
var data_grid2 = "";
var data_grid3 = "";
var idRekmedDetailIbu = $('input[name=txtIdDetailRekmedIbu]').val();
var data_lab = "";
$(function(){
     data_lab = $('#tbl-detail-lab').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": false,
           ajax : {
           url : global_url+"laboratorium/get-detail-pemeriksaan/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.txtIdKunjungan = $('input[name=txtIdKunjungan]').val();
                d.mode = "poliklinik";
            }
          }
    });

    $('#btnAddRiwayatKehamilan').click(function(){
       $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-riwayat-kehamilan-ibu/'+idRekmedDetailIbu,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Riwayat Kehamilan',
                message : response,
              });
            }
        }); 
    });
    $('#btnAddPelayananANC').click(function(){
        $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-pelayanan-anc-ibu/'+idRekmedDetailIbu,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Pelayanan ANC',
                message : response,
                size : 'large'
              });
            }
        }); 
    });
    
    $('#btnAddPelayananNifas').click(function(){
        $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-pelayanan-nifas-ibu/'+idRekmedDetailIbu,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Pelayanan Nifas',
                message : response,
                size : 'large'
              });
            }
        }); 
    });
    
    data_grid1 = $('#table-riwayat-kehamilan').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : global_url + "rekam-medis-ibu/get-data-riwayat-kehamilan-ibu/",
            type : "POST",
            data : function(d){
                d.txtIdRekamMedis = $('input[name=txtIdDetailRekmedIbu]').val();
            }
          }
    });
    
    $('#btnRefreshRiwayatKehamilan').click(function(){
       data_grid1.ajax.reload(); 
    });
    
    data_grid2 = $('#table-pelayanan-anc').DataTable({
        "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : global_url + "rekam-medis-ibu/get-data-pelayanan-anc-ibu/",
            type : "POST",
            data : function(d){
                d.txtIdRekamMedis = $('input[name=txtIdDetailRekmedIbu]').val();
            }
          }
    });
    
    $('#btnRefreshDataANC').click(function(){
       data_grid2.ajax.reload(); 
    });
    
    data_grid3 = $('#table-pelayanan-nifas').DataTable({
        "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : global_url + "rekam-medis-ibu/get-data-pelayanan-nifas-ibu/",
            type : "POST",
            data : function(d){
                d.txtIdRekamMedis = $('input[name=txtIdDetailRekmedIbu]').val();
            }
          }
    });
    
    $('#btnRefreshDataNifas').click(function(){
       data_grid3.ajax.reload(); 
    });
    getFormPelayanan();
    getFormRujukan();
    
});

function getDataRiwayatKehamilan() {
    //code
    data_grid1.ajax.reload(); 
}

function getDataPelayananANC() {
    //code
    data_grid2.ajax.reload();
}

function getDataPelayananNifas() {
    //code
    data_grid3.ajax.reload();
}

function getDetailFrmRiwayatKehamilan(id) {
    //code
    var idRekmedDetailIbu = $('input[name=txtIdDetailRekmedIbu]').val();
       $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-riwayat-kehamilan-ibu/'+idRekmedDetailIbu+"/"+id,
            success : function(response) {
               bootbox.dialog({
                title : 'Detail Riwayat Kehamilan',
                message : response,
                size : 'large'
              });
            }
        });
}

function getDetailPelayananANC(id) {
    //code
    $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-pelayanan-anc-ibu/'+idRekmedDetailIbu+"/"+id,
            success : function(response) {
               bootbox.dialog({
                title : 'Detail Pelayanan ANC',
                message : response,
                size : 'large'
              });
            }
        });
}

function getDetailPelayananNifas(id) {
    //code
    $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-pelayanan-nifas-ibu/'+idRekmedDetailIbu+"/"+id,
            success : function(response) {
               bootbox.dialog({
                title : 'Detail Pelayanan Nifas',
                message : response,
                size : 'large'
              });
            }
        });
}

function getFormRiwayatSekarang() {
    //code
    var idRekmedDetailIbu = $('input[name=txtIdDetailRekmedIbu]').val();
       $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-riwayat-sekarang-ibu/'+idRekmedDetailIbu,
            success : function(response) {
               $('#frm-riwayat-sekarang-cont').html(response);
            }
    });
}

function getFormPemeriksaan() {
    //code
    var idRekmedDetailIbu = $('input[name=txtIdDetailRekmedIbu]').val();
       $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-pemeriksaan-ibu/'+idRekmedDetailIbu,
            success : function(response) {
               $('#frm-pemeriksaan-cont').html(response);
            }
    });
}

function getFormPelayanan(){
    var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
    var idPasien = $('input[name=txtIdPasien]').val();
    var idKunjungan = $('input[name=txtIdKunjungan]').val();
    var idPelayanan = $('input[name=txtIdPelayanan]').val();
    $.ajax({
            url : global_url + 'rekam-medis/get-frm-rekam-medis/',
            data : 'idRekamMedis='+idRekamMedis+"&idKunjungan="+idKunjungan+"&idPasien="+idPasien+"&modeForm=kunjungan&idPelayanan="+idPelayanan,
            type : "POST",
            success : function(response) {
               $('#frm-pelayanan').html(response);
            }
    });
}

function getFormRujukan(){
    var idKunjungan = $('input[name=txtIdKunjungan]').val();
    $.ajax({
            url : global_url + 'loket/get-frm-rujukan/',
            data : "idKunjungan="+idKunjungan,
            type : "POST",
            success : function(response) {
               $('#frm-periksa-lanjut').html(response);
            }
    });
}

function getFormRencanaPersalinan() {
    //code
    var idRekmedDetailIbu = $('input[name=txtIdDetailRekmedIbu]').val();
    $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-rencana-persalinan-ibu/'+idRekmedDetailIbu,
            success : function(response) {
               $('#frm-rencana-persalinan-cont').html(response);
            }
    });
}

function getFormCatatanPersalinan() {
    //code
    var idRekmedDetailIbu = $('input[name=txtIdDetailRekmedIbu]').val();
    $.ajax({
            url : global_url + 'rekam-medis-ibu/get-frm-catatan-persalinan-ibu/'+idRekmedDetailIbu,
            success : function(response) {
               $('#frm-catatan-persalinan-cont').html(response);
            }
    });
}

function hapusDataPelayananANC(id) {
    //code
    bootbox.confirm("Apakah Anda Akan Menghapus Data?", function(result) {
    console.log(result);
    if (result==true) {
        //code
        $.ajax({
        url : global_url + 'rekam-medis-ibu/hapus-data-pelayanan-anc-ibu/',
        type : "POST",
        data : "idPelayananANC="+id,
        success : function(response) {
           var data = jQuery.parseJSON(response);
           var status = data['status'];
           getDataPelayananANC();
        }
    });
    }
    });
    
}

function hapusDataPelayananNifas(id) {
    //code
    bootbox.confirm("Apakah Anda Akan Menghapus Data?", function(result) {
    if (result==true) {
        //code
        $.ajax({
        url : global_url + 'rekam-medis-ibu/hapus-data-pelayanan-nifas-ibu/',
        type : "POST",
        data : "idPelayananNifas="+id,
        success : function(response) {
           var data = jQuery.parseJSON(response);
           var status = data['status'];
           getDataPelayananANC();
        }
    });
    }
    });   
}

function setPeriksaPoliSelesai(){
    var idRekamMedis = $('input[name=txtIdRekamMedis]').val();;
    var idDetailRekamMedis = $('input[name=txtIdRekmedDetail]').val();
    var idKunjungan = $('input[name=txtIdKunjungan]').val();
    var idPelayanan = $('input[name=txtIdPelayanan]').val();
    $.ajax({
       url : global_url+"loket/periksa-poli-selesai/",
       type : "POST",
       data : "idRekamMedis="+idRekamMedis+"&idDetailRekamMedis="+idDetailRekamMedis+"&idKunjungan="+idKunjungan,
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var message = data['message'];
            if(status){
                bootbox.alert({
                   title : "Update Pemeriksaan Berhasil",
                   message : message, 
                   callback : function(result){
                     window.location = global_url+"pelayanan/poli-ibu/"+idPelayanan+"/"
                   },
                });
            }else{
                bootbox.alert({
                   title : "Update Pemeriksaan Gagal",
                   message : message, 
                });
            }
            
       }
    });
}
