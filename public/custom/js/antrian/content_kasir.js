var data_grid = "";
var data_grid_inap = "";
$(function(){
     data_grid = $('#table-antrian').DataTable({
          "paging": false,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": false,
          "processing": true,
           ajax : {
           url : global_url+"antrian/getDataKasir",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.txtTanggal = $('#txtTanggal').val();
                
            }
          }
    });

    $('#txtTanggal').change(function(){
        data_grid.ajax.reload();
    });

    $('#txtTanggal').datepicker({
        autoclose : 'true',
        format : "yyyy-mm-dd"
    });

    setInterval(function () {
        data_grid.ajax.reload();
    }, 5000);
});