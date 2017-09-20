var base_url_register = global_url+'loket/';
$( document ).ready(function() {
   getDataRegister();
   $('#searchRegister').click(function(){
      if ($('#txtDate').val()!='') {
        //code
        getDataRegister();
      }
   });
   $(window).keypress(function(e) {
       var key = e.which;
       if (key==13) {
        //code
        e.preventDefault();
        getDataRegister();
       }
   });
   $('#txtDate').datepicker({
      format : 'yyyy-mm-dd', 
   });
});


function getDataRegister() {
   $.ajax({
       url : base_url_register+"getDataHistoryRegister/",
       type : "POST",
       data : $('#frm-loket-search').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            if (status==true) {
                //cod                
                generateToTable(dataResult);
            }else{
                var htmlRes = "";
                htmlRes += "<tr>";
                htmlRes += "<td colspan='7' class='text-center'>Data Tida Tersedia</td>";
                htmlRes += "</tr>";
                $('#result-history-register-pasien').html(htmlRes);
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
            var statusPasien = dataResult[indexDataResult]['bitPasien'];
            htmlRes += "<tr>";
            htmlRes += "<td>"+dataResult[indexDataResult]['noAntri']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['namaPasien']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['noAnggota']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['usiaPasien']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['namaPoli']+"</td>";
            htmlRes += "<td>"+dataResult[indexDataResult]['statusPasien']+"</td>";
            ///htmlRes += "<td><a class='btn btn-primary btn-xs' href='"+base_url_register+"detail/"+dataResult[indexDataResult]['idKunjungan']+"'><i class='fa fa-edit'></i> Detail</a>";
            htmlRes += "<td>";
            if(statusPasien=='1'){
            htmlRes += " <button class='btn btn-danger btn-xs' type='button' onclick='hapusKunjungan(\""+dataResult[indexDataResult]['idKunjungan']+"\")'><i class='fa fa-trash'></i> Hapus</button>";
            htmlRes += " <a class='btn btn-primary btn-xs' href='"+base_url_register+"detail/"+dataResult[indexDataResult]['idKunjungan']+"'><i class='fa fa-edit'></i> Detail</a>";
            htmlRes += " <button class='btn btn-warning btn-xs' type='button' onclick='printNoAntrian(\""+dataResult[indexDataResult]['idKunjungan']+"\")'><i class='fa fa-print'></i> Print</button>";
            }else if(statusPasien=='2'){
            htmlRes += " <button class='btn btn-danger btn-xs' type='button' onclick='hapusKunjungan(\""+dataResult[indexDataResult]['idKunjungan']+"\")'><i class='fa fa-trash'></i> Hapus</button>";
            htmlRes += " <a class='btn btn-primary btn-xs' href='"+base_url_register+"detail/"+dataResult[indexDataResult]['idKunjungan']+"'><i class='fa fa-edit'></i> Detail</a>";
            }
            htmlRes += "</td>";
            htmlRes += "</tr>";
        }
    }
    $('#result-history-register-pasien').html(htmlRes);
}

function hapusKunjungan(idKunjungan){
    bootbox.confirm({
        title : "Peringatan",
        message : "Apakah Anda Akan Menghapus Antrian Ini?",
        callback : function(result){
            if(result==true){
                $.ajax({
                    type : "POST",
                    url : global_url + "loket/hapus-data-antrian/",
                    data : "idKunjungan="+idKunjungan,
                    success : function msg(response){
                        var data = jQuery.parseJSON(response);
                        var status = data['status'];
                        var message = data['message'];
                        alertPopUp(status, message , "");
                        if(status==true){
                            getDataRegister();
                        }
                    }
                })
            }
        }
    });
} 

function printNoAntrian(id){
    $.ajax({
        url : global_url+"cetak/cetak-no-antrian/",
        type : "POST",
        data : "idKunjungan="+id,
        dataType : "html",
        success : function(response){
            ///var data = jQuery.parseJSON(response);
        }
    });
}