var base_url_modul = global_url+'data-penyakit/';
var infoTable = "";
$( document ).ready(function(){
     $('#frm_tidak_setuju').click(function(){
            if($('#frm_tidak_setuju').is(':checked')){
                 $('input[name=pernyataan]').val("0");
            }    
        });
        $('#frm_setuju').click(function(){
            if($('#frm_setuju').is(':checked')){
                 $('input[name=pernyataan]').val("1");
            }    
        });
    var data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": true,
          "processing" : true,
          "ajax" : {
            "url" : global_url+"mrekapitulasi/Rekapitulasi_rekap_data_tindakan/getRekapDataTindakan/",
            "type" : "POST",
            "data" : function (postParams) {
                postParams.id_pelayanan = $('#cmbPoli').val();
                postParams.start_date = $('#datepicker1').val();
                postParams.end_date = $('#datepicker2').val();
                postParams.pernyataan =  $('input[name=pernyataan]').val();
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
    var urlDownload = global_url+"rekapitulasi/downloadExcel/data-rekap-tindakan/";
    //var urlDownload = global_url+"mrekapitulasi/rekapitulasi_data_tindakan/downloadExcel/rekap-data-tindakan/";
    var id_pelayanan = $('#cmbPoli').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var pernyataan = $('input[name=pernyataan]').val();
    var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date+"/0/10/"+pernyataan; 
    window.open(linkDownload,'_blank');    
}