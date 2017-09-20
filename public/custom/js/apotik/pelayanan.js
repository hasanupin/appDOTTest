var base_url_apotik = global_url+'apotik/';
var tanggal = $('#txtTanggal').val();
var data_grid3 = "";
$('.datepicker').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
    autoclose : true
});
var jenisApotik = $('input[name=JenisApotik]').val();
$( document ).ready(function(){
    var data_grid = $('#table-apotik-list1').DataTable({
          "paging": false,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_apotik+"get-data-register-apotik/",
            type : "POST",
            data : function(d){
                d.tanggal = $('#txtTanggal').val();
                d.jenisApotik = jenisApotik;
                d.status = "1";
            }
          }
    });
    
    var data_grid2 = $('#table-apotik-list2').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_apotik+"get-data-register-apotik/",
            type : "POST",
            data : function(d){
                d.tanggal = $('#txtTanggal').val();
                d.jenisApotik = jenisApotik;
                d.status = "2";
            }
          }
    });
    
    data_grid3 = $('#table-apotik-list3').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 50,
          serverSide: true,
          ajax : {
            url : base_url_apotik+"get-data-register-apotik/",
            type : "POST",
            data : function(d){
                d.tanggal = $('#txtTanggal').val();
                d.jenisApotik = jenisApotik;
                d.status = "3";
            }
            
          }
    });
    
    $('#getDataPasien').click(function(){
        data_grid.ajax.reload();
        data_grid2.ajax.reload();
        ////data_grid3.ajax.reload();
    });
    
    setInterval(function () {
        data_grid.ajax.reload();
        data_grid2.ajax.reload();
        ///data_grid3.ajax.reload();
    }, 5000);
});

function refreshTableDone(){
    data_grid3.ajax.reload();
}