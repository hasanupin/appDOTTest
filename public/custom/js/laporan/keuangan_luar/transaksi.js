$(function() {
    $('.datepicker').datepicker({
    	format : 'yyyy-mm-dd'
    });

    $('#preview').click(function() {        
        dtTable.api().ajax.url(global_url + 'laporan/keuangan_luar/get_transaksi?draw=draw&tgl_awal='+$('#tgl_awal').val()+'&tgl_akhir='+$('#tgl_akhir').val()).load();
    });

    var dtTable = $('#dtTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'laporan/keuangan_luar/get_transaksi',
            type : 'post'
        },
        columns : [
            {data : 'tanggal'},
            {data : 'no_bukti'},
            {data : 'nama_item'},
            {data : 'txtNamaPegawai'},                  
            {data : 'total', class: 'text-right'}            
        ]
    });
});