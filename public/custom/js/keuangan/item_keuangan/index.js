$(function() {
    $('#dataTable').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'keuangan/item_keuangan/get',
            type : 'post'
        },
        columns : [
            {data : 'nama_item'},
            {data : 'jasa_sarana', class : 'text-right'},
            {data : 'jasa_pelayanan', class : 'text-right'},
            {data : 'tarif', class : 'text-right'},
            {data : 'txtNamaPegawai'},
            {data : 'updated_at'},
            {data : 'aktif', class : 'text-center'},
            {data : 'action', class: 'text-center', orderable : false}
        ]
    })
});