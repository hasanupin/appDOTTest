var base_url_modul = global_url+'kunjungan-rawat-inap/';
var infoTable = "";
$( document ).ready(function(){
    var data_grid = $('#table-jumlah-jaminan-rawat-inap').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          
          "ajax" : {
            "url" : global_url+"mrekapitulasi/jaminan_rawat_inap/getData",
            "type" : "POST",
            "data" : function (postParams) {
                postParams.kamar = $('#kamar').val();
                postParams.date1 = $('#datepicker1').val();
                postParams.date2 = $('#datepicker2').val();
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
    var urlDownload = global_url+"mrekapitulasi/jaminan_rawat_inap/downloadExcel/";
    var kamar = $('#kamar').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var recordsTotal = infoTable.recordsTotal;
    var startRecord = infoTable.start;
    var endRecord = infoTable.length;

    if(recordsTotal > 0){
        var linkDownload = urlDownload+kamar+"/"+start_date+"/"+end_date+"/"+startRecord+"/"+endRecord; 
        window.open(linkDownload,'_blank');
        
    }
        
}