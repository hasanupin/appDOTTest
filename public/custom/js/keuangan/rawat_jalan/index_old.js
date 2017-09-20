$(function() {

    getUangMasuk();

	$('#filterTanggalAwal').datepicker({
		format : 'yyyy-mm-dd'
	});

    $('#filterTanggalAkhir').datepicker({
        format : 'yyyy-mm-dd'
    });

	$('#btnTampilkan').click(function() {
		tableAntrian.api().ajax.url(global_url + 'keuangan/rawat_jalan/get/1?tanggal_awal=' + $('#filterTanggalAwal').val() + '&tanggal_akhir=' + $('#filterTanggalAkhir').val()).load();
		tableDiLayani.api().ajax.url(global_url + 'keuangan/rawat_jalan/get/2?tanggal_awal=' + $('#filterTanggalAwal').val() + '&tanggal_akhir=' + $('#filterTanggalAkhir').val()).load();
		tableSelesai.api().ajax.url(global_url + 'keuangan/rawat_jalan/get/3?tanggal_awal=' + $('#filterTanggalAwal').val() + '&tanggal_akhir=' + $('#filterTanggalAkhir').val()).load();
        getUangMasuk();
	});

	var tableAntrian = $('#tableAntrian').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'keuangan/rawat_jalan/get/1?tanggal_awal=' + $('#filterTanggalAwal').val() + '&tanggal_akhir=' + $('#filterTanggalAkhir').val(),
            type : 'post'
        },
        columns : [
            {data : 'intNoAntri'},
            {data : 'txtNamaPasien'},
            {data : 'txtNamaPelayanan'},
            {data : 'txtUsiaPasienKunjungan'},                  
            {data : 'action', class: 'text-center', orderable : false}            
        ]
    });

    var tableDiLayani = $('#tableDiLayani').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'keuangan/rawat_jalan/get/2?tanggal_awal=' + $('#filterTanggalAwal').val() + '&tanggal_akhir=' + $('#filterTanggalAkhir').val(),
            type : 'post'
        },
        columns : [
            {data : 'intNoAntri'},
            {data : 'txtNamaPasien'},
            {data : 'txtNamaPelayanan'},
            {data : 'txtUsiaPasienKunjungan'},                           
            {data : 'action', class: 'text-center', orderable : false}            
        ]
    });

    var tableSelesai = $('#tableSelesai').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'keuangan/rawat_jalan/get/3?tanggal_awal=' + $('#filterTanggalAwal').val() + '&tanggal_akhir=' + $('#filterTanggalAkhir').val(),
            type : 'post'
        },
        columns : [
            {data : 'intNoAntri'},
            {data : 'txtNamaPasien'},
            {data : 'txtNamaPelayanan'},
            {data : 'txtUsiaPasienKunjungan'},     
            {data : 'total_tagihan', class : 'text-right'},        
            {data : 'txtNamaPegawai'},
            {data : 'action', class: 'text-center', orderable : false}            
        ]
    });

});

function getUangMasuk() {
    $.ajax({
        url : global_url + 'keuangan/rawat_jalan/get_panel?tanggal_awal=' + $('#filterTanggalAwal').val() + '&tanggal_akhir=' + $('#filterTanggalAkhir').val(),
        success : function(response) {
            $('#antrian_hari_ini').html(response['antrian_hari_ini']);
            $('#uang_masuk_hari_ini').html(toCurrency(response['uang_masuk_hari_ini']));
        }
    })
}