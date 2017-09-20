var data_grid = "";
$(function () {
    data_grid = $('#table-data').DataTable({
        "paging": true,
        ajax: {
            url: global_url + "bpjs/peserta/getDataPeserta/",
            type: "POST",
            dataSrc: 'data',
            data: function (d) {
                d.txtTanggal = $('#txtTanggal').val();
                d.intIdJenisPelayanan = $('#intIdJenisPelayanan').val();
                d.kunjSakit = $('#kunjSakit').val();
                d.bitStatus = $('#bitStatus').val();
            }
        }
    });

    $('#searchPeserta').click(function(){
        data_grid.ajax.reload();
    });

    $('#txtTanggal').datepicker({
        format : "yyyy-mm-dd"
    });
});

function uploadDataPendaftaran(txtIdKunjungan){

    $('#span-'+txtIdKunjungan).removeClass('label-danger').addClass('label-warning').html('<i class="fa fa-spinner fa-spin"></i> Sedang Di Upload');
    $.ajax({
        url : global_url + 'bpjs/peserta/uploadPendaftaran/',
        type : "POST",
        data : "txtIdKunjungan="+txtIdKunjungan,
        success : function msg(response){
            var data = jQuery.parseJSON(response);
            console.log(data);
            var status = data['status'];
            var message = data['message'];
            if(status==true){   
                $('#span-'+txtIdKunjungan).removeClass('label-warning').addClass('label-success').html('Terupload');
                $('#btn-edit-' + txtIdKunjungan).remove();
            }else{
                $('#span-'+txtIdKunjungan).removeClass('label-warning').addClass('label-danger').html('Belum Terupload');
            }
        }
    });
}

function updateBPJS(txtIdKunjungan){

}