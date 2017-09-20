var base_url_rekam_medis = global_url+"rekam-medis/";
var base_url_detail_rekmed = base_url_rekam_medis+"get-detail-poli-umum/";

var idKunjungan = "";
var data_monitoring = "";
$(function(){
    getFormRujukan();
    getFormKondisiPasien();
    getFormPoliGizi();

    var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
    idKunjungan = $('input[name=txtIdKunjungan]').val();
    var data_grid = $('#table-rekam-medis').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_detail_rekmed+idRekamMedis,
            type : "POST"
          }
    });

    var data_lab = $('#tbl-detail-lab').DataTable({
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

    data_monitoring = $('#tbl-detail-gizi').DataTable({
          "paging": true,
          "searching": false,
          "ordering" : false,
          "lengthChange": false,
           ajax : {
           url : global_url+"poli_gizi/detail/getMonitoringGizi/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.txtIdRekamMedis = $('input[name=txtIdRekamMedis]').val();
            }
          }
    });
});

function test(){
    data_monitoring.ajax.reload();
}


function getFormPoliGizi(){
    var idKunjungan = $('input[name=txtIdKunjungan]').val();
    $.ajax({
            url : global_url + 'poli_gizi/detail/getFormPoliGizi',
            data : "idKunjungan="+idKunjungan,
            type : "POST",
            success : function(response) {
               $('#frm-poli-gizi').html(response);
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
            type : "POST",
            success : function(response) {
               $('#frm-detail-kondisi').html(response);
            }
    });
}

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
                     window.location = global_url+'poli-gizi/'+idPelayanan+"/"
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
function getDetailMonitoringGizi(txtIdKunjungan){
        $.ajax({
            url : global_url + "poli_gizi/Detail/getFormPoliGizi",
            type : "POST",
            data : "idKunjungan="+txtIdKunjungan,
            success : function msg(response){
                bootbox.dialog({
                    title : "Detail Pemeriksaan",
                    size : "large",
                    message : response,
                });
            }
        });
    }


