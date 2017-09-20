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
           url : global_url+"antrian/getDataRawatInap",
           type : "POST",
           dataSrc: 'data',
          }
    });

    setInterval(function () {
        data_grid.ajax.reload();
    }, 5000);
});