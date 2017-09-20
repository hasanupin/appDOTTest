$(function() {

    $('#filterTanggal').datepicker({
        format : 'yyyy-mm-dd'
    });

    $('#btnTampilkan').click(function() {
        tableRiwayat.api().ajax.url(global_url + 'keuangan/rawat_inap/get/3?tanggal=' + $('#filterTanggal').val()).load();               
    });


	var tableDirawat = $('#tableDirawat').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'keuangan/rawat_inap/get/2',
            type : 'post'
        },
        columns : [
            {data : 'txtNoAnggota'},
            {data : 'txtNamaPasien'},
            {data : 'txtNamaJaminan'},
            {data : 'txtKamar'},    
            {data : 'dtTanggalKunjungan'},   
            {data : 'dtSelesaiKunjungan', visible : false},                                 
            {data : 'bitIsPoli'},                  
            {data : 'action', class: 'text-center', orderable : false}            
        ]
    });

    var tableRiwayat = $('#tableRiwayat').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'keuangan/rawat_inap/get/3?tanggal=' + $('#filterTanggal').val(),
            type : 'post'
        },
        columns : [
            {data : 'txtNoAnggota'},
            {data : 'txtNamaPasien'},
            {data : 'txtNamaJaminan'},
            {data : 'txtKamar'},    
            {data : 'dtTanggalKunjungan'}, 
            {data : 'dtSelesaiKunjungan'},                  
            {data : 'bitIsPoli'},                  
            {data : 'action', class: 'text-center', orderable : false}             
        ]
    });
});