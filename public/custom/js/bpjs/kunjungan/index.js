var data_grid = "";
$(function () {
    data_grid = $('#table-data').DataTable({
        "paging": true,
        "ordering": false,
        ajax: {
            url: global_url + "bpjs/kunjungan/getDataKunjungan/",
            type: "POST",
            dataSrc: 'data',
            data: function (d) {
                d.tgl_awal = $('#tgl_awal').val();
                d.tgl_akhir = $('#tgl_akhir').val();
                d.intIdJenisPelayanan = $('#intIdJenisPelayanan').val();
                d.kdStatusPulang = $('#bitStatusPulang').val();
                d.bitStatusPelayanan = $('#bitStatusPelayanan').val();
            }
        }
    });

    $('#searchPeserta').click(function () {
        data_grid.ajax.reload();
    });

    $('.datepicker').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
    });

    $('#intIdJenisPelayanan').change(function () {
        var intIdJenisPelayanan = $('#intIdJenisPelayanan').val();
        $.ajax({
            url: global_url + 'bpjs/kunjungan/getStatusPulang/',
            type: "POST",
            data: "intIdPelayanan=" + intIdJenisPelayanan,
            success: function msg(response) {
                $('#bitStatusPulang').html(response);
                
            }
        });
    });
});

function uploadData(txtIdKunjungan , txtIdRekamMedisDetail) {

    $('#span-' + txtIdKunjungan).removeClass('label-danger').addClass('label-warning').html('<i class="fa fa-spinner fa-spin"></i> Sedang Di Upload');
    $.ajax({
        url: global_url + 'bpjs/kunjungan/uploadKunjungan/',
        type: "POST",
        data: "txtIdKunjungan=" + txtIdKunjungan + '&txtIdRekamMedisDetail='+txtIdRekamMedisDetail,
        success: function msg(response) {
            var data = jQuery.parseJSON(response);
            console.log(data);
            var status = data['status'];
            var message = data['message'];
            if (status == true) {
                $('#span-' + txtIdKunjungan).removeClass('label-warning').addClass('label-success').html('Terupload');
                $('#btn-edit-' + txtIdKunjungan).remove();
            } else {
                $('#span-' + txtIdKunjungan).removeClass('label-warning').addClass('label-danger').html('Belum Terupload');
            }
        }
    });
}

