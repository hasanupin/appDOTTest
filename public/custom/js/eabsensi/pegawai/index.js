var base_url_modul = global_url+'e-absensi/pegawai/';

$( document ).ready(function(){
    var data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_modul+"retrieve-data/",
            type : "POST",

          }
    });
    
    $('#searchBtn').click(function(){
        var searchKey = $('#searchText').val();
        data_grid.ajax.reload();
    });
    
    $('#refreshBtn').click(function(){
        var url_post2 = base_url_modul+"retrieve-data/";
        data_grid.ajax.reload();
    });
});

function hapusData(id) {
    //code
    var r = confirm("Apakah Data Akan Di Hapus??");
    if (r==true) {
        //code
        var url_hapus = base_url_modul+"delete/";
        deleteRedirect(url_hapus , id , base_url_modul);
    }
    
}