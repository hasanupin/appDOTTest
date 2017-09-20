var base_url_modul = global_url+'data-tindakan/';
var infoTable = "";
$( document ).ready(function(){
    var data_grid = $('#table-data-laporan').DataTable({
          "paging": false,
          "lengthChange": false,
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
            "url" : global_url+"laporan/data_penyakit/getDataLaporan/",
            "type" : "POST",
            "data" : function (postParams) {
                postParams.id_pelayanan = $('#cmbPoli').val();
                postParams.bulan = $('#cmbBulan').val();
                postParams.tahun = $('#cmbTahun').val();
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

    $('#btnExportExcel').click(function(){
        exportExcel();
    });
    
});

function exportExcel(){
    var urlDownload = global_url+"laporan/data-kesakitan/download/";
    var id_pelayanan = $('#cmbPoli').val();
    var id_bulan = $('#cmbBulan').val();
    var id_tahun = $('#cmbTahun').val();
    var recordsTotal = infoTable.recordsTotal;
    if(recordsTotal > 0){
        var linkDownload = urlDownload+id_pelayanan+"/"+id_bulan+"/"+id_tahun; 
        window.open(linkDownload,'_blank');
        
    }
        
}