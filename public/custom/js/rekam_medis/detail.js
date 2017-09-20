var base_url_rekmed = global_url+'rekam-medis/';
var base_url_detail_rekmed = base_url_rekmed+"get-detail-poli-umum/";
var base_url_detail_rekmed_inap = base_url_rekmed+"get-detail-rawat-inap/";
var data_grid = "";
var data_grid2 = "";
var data_grid3 = "";
$( document ).ready(function(){
    var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
    var inputIdPasien = $('input[name=inputIdPasien]').val();
    data_grid = $('#table-rekam-medis').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 5,
          serverSide: true,
          ajax : {
            url : base_url_detail_rekmed+idRekamMedis,
            type : "POST"
          }
    });
    data_grid2 = $('#table-rekam-medis-inap').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_detail_rekmed_inap+idRekamMedis,
            type : "POST"
          }
    });

    data_grid3 = $('#table-lab').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "serverSide" : true,
           ajax : {
           url : global_url+"laboratorium/getDetailPemeriksaanByPasien/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.txtIdPasien = inputIdPasien;
            }
          }
    });
});