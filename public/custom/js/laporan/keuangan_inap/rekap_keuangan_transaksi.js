$(function() {
    $('.datepicker').datepicker({
    	format : 'yyyy-mm-dd'
    });

    $('#preview').click(function() {        
        dtTable.api().ajax.url(global_url + 'laporan/keuangan_inap/get_rekap_keuangan_transaksi?draw=draw&tgl_awal='+$('#tgl_awal').val()+'&tgl_akhir='+$('#tgl_akhir').val()).load();
    });

    var dtTable = $('#dtTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'laporan/keuangan_inap/get_rekap_keuangan_transaksi',
            type : 'post'
        },
        columns : [
            {data : 'nama_item'},            
            {data : 'total', class: 'text-right'}            
        ]
    });
});