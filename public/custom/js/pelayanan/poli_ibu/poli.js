var base_url_register = global_url+'loket/';
var base_url_poli = global_url+'pelayanan/poli-ibu/';
$( document ).ready(function() {
   getDataRegister();
   setInterval(function () {
        getDataRegister();
        getDataSelesai();
    }, 10000);
   setInterval(function () {
      getClock();
    }, 1000);
});

$('.datepicker').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
    autoclose : true,
});


$('#registerButton').click(function(){
    getDataRegister();
    getDataSedangDiLayani();
    getDataSelesai();
    getDataRujukan();
});


function getDataRegister() {
   $.ajax({
       url : base_url_register+"get-data-antrian/",
       type : "POST",
       data : $('#frm-poli-pasien').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            
            
                //code
                var jumlah_pengunjung = data['jumlah_pengunjung'];
                $('#jumlah-pengunjung').html(jumlah_pengunjung);
                ///var htmlRes = generateToTable(dataResult);
                var htmlRes = generateToTable(dataResult , '#result-register-pasien');
                ///$('#result-register-pasien').html(htmlRes);
            
       }
    }); 
};

function getDataSedangDiLayani() {
    //code
    $.ajax({
       url : base_url_register+"get-data-antrian/",
       type : "POST",
       data : $('#frm-poli-pasien').serialize() + "&status=2",
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            //code
            var jumlah_pengunjung = data['jumlah_pengunjung'];
            ///$('#jumlah-pengunjung').html(jumlah_pengunjung);
            var htmlRes = generateToTable(dataResult , '#result-register-sedang');
            //$('#result-register-sedang').html(htmlRes);
            
       }
    }); 
}

function getDataSelesai() {
    //code
    $.ajax({
       url : base_url_register+"get-data-antrian/",
       type : "POST",
       data : $('#frm-poli-pasien').serialize() + "&status=3",
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            
            
                //code
                var jumlah_pengunjung = data['jumlah_pengunjung'];
                ///$('#jumlah-pengunjung').html(jumlah_pengunjung);
                ///generateToTable(dataResult , '#result-register-selesai');
                generateToTable2(dataResult);
            
       }
    }); 
}

function getDataRujukan(){
    $.ajax({
       url : base_url_register+"getDataRujukan/",
       type : "POST",
       data : $('#frm-poli-pasien').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            
            if (status==true) {
                generateToTable3(dataResult);
                ////generateToTable2(dataResult);
            }
       }
    });
}

function generateToTable(dataResult , idTable) {
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
            htmlRes += "<td>"+dataResult[indexDataResult]['statusPasien']+"</td>";
            htmlRes += "<td><a target='_blank' class='btn btn-success btn-xs' href='"+base_url_poli+"detail/"+dataResult[indexDataResult]['idKunjungan']+"'><span class='fa fa-commenting'> </span> Detil Pelayanan</a>";
            ///htmlRes += "<td><button type='button' class='btn btn-info btn-xs' onclick=panggilAntrian('"+dataResult[indexDataResult]['idKunjungan']+"')'"+base_url_poli+"detail/"+dataResult[indexDataResult]['idKunjungan']+"'><span class='fa fa-bullhorn'> </span> Panggil Antrian</button></td>";
            htmlRes += '<button type="button" class="btn btn-info btn-xs" onclick="panggilAntrian(\''+dataResult[indexDataResult]['idKunjungan']+'\')"><span class="fa fa-bullhorn"> </span> Panggil Antrian</button></td>';
            htmlRes += "</tr>";
        }
    }else{
        htmlRes += "<tr><td colspan='6'><center>-Data Tidak Ada-</center></td></tr>";
    }
    $(idTable).html(htmlRes);
    ////return htmlRes;
    
}

function generateToTable2(dataResult , idTable) {
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
            htmlRes += "<td>"+dataResult[indexDataResult]['statusPasien']+"</td>";
            htmlRes += "<td><a target='_blank' class='btn btn-success btn-xs' href='"+base_url_poli+"detail/"+dataResult[indexDataResult]['idKunjungan']+"'><span class='fa fa-commenting'> </span> Detil Pelayanan</a></td>";
            htmlRes += "</tr>";
        }
    }else{
        htmlRes += "<tr><td colspan='6'><center>-Data Tidak Ada-</center></td></tr>";
    }
    //$(idTable).html(htmlRes);
    $('#result-register-selesai').html(htmlRes);
}

function generateToTable3(dataResult){
    
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
            htmlRes += "<td>"+dataResult[indexDataResult]['statusPemeriksaan']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['namaPoliReferrer']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['statusPasien']+"</td>";
            htmlRes += "</tr>";
        }
    }else{
        htmlRes += "<tr><td colspan='6'><center>-Data Tidak Ada-</center></td></tr>";
    }
    $('#result-register-rujuk').html(htmlRes);
}

function getClock() {
    //code
    var jam_sekarang = getTimeClock();
    $('#jam-sekarang').html(jam_sekarang);
}