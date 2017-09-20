var base_url_dashboard = global_url+'dashboard/';
$( document ).ready(function() {
   getDataRegister();
   setInterval(function () {
        getDataRegister();
    }, 10000);
   setInterval(function () {
      getClock();
    }, 1000);
 $.ajax({
  url:base_url_dashboard + 'getDataPenyakit/',
  type : 'post',
  data:  $('#frm-penyakit').serialize(),         
  success:function(stat){
  var data = $.parseJSON(stat);
   Donut = new Morris.Donut({
    element: 'data_penyakit',
    data: data,
    hideHover: 'auto',
   
  });
  }
});

	$.ajax({
  url:base_url_dashboard + 'getDataRekapJumlahPengunjung/',
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
     fillOpacity: 0.6,
      hideHover: 'auto',
      behaveLikeLine: true,
      resize: true,
     parseTime:false,
      pointStrokeColors: ['black'],
      continuousLine: true,
      
            
  });
  }
});
});


function getDataRegister() {
   $.ajax({
       url : base_url_dashboard+"getDataKunjungan/",
       type : "POST",
       data : "",
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
				//Harian
				if  (data['jumlah_pengunjung_harian'] != 0)
				{           
					var html_harian = "<div class='row'>";
					for (i=0; i<data['pengunjung_harian'].length; i++){
						html_harian += "<span class='col-sm-8' style='text-align:left;text-transform:capitalize;'>"
						+" <i class='fa fa-caret-right' style='margin: 0 5px'> </i>"
						+data['pengunjung_harian'][i]['nama']+"</span>"
						+"<span class='col-sm-4'>: <b>"+data['pengunjung_harian'][i]['jumlah']+"</b></span>";
					}
					html_harian += "</div>";
					$('#detil_harian').html(html_harian);
				}else{
					$('#detil_harian').html('Tidak ada data kunjungan');
				}
				$('#kunjungan-harian').html(data['jumlah_pengunjung_harian']);

				//Mingguan
				if  (data['pengunjung_mingguan'] != 0)
				{           
					var html_mingguan = "<div class='row'>";
					for (i=0; i<data['pengunjung_mingguan'].length; i++){
						html_mingguan += "<span class='col-sm-8' style='text-align:left;text-transform:capitalize;'>"
						+" <i class='fa fa-caret-right' style='margin: 0 5px'> </i>"
						+data['pengunjung_mingguan'][i]['nama']+"</span>"
						+"<span class='col-sm-4'>: <b>"+data['pengunjung_mingguan'][i]['jumlah']+"</b></span>";
				}
					html_mingguan += "</div>";
					$('#detil_mingguan').html(html_mingguan);	
				}else{
					$('#detil_mingguan').html('Tidak ada data kunjungan');
				}
				$('#kunjungan-mingguan').html(data['jumlah_pengunjung_mingguan']);
				
				//Bulanan
				if  (data['pengunjung_bulanan'] != 0)
				{           
					var html_bulanan = "<div class='row'>";
					for (i=0; i<data['pengunjung_bulanan'].length; i++){
						html_bulanan += "<span class='col-sm-8' style='text-align:left;text-transform:capitalize;'>"
						+" <i class='fa fa-caret-right' style='margin: 0 5px'> </i>"
						+data['pengunjung_bulanan'][i]['nama']+"</span>"
						+"<span class='col-sm-4'>: <b>"+data['pengunjung_bulanan'][i]['jumlah']+"</b></span>";
					}
					html_bulanan += "</div>";
					$('#detil_bulanan').html(html_bulanan);	
				}else{
					$('#detil_bulanan').html('Tidak ada data kunjungan');
				}
				$('#kunjungan-bulanan').html(data['jumlah_pengunjung_bulanan']);

				//Grafik
                $('#kunjungan-bulanan').html(data['jumlah_pengunjung_bulanan']);
                //$('#kunjungan-harian').html(data['jumlah_sudah']);
                //generateToTable(dataResult);
            //}
       }
    }); 
};

function getClock() {
    //code
    var jam_sekarang = getTimeClock();
	var tanggal_sekarang = getTimeClock();
    $('#jam-sekarang').html(jam_sekarang);
    $('#tanggal-sekarang').html(tanggal_sekarang);
}

