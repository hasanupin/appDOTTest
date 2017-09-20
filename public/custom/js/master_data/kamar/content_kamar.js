var base_url_modul = global_url+'master/kamar/';
var data_grid = "";

$( document ).ready(function() {
    data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": false,
          "processing": true,
           ajax : {
           url : base_url_modul+"getDataKamar/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.intIdKelasKamar = $('#intIdKelasKamar').val();
            }
          }
    });

    $('#refreshBtn').click(function(){
        data_grid.ajax.reload();
    });
    $('#searchBtn').click(function(){
        data_grid.ajax.reload();
    });
});

function hapusData(id) {
    //code
    var url_hapus = base_url_modul+"delete/";
    deleteProcess(url_hapus , id , base_url_modul,"");        
}