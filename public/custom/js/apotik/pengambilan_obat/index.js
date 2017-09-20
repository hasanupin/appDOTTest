$(function() {
    $('#dataTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'apotik/pengambilan_obat/get',
            type : 'post'
        },
        columns : [
            {data : 'tgl_pengambilan'},
            {data : 'no_pengambilan'},
            {data : 'nama_desa'},
            {data : 'diterima_oleh'},
            {data : 'action', class: 'text-center', orderable : false}
        ]
    })
});