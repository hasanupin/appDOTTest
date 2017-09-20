var txtIdRekamMedis = "";
var txtIdRekamMedisDetail = "";
var txtIdKunjungan = "";
var txtIdPasien = "";
var data_grid = "";
var data_grid_perkembangan = "";
var data_grid_asuhan = "";
var data_grid_obat = "";
var data_grid_cairan = "";
var data_grid_tindakan = "";
var data_lab = "";
$(function(){
    txtIdRekamMedis = $('input[name=txtIdRekmed]').val();
    txtIdRekamMedisDetail = $('input[name=txtIdRekmedDetail]').val();
    txtIdKunjungan = $('input[name=txtIdKunjungan]').val();
    txtIdPasien = $('input[name=txtIdPasien]').val();
    
    getFormResumeMedis();
    getFormRujukan();
    getFormPemeriksaan();
    getFormAssesment();
    getFormCairan();
    getFormDiagnosa();

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
    
    data_grid = $('#table-rekam-medis').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : global_url+"rekam-medis/get-detail-poli-umum/"+txtIdPasien,
            type : "POST"
          }
    });

    data_grid_perkembangan = $('#table-perkembangan').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          ajax : {
            url : global_url+"rawat-inap/get-data-perkembangan/",
            type : "POST",
            data : function(d){
                d.txtIdRekmedDetail = txtIdRekamMedisDetail;
            }
          }
    });

    data_grid_asuhan = $('#table-asuhan').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          ajax : {
            url : global_url+"rwt_inap/Asuhan/getData/",
            type : "POST",
            data : function(d){
                d.txtIdRekmedDetail = txtIdRekamMedisDetail;
            }
          }
    });

    data_grid_cairan = $('#table-cairan').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          ajax : {
            url : global_url+"rawat-inap/get-data-cairan/",
            type : "POST",
            data : function(d){
                d.txtIdRekmedDetail = txtIdRekamMedisDetail;
            }
          }
    });

    data_grid_obat = $('#table-pengobatan').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          ajax : {
            url : global_url+"rawat-inap/get-data-obat/",
            type : "POST",
            data : function(d){
                d.txtIdRekmedDetail = txtIdRekamMedisDetail;
            }
          }
    });

    data_grid_tindakan = $('#table-tindakan').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          ajax : {
            url : global_url+"rawat-inap/get-data-tindakan/",
            type : "POST",
            data : function(d){
                d.txtIdRekmedDetail = txtIdRekamMedisDetail;
            }
          }
    });

    $('#btnAddFormPerkembangan').click(function(){
        $.ajax({
            url : global_url + 'rawat-inap/get-frm-perkembangan/'+txtIdRekamMedisDetail,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Perkembangan Pasien',
                message : response,
                size : 'large'
              });
            }
        }); 
    });

    $('#btnRefreshPerkembangan').click(function(){
        getDataPerkembangan();
    });

    $('#btnAddFormPengobatan').click(function(){
        $.ajax({
            url : global_url + 'rawat-inap/get-frm-pengobatan/'+txtIdRekamMedisDetail,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Pengobatan',
                message : response,
                size : 'large'
              });
            }
        });
    });

    $('#btnAddFormCairan').click(function(){
        $.ajax({
            url : global_url + 'rawat-inap/get-frm-cairan/'+txtIdRekamMedisDetail,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Cairan',
                message : response,
                size : 'large'
              });
            }
        });
    });

    $('#btnAddFormAsuhan').click(function(){
        $.ajax({
            url : global_url + 'rwt_inap/Asuhan/getForm/'+txtIdRekamMedisDetail,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Asuhan Keperawatan',
                message : response,
                size : 'large'
              });
            }
        });
    });

    $('#btnAddFormTindakan').click(function(){
        $.ajax({
            url : global_url + 'rawat-inap/get-frm-tindakan/'+txtIdRekamMedisDetail,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Tindakan',
                message : response,
                size : 'large'
              });
            }
        });
    });

    $('#btnRefreshPengobatan').click(function(){
        getDataPengobatan();
    });

    $('#btnRefreshAsuhan').click(function(){
        getDataAsuhan();
    });

    $('#btnGetFormAntrian').click(function(){
        $.ajax({
            url : global_url + 'rawat-inap/get-frm-antrian-apotik/'+txtIdRekamMedis+'/'+txtIdRekamMedisDetail+"/"+txtIdKunjungan,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Antrian Apotik',
                message : response,
                size : 'large'
              });
            }
        });
    });

    $('#btnRefreshCairan').click(function(){
        getDataCairan();
    });

    $('#btnRefreshTindakan').click(function(){
        getDataTindakan();
    });

    $('#btnResumeMedik').click(function(){
        rawatSelesai();
    });
    
});

function rawatSelesai(){
    $.ajax({
            url : global_url + 'loket/rawat-inap-selesai/',
            type : "POST",
            data : "idKunjungan="+txtIdKunjungan+"&idDetailRekamMedis="+txtIdRekamMedisDetail,
            success : function(response) {
                var data = jQuery.parseJSON(response);
                var status = data['status'];
                var message = data['message'];
                var link = "";
                if(status==true){
                    link = global_url + "rawat-inap/8";
                }
                alertPopUp(status,message,link);
               
            }
        });
}

function getFormPerkembangan(txtIdRekamMedisDetail , txtIdPerkembangan){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-perkembangan/'+txtIdRekamMedisDetail+'/'+txtIdPerkembangan,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Perkembangan Pasien',
                message : response,
                size : 'large'
              });
            }
        });
}

function getFormAsuhan(txtIdRekamMedisDetail , txtIdAsuhan){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-perkembangan/'+txtIdRekamMedisDetail+'/'+txtIdPerkembangan,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Perkembangan Pasien',
                message : response,
                size : 'large'
              });
            }
        });
}

function getFormDataObat(txtIdRekamMedisDetail , txtIdObat){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-pengobatan/'+txtIdRekamMedisDetail+"/"+txtIdObat,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Obat',
                message : response,
                size : 'large'
              });
            }
        });
}

function getFormDataCairan(txtIdRekamMedisDetail , txtIdCairan){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-cairan/'+txtIdRekamMedisDetail+"/"+txtIdCairan,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Cairan',
                message : response,
                size : 'large'
              });
            }
        });
}

function getFormDataTindakan(txtIdRekamMedisDetail , txtIdTindakan){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-tindakan/'+txtIdRekamMedisDetail+"/"+txtIdTindakan,
            success : function(response) {
               bootbox.dialog({
                title : 'Form Tindakan',
                message : response,
                size : 'large'
              });
            }
        });
}



function getDataPerkembangan(){
    data_grid_perkembangan.ajax.reload();
}

function getDataAsuhan(){
    data_grid_asuhan.ajax.reload();
}

function getDataRekamMedis(){
    data_grid.ajax.reload();
}

function getDataPengobatan(){
    data_grid_obat.ajax.reload();
}

function getDataCairan(){
    ///alert("SHUT THE FUC UP");
    data_grid_cairan.ajax.reload();
}

function getDataTindakan(){
    data_grid_tindakan.ajax.reload();
}

function getFormPemeriksaan(){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-pemeriksaan/'+txtIdRekamMedisDetail,
            success : function(response) {
               $('#form-pemeriksaan').html(response);
            }
	   });
}

function getFormDiagnosa(){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-diagnosis/'+txtIdRekamMedisDetail,
            success : function(response) {
               $('#form-diagnosa').html(response);
            }
	   });
}

function getFormResumeMedis(){
    $.ajax({
            url : global_url + 'rawat-inap/get-resume-medis/'+txtIdRekamMedisDetail,
            success : function(response) {
               $('#form-resume-medis').html(response);
            }
	   });
}

function getFormRujukan(){
    ////var idKunjungan = $('input[name=txtIdKunjungan]').val();
    $.ajax({
            url : global_url + 'loket/get-frm-rujukan/',
            data : "idKunjungan="+txtIdKunjungan,
            type : "POST",
            success : function(response) {
               $('#form-periksa-lanjut').html(response);
            }
    });
}

function getFormAssesment(){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-assesment/'+txtIdRekamMedisDetail,
            success : function(response) {
               $('#form-assesment').html(response);
            }
	   });
}

function getFormCairan(){
    $.ajax({
            url : global_url + 'rawat-inap/get-frm-cairan/'+txtIdRekamMedisDetail,
            success : function(response) {
               $('#form-cairan').html(response);
            }
	   });
}

function hapusPerkembangan(txtIdRekmedDetail , intIdPerkembangan){
    bootbox.confirm({
        title : "Konfirmasi",
        message : "Apakah Data Akan Di Hapus",
        callback : function(result){
            if(result==true){
                    $.ajax({
                    url : global_url + 'rawat-inap/hapus-perkembangan/',
                    data : "txtIdRekmedDetail="+txtIdRekmedDetail+"&intIdPerkembangan="+intIdPerkembangan,
                    type : "POST",
                    success : function(response) {
                        var data = jQuery.parseJSON(response);
                        var status = data['status'];
                        var message = data['message'];
                        alertPopUp(status , message, "");
                        getDataPerkembangan();
                    }
                });
            }
        } 
    });    
}

function hapusDataObat(intIdRekmedObat){
    bootbox.confirm({
        title : "Konfirmasi",
        message : "Apakah Data Akan Di Hapus",
        callback : function(result){
            if(result==true){
                    $.ajax({
                    url : global_url + 'rawat-inap/hapus-obat/',
                    data : "intIdRekmedObat="+intIdRekmedObat,
                    type : "POST",
                    success : function(response) {
                        var data = jQuery.parseJSON(response);
                        var status = data['status'];
                        var message = data['message'];
                        alertPopUp(status , message, "");
                        getDataPengobatan();
                    }
                });
            }
        } 
    });    
}

function hapusDataCairan(intIdRekmedCairan){
    bootbox.confirm({
        title : "Konfirmasi",
        message : "Apakah Data Akan Di Hapus",
        callback : function(result){
            if(result==true){
                    $.ajax({
                    url : global_url + 'rawat-inap/hapus-cairan/',
                    data : "intId="+intIdRekmedCairan,
                    type : "POST",
                    success : function(response) {
                        var data = jQuery.parseJSON(response);
                        var status = data['status'];
                        var message = data['message'];
                        alertPopUp(status , message, "");
                        getDataCairan();
                    }
                });
            }
        } 
    });    
}

function hapusDataTindakan(intIdRekmedTindakan){
     bootbox.confirm({
        title : "Konfirmasi",
        message : "Apakah Data Akan Di Hapus",
        callback : function(result){
            if(result==true){
                    $.ajax({
                    url : global_url + 'rawat-inap/hapus-tindakan/',
                    data : "intId="+intIdRekmedTindakan,
                    type : "POST",
                    success : function(response) {
                        var data = jQuery.parseJSON(response);
                        var status = data['status'];
                        var message = data['message'];
                        alertPopUp(status , message, "");
                        getDataTindakan();
                    }
                });
            }
        } 
    });    
}
function cetakAsuhan(){
    
    var urlDownload =  global_url +'rawat-inap/cetak-frm-asuhan/'+txtIdRekamMedisDetail;
   window.open(urlDownload,'_blank');
  }
  function cetakPerkembangan(){
    
    var urlDownload =  global_url +'rawat-inap/cetak-frm-perkembangan/'+txtIdRekamMedisDetail;
   window.open(urlDownload,'_blank');
  }
  function cetakPengobatan(){
    
    var urlDownload =  global_url +'rawat-inap/cetak-frm-pengobatan/'+txtIdRekamMedisDetail;
   window.open(urlDownload,'_blank');
  }
  
  function cetakCairan(){
    
    var urlDownload =  global_url +'rawat-inap/cetak-frm-cairan/'+txtIdRekamMedisDetail;
   window.open(urlDownload,'_blank');
  }
  function cetakTindakan(){
    
    var urlDownload =  global_url +'rawat-inap/cetak-frm-tindakan/'+txtIdRekamMedisDetail;
   window.open(urlDownload,'_blank');
  }
  function cetakLab(){
   var urlDownload =  global_url +'rawat-inap/cetak-frm-Lab/'+txtIdRekamMedisDetail+'/'+txtIdKunjungan;
   window.open(urlDownload,'_blank');
      
  }
  
  