var base_url_register = global_url+'loket/';
var base_url_poli = global_url+'pelayanan/rawat-inap/';
var data_grid = "";

$(function(){
    data_grid = $('#table-registration').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": false,
          "processing": true,
           ajax : {
           url : base_url_register+"getDataRegisterRawatInap/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.intPoli = $('input[name=inputIdPoli]').val();
                d.dtTanggal = $('#txtTanggal').val();
                
            }
          }
    });

    $('#btnRegister').click(function(){
        data_grid.ajax.reload();
    });

    $('#txtTanggal').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
        autoclose : true
    });
});