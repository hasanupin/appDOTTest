$(function() {
    $('#dataTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'gudang_apotik/penerimaan/obat/get',
            type : 'post'
        },
        columns : [
            {data : 'tgl_penerimaan'},
            {data : 'no_penerimaan'},                        
            {data : 'action', class: 'text-center', orderable : false}
        ]
    })
});