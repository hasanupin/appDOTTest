var data_grid = "";
$(function(){
     data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "processing" : true,
          "info": false,
          "autoWidth": false,
          ajax : {
            url : global_url+"e-absensi/retrieve-data-rekap/",
            type : "POST",
            data : function(p) {
                p.dtStart = $('#filterTanggalAwal').val();
                p.dtEnd = $('#filterTanggalAkhir').val();
            }
          }
    });
}); 

$('#sendBtn').click(function(){
    data_grid.ajax.reload();
});


$('#filterTanggalAwal').datepicker({
    format : 'yyyy-mm-dd',
    autoclose : true,
    
});
$('#filterTanggalAkhir').datepicker({
    format : 'yyyy-mm-dd',
    autoclose : true,
});

$('#downloadExcel').click(function(){

    var dtStart = $('#filterTanggalAwal').val();
    var dtEnd = $('#filterTanggalAkhir').val();
    var urlDownload = global_url + "e-absensi/download-excel-rekap/"+dtStart+"/"+dtEnd;
    window.open(urlDownload,'_blank');

});


