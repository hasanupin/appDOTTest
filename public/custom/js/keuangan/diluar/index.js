$(function() {

    getUangMasuk();

	$('#filterTanggal').datepicker({
		format : 'yyyy-mm-dd'
	});

	$('#btnTampilkan').click(function() {
		tableKeuangan.api().ajax.url(global_url + 'keuangan/diluar/get?tanggal=' + $('#filterTanggal').val()).load();		
        getUangMasuk();
	});

	var tableKeuangan = $('#tableKeuangan').dataTable({
        processing : true,
        serverSide : true,
        ajax : {
            url : global_url + 'keuangan/diluar/get?tanggal=' + $('#filterTanggal').val(),
            type : 'post'
        },
        columns : [
            {data : 'no_bukti'},
            {data : 'tanggal'},
            {data : 'txtNamaPegawai'},
            {data : 'total', class : 'text-right'},            
            {data : 'action', class: 'text-center', orderable : false}            
        ]
    });

    function getUangMasuk() {
        $.ajax({
            url : global_url + 'keuangan/diluar/get_uang_masuk?tanggal=' + $('#filterTanggal').val(),
            success : function(response) {                
                $('#uang_masuk_hari_ini').html(toCurrency(response['uang_masuk_hari_ini']));
            }
        })
    }

});

function cetakBuktiBayar(idBuktiBayar){

    $.ajax({
        url : global_url + 'printpage/printInvoiceDiluar/',
        type : "POST",
        data : "idBuktiBayar="+idBuktiBayar,
        dataType : "html",
        success : function(response){

        }
    });

}