var base_url_rekmed = global_url+'rekam-medis/';

$( document ).ready(function(){
    var data_grid = $('#table-rekam-medis').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_rekmed+"get-rekam-medis/",
            type : "POST"
          }
    });
    
    $('#searchPasien').click(function(){
        var searchKey = $('#id_pasien').val();
        var url_post = base_url_rekmed+"get-rekam-medis/"+searchKey;
        data_grid.ajax.url(url_post).load();
    });
    
    $('#refreshPasien').click(function(){
        var url_post2 = base_url_rekmed+"get-rekam-medis/";
        data_grid.ajax.url(url_post2).load();
    });
});