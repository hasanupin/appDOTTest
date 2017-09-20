$('.datepicker').datepicker({
	format : 'yyyy-mm-dd'
});

var datatable = $('#datatable').dataTable({
    processing : true,
    serverSide : true,
    ajax : {
        url : global_url + 'laporan/keuangan/get_transaksi',
        type : 'post'
    },
    columns : [
        {data : 'tanggal'},
        {data : 'nama_item'},
        {data : 'txtNamaJaminan'},
        {data : 'txtNamaPegawai'},                  
        {data : 'total', class: 'text-right'}            
    ]
});