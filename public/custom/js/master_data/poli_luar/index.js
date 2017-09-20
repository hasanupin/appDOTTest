var base_url_form = global_url+'data-poli-luar/';
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

function getDetail(intIDPoliLuar){

    $.ajax({
        url :  base_url_form + 'detail',
        type : "POST",
        data : "intIDPoliLuar=" + intIDPoliLuar,
        success : function msg(result){
            var data = jQuery.parseJSON(result);
            $('input[name=intIDPoliLuar]').val(data['intIDPoliLuar']);
            $('#txtPoliLuar').val(data['txtPoliLuar']);
            $('#txtKeterangan').val(data['txtKeterangan']);
            $('#bitStatus').val(data['bitStatus']);
            $('#form-head').html("Edit Data Poli Luar");
        }
    });
}

function deleteDetail(intIDPoliLuar){
    bootbox.confirm({
        size : "small",
        title : "Konfirmasi",
        message : "Apakah Data Akan Di Hapus?",
        callback : function(response){
            if(response==true){
                window.location = base_url_form+'hapus/'+intIDPoliLuar; 
            }
            
        }
    });
}

