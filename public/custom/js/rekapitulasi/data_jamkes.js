var base_url_modul = global_url+'data-tindakan/';
var infoTable = "";
$( document ).ready(function(){
    var data_grid = $('#data-grid').DataTable({
          "paging": true,
          "lengthChange": true,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": true,
          "processing" : true,
          "serverSide": true,
          "aLengthMenu": [
                [25, 50, 100, 200, -1],
                [25, 50, 100, 200, "All"]
          ],
          "ajax" : {
            "url" : global_url+"mrekapitulasi/data_jamkes/getDataRekapLoket/",
            "type" : "POST",
            "data" : function (postParams) {
                 postParams.jamkes = $('#jamkes').val();
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
       // "locale" : 'id',
    });

    $('#btnExportExcel').click(function(){
        exportExcel();
    });
     $('#btnPrint').click(function(){
        print();
    });
    
});

function exportExcel(){
    var urlDownload = global_url+"mrekapitulasi/data_jamkes/downloadExcel/";
    var id_pelayanan = $('#cmbPoli').val();
    var jamkes = $('#jamkes').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var recordsTotal = infoTable.recordsTotal;
    var startRecord = infoTable.start;
    var endRecord = infoTable.length;

    if(recordsTotal > 0){
        var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date+"/"+jamkes+"/"+startRecord+"/"+endRecord; 
        window.open(linkDownload,'_blank');
    }
        
}
function print(){
    var urlDownload = global_url+"mrekapitulasi/data_jamkes/printOut/";
    var id_pelayanan = $('#cmbPoli').val();
    var jamkes = $('#jamkes').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var recordsTotal = infoTable.recordsTotal;
    var startRecord = infoTable.start;
    var endRecord = infoTable.length;

    if(recordsTotal > 0){
        var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date+"/"+jamkes+"/"+startRecord+"/"+endRecord; 
        window.open(linkDownload,'_blank');
    }
        
}