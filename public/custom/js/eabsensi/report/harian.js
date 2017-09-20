var data_grid = "";
$(function(){
     data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": true,
          "searching": false,
          "ordering": false,
          "processing" : true,
          "info": false,
          "autoWidth": false,
          ajax : {
            url : global_url+"e-absensi/retrieve-data-harian/",
            type : "POST",
            data : function(p) {
                p.dtSend = $('#filterTanggalAwal').val();
                
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

$('#downloadExcel').click(function(){
    var dtSend = $('#filterTanggalAwal').val();;
    var urlDownload = global_url + "e-absensi/download-excel-harian/"+dtSend;
    window.open(urlDownload,'_blank');
});
