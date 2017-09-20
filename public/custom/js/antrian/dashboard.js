var base_url_dashboard = global_url+'dashboard/';
var base_url_register = global_url+'antrian/';
$( document ).ready(function() {
   setInterval(function () {
      getClock();
        
    }, 1000);
    setInterval(function () {
        getDataAntrian("kunjungan_umum_1" , "waiting_list_umum_1" , 1);
        getDataAntrian("kunjungan_umum_2" , "waiting_list_umum_2" , 10);
        getDataAntrian("kunjungan_gigi" , "waiting_list_gigi" , 3);
        getDataAntrian("kunjungan_ibu" , "waiting_list_ibu" , 5);
        getDataAntrian("kunjungan_anak" , "waiting_list_anak" , 4);
        getDataAntrian("kunjungan_gizi" , "waiting_list_gizi" , 9);
        getDataAntrian("kunjungan_lab" , "waiting_lab" , 7);
        getDataAntrianApotik("kunjungan_apotik" , "waiting_list_apotik");
        getTotalAntrianMenunggu();
        getTotalKunjungan();
        getDataRegister();
    }, 5000);
});

function getClock() {
    //code
    var jam_sekarang = getTimeClock();
	var tanggal_sekarang = getTimeClock();
    $('#jam-sekarang').html(jam_sekarang);
    $('#tanggal-sekarang').html(tanggal_sekarang);
}

function getDataAntrian(idNoAntrian , idJumlahAntrian, intIdPoli){
    var dateAntrian = $('input[name=date]').val();
    $.ajax({
            url : global_url + 'antrian/getDashboardAntrian/',
            data : "date="+dateAntrian+"&poli="+intIdPoli,
            type : "POST",
            success : function(response) {
                var data = jQuery.parseJSON(response);
                var jumlahTunggu = data['jumlah_tunggu'];
                var noAntrianDiLayani = data['no_antrian_dilayani'];
                $('#'+idNoAntrian).html(noAntrianDiLayani);
                $('#'+idJumlahAntrian).html(jumlahTunggu);
        }
    });
}

function getDataAntrianApotik(idNoAntrian , idJumlahAntrian){
    var dateAntrian = $('input[name=date]').val();
    $.ajax({
            url : global_url + 'antrian/getDashboardAntrianApotik/',
            data : "date="+dateAntrian,
            type : "POST",
            success : function(response) {
                var data = jQuery.parseJSON(response);
                var jumlahTunggu = data['jumlah_tunggu'];
                var noAntrianDiLayani = data['no_antrian_dilayani'];
                $('#'+idNoAntrian).html(noAntrianDiLayani);
                $('#'+idJumlahAntrian).html(jumlahTunggu);
        }
    });
}

function getTotalKunjungan(){
    var dateAntrian = $('input[name=date]').val();
    $.ajax({
            url : global_url + 'antrian/getTotalKunjungan/',
            data : "date="+dateAntrian,
            type : "POST",
            success : function(response) {
                var data = jQuery.parseJSON(response);
                var jumlahAngka = data['jumlah_dilayani'];
                $('#kunjungan-total').html(jumlahAngka);
        }
    });
}

function getTotalAntrianMenunggu(){
    var dateAntrian = $('input[name=date]').val();
    $.ajax({
            url : global_url + 'antrian/getDashboardAntrian/',
            data : "date="+dateAntrian,
            type : "POST",
            success : function(response) {
                var data = jQuery.parseJSON(response);
                var jumlahAngka = data['jumlah_angka'];
                $('#kunjungan-harian').html(jumlahAngka);
        }
    });
}

function getDataRegister() {
   $.ajax({
       url : base_url_dashboard+"getAntrianLoket/",
       type : "POST",
       data : $('#form-loket-search').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            
            if (status==true) {
                //code
                var jumlahPengunjung = data['jumlah_pengunjung'];
                $('#jumlah-pengunjung').html(jumlahPengunjung);
                $('#jumlah-pengunjung-antrian').html(data['jumlah_antri']);
                $('#jumlah-pengunjung-sedang').html(data['jumlah_sedang']);
                $('#jumlah-pengunjung-selesai').html(data['jumlah_sudah']);
                generateToTable(dataResult);
            }
       }
    }); 
};

function generateToTable(dataResult) {
    //code
    var htmlRes = "";
    if (dataResult.length > 0) {
        //code
        for(var indexDataResult = 0 ; indexDataResult < dataResult.length; indexDataResult++){
            var noUrut = indexDataResult + 1;
            htmlRes += "<tr>";
            htmlRes += "<td style='text-align:right;width:90px; font-weight:bold'>"+dataResult[indexDataResult]['noAntri']+"</td>";
            htmlRes += "<td style='text-align:right'>"+dataResult[indexDataResult]['noAnggota']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['namaPasien']+"</td>";
            htmlRes += "<td style='text-align:right'>"+dataResult[indexDataResult]['usiaPasien']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['namaPoli']+"</td>";
            htmlRes += "</tr>";
        }
    }
    $('#result-register-pasien').html(htmlRes);
    
}