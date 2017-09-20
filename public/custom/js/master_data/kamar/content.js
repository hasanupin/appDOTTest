var base_url_modul = global_url+'master/kelas_kamar/';

$( document ).ready(function(){
    var data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
    });
    
});

function hapusData(id) {
    //code
    var url_hapus = base_url_modul+"delete/";
    deleteProcess(url_hapus , id , base_url_modul,"");        
}