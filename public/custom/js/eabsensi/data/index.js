var data_grid = "";
$(function(){
     data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "processing" : true,
          "info": false,
          "autoWidth": false,
          ajax : {
            url : global_url+"e-absensi/retrieve-data/",
            type : "POST",
            data : function(p) {
                p.dtStart = $('#filterTanggalAwal').val();
                p.dtEnd = $('#filterTanggalAkhir').val();
                p.intIdStatus = $('#intIdStatus').val();
            }
          }
    });

}); 

$('#searchBtn').click(function(){
    data_grid.ajax.reload();
});


$('#filterTanggalAwal').datepicker({
    format : 'yyyy-mm-dd',
    autoclose : true,
    
});
$('#filterTanggalAkhir').datepicker({
    format : 'yyyy-mm-dd',
    autoclose : true,
});

function deleteAbsensi(intIdAbsensi) {
    bootbox.confirm({
        size : "small",
        title : "Peringatan",
        message : "Apakah Anda Akan Menghapus Data Tersebut?",
        callback: function(result){ 
        if(result==true){
            $.ajax({
                url			:	global_url+"e-absensi/delete-presensi-pegawai/",
                type		:	"POST",
                data        :   "intIdAbsensi="+intIdAbsensi,
                success : function msg(Result) {
                    var data = jQuery.parseJSON(Result);
                    var status = data['status'];
                    var message = data['message'];
                    alertPopUp(status , message , "");
                    data_grid.ajax.reload();
                }
            });
        }
        }
    });

    
}

var intIdPegawai = "";
function verifySidik(){
    var uniqueID = $('input[name=uniqueID]').val();

    loadingBox = bootbox.dialog({
        message : "Proses Pencarian Sidik Jari Di Database.....",

    });

    var limit = 3;
    var ct = 1;
    var timeout = 5000;
    var regStats = 0;
    
    timer_check = $.timer(timeout,function(){
        console.log("uniqueID = " + uniqueID);
        cekIdPegawaiSidikJari(uniqueID);
        if(ct >= limit || regStats==1){
            timer_check.stop();
            console.log("check uniqueID Finish = " + uniqueID);
            $('.bootbox').modal("hide");
            console.log("Result = "+regStats);
            if((ct>=limit) && (regStats==0)){
                alertPopUp(false,"Pengecekan Gagal","");
            }
            if(regStats==1){
                absensiPasien(intIdPegawai);
            }
        }
        ct++;
    });

}

function absensiPasien(intIdPegawai){
    $('.bootbox').modal("hide");
    if(intIdPegawai!=""){
        $.ajax({
            url			:	global_url+"e-absensi/insert-presensi-pegawai/",
            type		:	"POST",
            data        :   "intIdPegawai="+intIdPegawai,
            success : function msg(Result) {
                var data = jQuery.parseJSON(Result);
                var status = data['status'];
                var message = data['message'];
                alertPopUp(status , message , "");
                data_grid.ajax.reload();
        }
        });
    }else{
        alertPopUp(false, "Data Pegawai Tidak Di Temukan" , "");
    }
    
}

function cekIdPegawaiSidikJari(uniqueID){
    $.ajax({
        url			:	global_url+"fingerscan/findPasienByUniqueID/",
        type		:	"POST",
        data        :   "uniqueID="+uniqueID,
        success		:	function(data)
                        {
                            try
                            {
                                var res = jQuery.parseJSON(data);
                                console.log(res);	
                                var status = res['status'];
                                var message = res['message'];
                                regStats = status;
                                intIdPegawai = res['txtIdPasien'];
                                if(status==1){
                                    timer_check.stop();
                                    absensiPasien(intIdPegawai);
                                    ///$('.bootbox').modal("hide");

                                }
                                
                            }
                            catch(err)
                            {
                                alertPopUp(false, "Data Pegawai Tidak Di Temukan" , "");
                            }
                        }
    });
}