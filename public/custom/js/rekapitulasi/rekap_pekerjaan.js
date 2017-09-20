var infoTable = "";
$( document ).ready(function(){
    var data_grid = $('#table-rekap-pekerjaan').DataTable({
           "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          
          "iDisplayLength": 20,
          "autoWidth": false,
          "processing" : true,
          "ajax" : {
            "url" : global_url+"mrekapitulasi/rekap_pekerjaan/getDataRekap/",
            "type" : "POST",
            "data" : function (postParams) {
                
                postParams.start_date = $('#datepicker1').val();
                postParams.end_date = $('#datepicker2').val();
                postParams.jenis = $('#jenis').val();
                postParams.id_pelayanan = $('#cmbPoli').val();
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
    var urlDownload = global_url+"mrekapitulasi/rekap_pekerjaan/downloadExcel/";
    var id_pelayanan = $('#cmbPoli').val();
     var jenis = $('#jenis').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var recordsTotal = infoTable.recordsTotal;

    if(recordsTotal > 0){
        var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date+"/"+jenis; 
        window.open(linkDownload,'_blank');
    }
        
}