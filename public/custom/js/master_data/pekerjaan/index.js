var base_url_form = global_url+'data-pekerjaan/';
var data_grid = "";

$(function(){
    data_grid = $('#table-data').DataTable({
        processing : true,
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: false,
    });
});

function getDetail(id_pekerjaan){

    $.ajax({
        url :  base_url_form + 'detail',
        type : "POST",
        data : "id_pekerjaan=" + id_pekerjaan,
        success : function msg(result){
            var data = jQuery.parseJSON(result);
            $('input[name=id_pekerjaan]').val(data['id_pekerjaan']);
            $('#jenis_pekerjaan').val(data['jenis_pekerjaan']);
            $('#pekerjaan').val(data['pekerjaan']);
            
            $('#form-head').html("Edit Data Pekerjaan");
        }
    });
}

function deleteDetail(id_pekerjaan){
    bootbox.confirm({
        size : "small",
        title : "Konfirmasi",
        message : "Apakah Data Akan Di Hapus?",
        callback : function(response){
            if(response==true){
                window.location = base_url_form+'hapus/'+id_pekerjaan; 
            }
            
        }
    });
}

