var base_url = global_url+"poli_gizi/diagnosa/";
var data_grid = "";

$(function(){


    $('#form-diagnosa-gizi').validate({
        ignore : "",
        rules : {
            "txtKodeDiagnosa" : {
                required : true,
            },
            "txtDiagnosaGizi" : {
                required : true,
            }
        }
    });

    data_grid = $('#table-data').DataTable({
        "searching": false,
        "ordering": false,
        "paging" : false,
        "processing": true,
        ajax : {
           url : global_url+"poli_gizi/Diagnosa/getData/",
           type : "POST",
           dataSrc: 'data'
          }
    });

    $('#btnSaveDiagnosa').click(function(){
        if($('#form-diagnosa-gizi').valid()){
            saveDiagnosaGizi();
        }
    });
});

function saveDiagnosaGizi(){
    $.ajax({
        url : base_url + 'insert/',
        data : $('#form-diagnosa-gizi').serialize(),
        method : "POST",
        success : function msg(response){
            var data = jQuery.parseJSON(response);
            var status = data['status'];
            var message = data['message'];
            alertRedirect(status,message , "");
            data_grid.ajax.reload();
            $('#form-diagnosa-gizi')[0].reset();
            $('input[name=intIdDiagnosaGizi]').val("");
        }

    });
}

function detailDiagnosa(id){
    $.ajax({
        url : base_url + 'detail/',
        data : "id="+id,
        method : "POST",
        success : function msg(response){
            var data = jQuery.parseJSON(response);
            $('input[name=intIdDiagnosaGizi]').val(data['intIdDiagnosaGizi']);
            $('input[name=txtKodeDiagnosa]').val(data['txtKodeDiagnosa']);
            $('input[name=txtDiagnosaGizi]').val(data['txtDiagnosaGizi']);
            
        }
    });
}

function deleteDiagnosa(id){
    bootbox.confirm({
        title : "Peringatan",
        message : "Apakah Data Akan Di Hapus",
        callback : function message(result){
            console.log(result);
            if(result==true){
                hapusDiagnosa(id);
            }
        }
    });
}

function hapusDiagnosa(id){
    $.ajax({
        url : base_url + 'delete/',
        data : "id="+id,
        method : "POST",
        success : function msg(response){
            var data = jQuery.parseJSON(response);
            alertRedirect(data['status'] , data['message'] , "");
            data_grid.ajax.reload();
            
        }
    });
}
