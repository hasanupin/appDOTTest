var base_url_register = global_url+'loket/';
$( document ).ready(function() {
   getDataRegister();
   setInterval(function () {
        getDataRegister();
    }, 10000);
   setInterval(function () {
      getClock();
    }, 1000);
});


function getDataRegister() {
   $.ajax({
       url : base_url_register+"getAntrianLoket/",
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
            htmlRes += "<td>"+dataResult[indexDataResult]['noAntri']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['namaPasien']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['noAnggota']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['usiaPasien']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['namaPoli']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['statusPasien']+"</td>";
            htmlRes += "</tr>";
        }
    }
    $('#result-register-pasien').html(htmlRes);
    
}

function getClock() {
    //code
    var jam_sekarang = getTimeClock();
    $('#jam-sekarang').html(jam_sekarang);
}