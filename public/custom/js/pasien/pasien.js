var base_url_pasien = global_url+'pasien/';

$( document ).ready(function(){
    var data_grid = $('#table-data-pasien').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_pasien+"get-data-pasien/",
            type : "POST"
          }
    });
    
    $('#searchPasien').click(function(){
        var searchKey = $('#id_pasien').val();
        var url_post = base_url_pasien+"get-data-pasien/"+searchKey;
        data_grid.ajax.url(url_post).load();
    });
    
    $('#refreshPasien').click(function(){
        var url_post2 = base_url_pasien+"get-data-pasien/";
        data_grid.ajax.url(url_post2).load();
    });
});