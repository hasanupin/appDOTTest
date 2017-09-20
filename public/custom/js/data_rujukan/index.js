var data_grid = "";

$( document ).ready(function(){
    var data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": true,
          "processing" : true,
          "ajax" : {
            "url" : global_url+"data_rujukan/getDataRujukan/",
            "type" : "POST",
            "data" : function (postParams) {
                postParams.start_date = $('#filterTanggalAwal').val();
                postParams.end_date = $('#filterTanggalAkhir').val();
                postParams.id_pelayanan = $('#intIdPelayanan').val();
            }
          }
    });
    
    $('#searchBtn').click(function(){
        data_grid.ajax.reload();
    });

    data_grid.on('draw.dt', function () {
        ///console.log( 'Redraw occurred at: '+new Date().getTime() );
        infoTable = data_grid.page.info();
    });

    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });

    $('#btnExportExcel').click(function(){
        exportExcel();
    });
    
});
