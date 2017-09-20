var line = "";
var base_url_modul = global_url+'grafik/jumlah_kunjungan/';
$( document ).ready(function(){
    
   

    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });
  var data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": true,
          "processing" : true,
          "ajax" : {
            "url" : base_url_modul + 'getRekapData/',
            "type" : "POST",
            "data" : function (postParams) {
                postParams.id_pelayanan = $('#cmbPoli').val();
                postParams.start_date = $('#datepicker1').val();
                postParams.end_date = $('#datepicker2').val();
            }
          }
    });
    
	$.ajax({
  url:base_url_modul + 'getDataRekapJumlahPengunjung/',
  type : 'post',
  data:  $('#frm-rekap-pengunjung').serialize(),          
  success:function(stat){
  var data = $.parseJSON(stat);
  line = new Morris.Line({
    element: 'jumlah_kunjungan',
    data: data.data,
      xkey: 'x',
      ykeys: data.label,
      labels: data.label,
      hideHover : 'auto',
      
      
            
  });
  }
});
 $('#sendBtn').click(function(){
        refreshLine();
        data_grid.ajax.reload();
    });
});

function refreshLine(){
    $.ajax({
  url:base_url_modul + 'getDataRekapJumlahPengunjung/',
  type : 'post',
  data:  $('#frm-rekap-pengunjung').serialize(),          
   success:function(stat){
  var data = $.parseJSON(stat);
  
  line.setData(data.data);
 }
});
 
 }
