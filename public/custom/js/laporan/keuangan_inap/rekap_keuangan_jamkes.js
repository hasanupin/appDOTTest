$(function() {
    $('.datepicker').datepicker({
    	format : 'yyyy-mm-dd'
    });

    $('#preview').click(function() {        
        dtTable.api().ajax.url(global_url + 'laporan/keuangan_inap/get_rekap_keuangan_jamkes?draw=draw&tgl_awal='+$('#tgl_awal').val()+'&tgl_akhir='+$('#tgl_akhir').val()).load();
    });

    var dtTable = $('#dtTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'laporan/keuangan_inap/get_rekap_keuangan_jamkes',
            type : 'post'
        },
        columns : [
            {data : 'txtNamaJaminan'},            
            {data : 'total', class: 'text-right'}            
        ]
    });
});