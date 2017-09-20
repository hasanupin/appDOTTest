var base_url_poli = global_url+"pelayanan/poliklinik/";
var base_url_penyakit = global_url+"data-penyakit/";
var base_url_rekam_medis = global_url+"rekam-medis/";
var base_url_register = global_url+"loket/";
var base_url_detail_rekmed = base_url_rekam_medis+"get-detail-poli-umum/";

var number = 1;
var numberTindakan = 1;
var statusQueue = 2;
var statusDone = 3;
var data_lab = "";
$( document ).ready(function() {
    getFormPelayanan();
    getFormRujukan();
    getFormKondisiPasien();
    $('#btnPeriksaLanjut').click(function(){
        if($('#form-pemeriksaan-lanjut').valid()){
            var r = confirm("Apakah Pasien Di Rujuk?");
            if(r==true){
                saveReferral();    
            }
        }
    });

    
    
    $('#form-pemeriksaan-lanjut').validate({
        ignore : "",
        rules : {
                txtKeteranganPemeriksaan : {
                    required : true,
                },
        }
    })
    
    //updateStatusAntrian("poli",statusQueue);
    var idRekamMedis = $('input[name=txtIdPasien]').val();
    var data_grid = $('#table-rekam-medis').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          ajax : {
            url : base_url_detail_rekmed+idRekamMedis,
            type : "POST"
          }
    });

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
    
    $('#getRekamMedis').click(function(){
        var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
        var url_post = base_url_detail_rekmed+idRekamMedis;
        data_grid.ajax.reload();
    });
    
});

function saveReferral(){
    $.ajax({
       url : base_url_register+"save-referral-antrian/",
       type : "POST",
       data : $('#frm-detail-register').serialize() +"&"+ $('#form-pemeriksaan-lanjut').serialize()+"&"+ $('#frm-detail-rekmed').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var message = data['message'];
            messageBox(status , message , 'alert_message_periksa');
            window.location = base_url_poli;
       }
    }); 
}

function setPeriksaPoliSelesai(){
    bootbox.confirm({
        title : "Konfirmasi",
        message : "Apakah Pemeriksaan Sudah Selesai ?",
        callback : function(result){
            if(result==true){
                sendFinish();
            }
        }
    });
    
}

function sendFinish(){
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
                     window.location = base_url_poli+idPelayanan+"/"
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

function saveRekmed() {
    //code
    $.ajax({
       url : base_url_rekam_medis+"save-rekam-medis/",
       type : "POST",
       data : $('#frm-detail-register').serialize() +"&"+ $('#frm-detail-rekmed').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var message = data['message'];
            messageBox(status , message , 'alert_message');
            if (status==true) {
             //code
             var idRekmed = data['id_rekmed'];
             var idDetailRekmed = data['id_rekmed_detail'];
             $('input[name=txtIdRekamMedis]').val(idRekmed);
             $('input[name=txtIdRekmedDetail]').val(idDetailRekmed);
             disableForm();
             updateStatusAntrian("poli",statusDone);
             var pengobatan = $('#txtPengobatan').val().trim();
             if (pengobatan!="") {
                  updateStatusAntrian("apotik",1);
             }
            }
       }
    }); 
}

/// Form Add Diagnosa
function getDetailRekamMedis() {
    //code
    $.ajax({
       url : base_url_rekam_medis+"get-detail-poli-umum/",
       type : "POST",
       data : $('#frm-detail-register').serialize()+"&page="+$('#page-detail-rekmed').val()+"&mode_form=false",
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            if (status==true) {
             //code
             var page_next = data['page'];
             var message = data['html'];
             $('#page-detail-rekmed').val(page_next);
             $('#accordion-rekmed').append(message);
            }else{
                  
            }
       }
    }); 
}

function updateStatusAntrianReferal(pelayanan,status,link) {
    //code
    $.ajax({
       url : base_url_register+"update-status-antrian/",
       type : "POST",
       data : "idKunjungan="+$('input[name=txtIdKunjungan]').val()+"&statusKunjungan="+status+"&statusPelayanan="+pelayanan,
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            if (status==true) {
                window.location = link;
            }
       }
    }); 
}

 function updateStatusAntrian(pelayanan,status) {
    //code
    $.ajax({
       url : base_url_register+"update-status-antrian/",
       type : "POST",
       data : "idKunjungan="+$('input[name=txtIdKunjungan]').val()+"&statusKunjungan="+status+"&statusPelayanan="+pelayanan,
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            return status;
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
               $('#frm-kunjungan').html(response);
            }
    });
}

function getFormKondisiPasien(){
    var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
    $.ajax({
            url : global_url + 'rekam-medis/get-frm-kondisi-pasien/',
            data : 'idRekamMedis='+idRekamMedis,
            type : 'POST',
            success : function(response) {
               $('#frm-detail-kondisi').html(response);
            }
    });
}

function getFormKehamilan(){
    var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
    $.ajax({
            url : global_url + 'rekam-medis/get-frm-kehamilan-pasien/',
            data : 'idRekamMedis='+idRekamMedis,
            type : "POST",
            success : function(response) {
               $('#frm-detail-kehamilan').html(response);
            }
    });
}