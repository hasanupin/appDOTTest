var base_url_modul = global_url+'data-penyakit/';
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
            "url" : global_url+"mrekapitulasi/rekapitulasi_data_tindakan/getRekapDataTindakan/",
            "type" : "POST",
            "data" : function (postParams) {
                postParams.id_pelayanan = $('#cmbPoli').val();
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
    var urlDownload = global_url+"rekapitulasi/downloadExcel/rekap-data-tindakan/";
    //var urlDownload = global_url+"mrekapitulasi/rekapitulasi_data_tindakan/downloadExcel/rekap-data-tindakan/";
    var id_pelayanan = $('#cmbPoli').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date; 
    window.open(linkDownload,'_blank');    
}