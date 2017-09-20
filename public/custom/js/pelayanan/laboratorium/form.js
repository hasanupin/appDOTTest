var data_grid = "";
$(function(){
    var idKunjungan = $('input[name=txtIdKunjungan]').val();
    getDetailFormPeriksa(1);        
    $('#txtJenisPemeriksaan').change(function(){
        var idJenisPemeriksaan = $('#txtJenisPemeriksaan').val();
        getDetailFormPeriksa(idJenisPemeriksaan); 
    });

    $('#btnSimpanForm').click(function(){
        if($('#frm-jenis-periksa').valid()){
            saveFormPemeriksaaan();
        }
    });

    $('#selesaiPemeriksaan').click(function(){
        setPeriksaPoliSelesai();
    });
    
    data_grid = $('#tbl-detail-periksa').DataTable({
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
                d.txtIdKunjungan = idKunjungan;
            }
          }
    });
    
});

function getDetailFormPeriksa(idJenisPemeriksaan){
    $('#txtJenisPemeriksaan').val(idJenisPemeriksaan);
    $('input[name=intIdLaboratorium]').val("");
    $.ajax({
        url : global_url + "laboratorium/get-detail-frm-periksa/insert/"+idJenisPemeriksaan,
        success : function msg(res){
            $('#frm-input-periksa').html(res);
        }
    });
}

function hapusPemeriksaan(intIdLaboratorium){
    bootbox.confirm({
        title : "Peringatan", 
        message : "Apakah Anda Akan Menghapus Data Pemeriksaan Ini?",
        callback : function(result){
            if(result==true){
                $.ajax({
                url : global_url+"laboratorium/hapus-data-pemeriksaan/",
                type : "POST",
                data : "idLaboratorium="+intIdLaboratorium,
                success : function msg(res){
                    var data = jQuery.parseJSON(res);
                    var status = data['status'];
                    var message = data['message'];
                    alertPopUp(status,message,"");
                    data_grid.ajax.reload();
                } 
                });
            }
        }
    });
    
}

function saveFormPemeriksaaan(){
    $.ajax({
       url : global_url+"laboratorium/save-frm-jenis-pemeriksaan/",
       type : "POST",
       data : $('#frm-jenis-periksa').serialize() + "&" +$('#frm-detail-register').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var message = data['message'];
            var htmlMessage = alertMessage(message , status);
            $('#msg-lab-result').html(htmlMessage);
            getDetailFormPeriksa(1);
            data_grid.ajax.reload();
       }
    }); 
}

function getDetailPemeriksaan(intIdJenisPemeriksaan,idLaboratorium){
    $('#txtJenisPemeriksaan').val(intIdJenisPemeriksaan);
    $('input[name=intIdLaboratorium]').val(idLaboratorium);
    $.ajax({
       url : global_url + "laboratorium/get-detail-frm-periksa/detail/"+idLaboratorium,
       type : "POST",
       dataType : "html",
       success: function msg(res){
            $('#frm-input-periksa').html(res);
       }
    }); 
}

function setPeriksaPoliSelesai(){

    bootbox.confirm({
        title : "Peringatan",
        message : "Apakah Pemeriksaan Selesai ?",
        callback : function(result){
            if(result==true){
                var idRekamMedis = $('input[name=txtIdRekamMedis]').val();;
                var idDetailRekamMedis = "";
                var idKunjungan = $('input[name=txtIdKunjungan]').val();
                var idPelayanan = $('input[name=txtIdPelayanan]').val();
                $.ajax({
                    url : global_url+"loket/periksa-lab-selesai/",
                    type : "POST",
                    data : "idKunjungan="+idKunjungan,
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
                                    window.location = global_url+"laboratorium/"+idPelayanan+"/"
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
        }
    });
}

