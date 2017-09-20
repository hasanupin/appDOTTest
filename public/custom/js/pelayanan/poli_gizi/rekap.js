var data_grid = "";
$(function(){

    data_grid = $('#table-rekap').DataTable({
        "paging" : false,
        "lengthChange": false,
          "searching": false,
          "ordering": false,
          "processing" : true,
          "info": false,
          "autoWidth": false,
           ajax : {
           url : global_url+"poli_gizi/Rekapitulasi/getDataReportGizi/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.dtStart = $('#filterTanggalAwal').val();
                d.dtEnd = $('#filterTanggalAkhir').val();;
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
    var urlDownload = global_url + "poli_gizi/Rekapitulasi/downloadRekapPoliGizi/"+dtStart+"/"+dtEnd;
    window.open(urlDownload,'_blank');

});

