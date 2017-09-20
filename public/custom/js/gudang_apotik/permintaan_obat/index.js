$(function() {
    $('#dataTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'gudang_apotik/permintaan_obat/get',
            type : 'post'
        },
        columns : [
            {data : 'tgl_permintaan'},
            {data : 'no_permintaan'},                        
            {data : 'disetujui_oleh'},
            {data : 'action', class: 'text-center', orderable : false}
        ]
    })
});