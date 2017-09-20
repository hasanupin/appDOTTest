$(function() {
    $('#btnCari').click(function() {        
        dataTable.api().ajax.url(global_url+'apotik/'+$('#dataTable').data('apotik')+'/obat/get?jenis_obat=' + $('#filter_jenis_obat').val() + '&nama=' + $('#filter_nama_obat').val()).load();
    });
    var dataTable = $('#dataTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'apotik/'+$('#dataTable').data('apotik')+'/obat/get',
            type : 'post'
        },
        columns : [
            {data : 'nama_obat'},
            {data : 'kode_obat'},
            {data : 'kemasan'},
            {data : 'jenis_obat'},
            {data : 'stok_apotik', class : 'text-center'}                     
        ]
    })
});