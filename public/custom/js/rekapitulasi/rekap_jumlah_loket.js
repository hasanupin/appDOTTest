var infoTable = "";
$( document ).ready(function(){
    var data_grid = $('#data-grid').DataTable({
          "paging": false,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "processing" : true,
          "ajax" : {
            "url" : global_url+"mrekapitulasi/Rekapitulasi_jumlah_loket/getDataJumlahLoket/",
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
    var urlDownload = global_url+"mrekapitulasi/Rekapitulasi_jumlah_loket/downloadExcel/rekap-jumlah-loket/";
    var id_pelayanan = $('#cmbPoli').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var recordsTotal = infoTable.recordsTotal;

    if(recordsTotal > 0){
        var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date; 
        window.open(linkDownload,'_blank');
    }
        
}