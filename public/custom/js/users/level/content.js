var base_url_modul = global_url+'level/';

$( document ).ready(function(){
    var data_grid = $('#table-data').DataTable({
          "paging": false,
          "lengthChange": true,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": true,
          serverSide: true,
          ajax : {
            url : base_url_modul+"retrieve-data/",
            type : "POST"
          }
    });
    
    $('#refreshBtn').click(function(){
        var url_post2 = base_url_modul+"retrieve-data/";
        data_grid.ajax.url(url_post2).load();
    });
});
