var base_url_modul = global_url+'grafik/data_penyakit/';
var bar = "";
$( document ).ready(function(){
    
   
    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });
  var data_grid = $('#table-data').DataTable({
          "paging": false,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": true,
          "processing" : true,
          "ajax" : {
            "url" : base_url_modul + 'getRekapDataPenyakit/',
            "type" : "POST",
            "data" : function (postParams) {
                postParams.cmbPoli = $('#cmbPoli').val();
                postParams.start_date = $('#datepicker1').val();
                postParams.end_date = $('#datepicker2').val();
            }
          }
    });
    
  $.ajax({
  url:base_url_modul + 'getDataPenyakitV2/',
  type : 'post',
  data:  $('#frm-penyakit').serialize(),         
  success:function(stat){
  var data = $.parseJSON(stat);
   bar = new Morris.Bar({
  element: 'data_penyakit',
  data: data,
  xkey: 'y',
  ykeys: ['a', 'b', 'c'],
  labels: ['Jenis Kasus Lama', 'Jenis Kasus Baru','Total'],
  parseTime: false
});
  /* Donut = new Morris.Donut({
    element: 'data_penyakit',
    data: data,
    hideHover: 'auto',
   
  });*/
  }
});
 $('#sendBtn').click(function(){
        updateDonat();
        data_grid.ajax.reload();
    });

});
function updateDonat(){
  $.ajax({
  url:base_url_modul + 'getDataPenyakitV2/',
  type : 'post',
  data:  $('#frm-penyakit').serialize(),         
  success:function(stat){
  var data = $.parseJSON(stat);
  bar.setData(data);
  }
});
  
 }


