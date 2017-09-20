var infoTable = "";
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
            "url" : global_url+"mrekapitulasi/rekapitulasi_pasien_rujukan/getDataPasienRujukan/",
            "type" : "POST",
            "data" : function (postParams) {
                postParams.start_date = $('#datepicker1').val();
                postParams.end_date = $('#datepicker2').val();
            }
          }
    });
    
    $('#sendBtn').click(function(){
        data_grid.ajax.reload();
        infoTable = data_grid.page.info();
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

function exportExcel(){
    var urlDownload = global_url+"mrekapitulasi/rekapitulasi_pasien_rujukan/downloadExcel/rekap-pasien-rujukan/";
    var id_pelayanan = 0;
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date; 
    window.open(linkDownload,'_blank');
}