$(function() {
    $('#preview').click(function() {        
        dtTable.api().ajax.url(global_url + 'laporan/obat/get_permintaan_pemakaian?draw=draw&periode='+$('#tahun').val()+'-'+$('#bulan').val()+'&apotik='+$('#apotik').val()+'&jenis_obat='+$('#jenis_obat').val()).load();
    });

    var dtTable = $('#dtTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'laporan/obat/get_permintaan_pemakaian',
            type : 'post'
        },
        columns : [
            {data : 'nama_obat'},            
            {data : 'kemasan', orderable : false},            
            {data : 'stok_awal', orderable : false},
            {data : 'penerimaan', orderable : false},
            {data : 'persediaan', orderable : false},
            {data : 'pemakaian', orderable : false},
            {data : 'sisa_stok', orderable : false}            
        ],
    });
});