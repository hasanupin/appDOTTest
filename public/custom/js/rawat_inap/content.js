var base_url_register = global_url+'loket/';
var base_url_poli = global_url+'pelayanan/rawat-inap/';
var data_grid = "";
var data_grid2 = "";
var data_grid3 = "";

$( document ).ready(function() {
   data_grid = $('#table-registration').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": false,
          "processing": true,
           ajax : {
           url : base_url_register+"getDataRegisterRawatInap/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.intPoli = $('input[name=inputIdPoli]').val();
                d.dtTanggal = $('#txtTanggal').val();
                
            }
          }
    });

    data_grid2 = $('#table-sedang-dirawat').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": false,
          "processing": true,
           ajax : {
           url : base_url_register+"getDataRawatInap/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.intPoli = $('input[name=inputIdPoli]').val();
                d.intIdKamar = $('#intIdKamar').val();
                
            }
          }
    });

     data_grid3 = $('#table-rawat-inap-selesai').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": false,
          "processing": true,
           ajax : {
           url : base_url_register+"getDataRiwayatRawatInap/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.start_date = $('input[name=start_date]').val();
                d.end_date = $('input[name=end_date]').val();
                d.intIdKamarRiwayat = $('#intIdKamarRiwayat').val();
            }
          }
    });


   setInterval(function () {
   data_grid.ajax.reload();
   ///data_grid2.ajax.reload();
    }, 10000);

});

$('.datepicker').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
    "autoclose" : true,
});

$('#btnRawatInap').click(function(){
    data_grid2.ajax.reload();
});

$('#btnRawatInapRiwayat').click(function(){
    data_grid3.ajax.reload();
});


function getDataRawatInap(){
    $.ajax({
       url : base_url_register+"get-data-rawat-inap/",
       type : "POST",
       data : $('#frm-poli-pasien').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            
            if (status==true) {
                //code
                var htmlRes = generateToTable(dataResult , '#list-rawat-inap');
            }
       }
    }); 
}

function getDataRawatInapSelesai(){
    $.ajax({
       url : base_url_register+"get-data-rawat-inap-selesai/",
       type : "POST",
       data : $('#frm-filter-data-rawat-inap-selesai').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];            
            if (status==true) {
                //code
                var htmlRes = generateToTable(dataResult , '#list-rawat-inap-selesai');
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
            htmlRes += "<td>"+dataResult[indexDataResult]['noAnggota']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['namaPasien']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['usiaPasien']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['tanggalMasuk']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['ruangKamar']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['statusPasien']+"</td>";
            htmlRes += "<td><a class='btn btn-primary' href='"+global_url+"rawat-inap/detail/"+dataResult[indexDataResult]['idKunjungan']+"'>Detail</a></td>";
            htmlRes += "</tr>";
        }
    }
    $(idTable).html(htmlRes);
}

function generateToTable2(dataResult) {
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
            htmlRes += "</tr>";
        }
    }
    $('#result-register-selesai').html(htmlRes);
}

function getClock() {
    //code
    var jam_sekarang = getTimeClock();
    $('#jam-sekarang').html(jam_sekarang);
}

function hapusData(txtIdRekmedDetail , txtIdKunjungan){
    bootbox.confirm({
        title : "Konfirmasi",
        message : "Apakah Data Rekam medis Pasien Di Hapus (*Data Tidak Bisa Di Restore / Di Kembalikan Semula)",
        callback : function(result){
            if(result){
            $.ajax({
                url : global_url+"rawat_inap/hapusRawatInap/",
                type : "POST",
                data : "idKunjungan="+txtIdKunjungan+"&txtIdRekmedDetail="+txtIdRekmedDetail,
                dataType : "html",
                success: function msg(res){
                var data = jQuery.parseJSON(res);
                var status = data['status'];
                var message = data['message'];                         
                    if (status==true) {
                    //code
                        alertPopUp(status,message,"");
                        data_grid.ajax.reload();
                        data_grid2.ajax.reload();
                        data_grid3.ajax.reload();
                    }
                }
            }); 
            }
        }  
    })
}