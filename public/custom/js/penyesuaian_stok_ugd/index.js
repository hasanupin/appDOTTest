$(function() {
    $('#dataTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'apotik/ugd/penyesuaian/stok/get',
            type : 'post'
        },
        columns : [
            {data : 'tgl_penyesuaian'},
            {data : 'no_penyesuaian'},                    
            {data : 'action', class: 'text-center', orderable : false}
        ]
    })
});