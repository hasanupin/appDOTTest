var base_url_pasien = global_url+'pasien/';
var base_url_register = global_url+'self-service/';

$( document ).ready(function() {
   $('#searchPasien').click(function(){
      if ($('#txtNoAnggota').val()!='') {
        //code
        getDataPasien();
      }
   });
   $(window).keypress(function(e) {
       var key = e.which;
       if (key==13) {
        //code
        e.preventDefault();
        getDataPasien();
       }
   });
});

$('.datepicker').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
});

function getDataPasien() {
    //code
    $.ajax({
        url : base_url_pasien+"getDataByNoAnggota/",
        type : "POST",
        data : $('#frm-search-pasien').serialize(),
        dataType : "html",
        success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var data_list = data['data'];
            var html = '';
            if (status==true) {
                //code
                
                for (var indexArray = 0; indexArray < data_list.length;indexArray++) {
                    
                    if(data_list[indexArray][5] ==""){
                    html += '<tr>';
                    html += '<td><a href=\''+base_url_register+"pendaftaran/"+data_list[indexArray][4]+'\' style="color: #000;float:right">'+data_list[indexArray][0]+'</a></td>';
                    html += '<td><a href=\''+base_url_register+"pendaftaran/"+data_list[indexArray][4]+'\' style="color: #000;float:left">'+data_list[indexArray][1]+'</a></td>';
                    html += '<td><a href=\''+base_url_register+"pendaftaran/"+data_list[indexArray][4]+'\' style="color: #000">'+data_list[indexArray][2]+'</a></td>';
                    html += '<td><a href=\''+base_url_register+"pendaftaran/"+data_list[indexArray][4]+'\' style="color: #000">'+data_list[indexArray][3]+'</a></td>';
                    html += '<td><a href=\''+base_url_register+"pendaftaran/"+data_list[indexArray][4]+'\' class="btn btn-success" style="height: 45px; margin: -3px; font-size: 21px; padding: 5px;"><i class="fa fa-sign-in"> </i> Daftar</a></td>';
                    html += '</tr>';
                   
                    }else{
                    html += '<tr>';
                    html += '<td><a href="#" onclick="checkPPK(\''+data_list[indexArray][5]+'\',\''+data_list[indexArray][4]+'\')" style="color: #000;float:right">'+data_list[indexArray][0]+'</a></td>';
                    html += '<td><a href="#" onclick="checkPPK(\''+data_list[indexArray][5]+'\',\''+data_list[indexArray][4]+'\')" style="color: #000;float:left">'+data_list[indexArray][1]+'</a></td>';
                    html += '<td><a href="#" onclick="checkPPK(\''+data_list[indexArray][5]+'\',\''+data_list[indexArray][4]+'\')" style="color: #000">'+data_list[indexArray][2]+'</a></td>';
                    html += '<td><a href="#" onclick="checkPPK(\''+data_list[indexArray][5]+'\',\''+data_list[indexArray][4]+'\')" style="color: #000">'+data_list[indexArray][3]+'</a></td>';
                    html += '<td><a href="#" onclick="checkPPK(\''+data_list[indexArray][5]+'\',\''+data_list[indexArray][4]+'\')" class="btn btn-success" style="height: 45px; margin: -3px; font-size: 21px; padding: 5px;"><i class="fa fa-sign-in"> </i> Daftar</a></td>';
                    html += '</tr>';
                  
                    }
                 }
				document.getElementById('hidden-table').style.display = 'block';
                $('#result-search-pasien').html(html);
            }else{
				document.getElementById('hidden-table').style.display = 'block';
                $('#result-search-pasien').html("Data Pasien Tidak Ditemukan");
			}
        }
    });
}

var loadingBox = "";
var timer_check = "";
var id_pasien = "";
var regStats = "";
function cekSidikJari(){
    var uniqueID = $('input[name=uniqueID]').val();

    loadingBox = bootbox.dialog({
        message : "Proses Pencarian Sidik Jari Di Database.....",
        closeButton : false,
        onEscape : false,
    });

    var limit = 3;
    var ct = 1;
    var timeout = 8000;
    var regStats = 0;

    timer_check = $.timer(timeout,function(){
        console.log("uniqueID = " + uniqueID);
        cekIdPasienSidikJari(uniqueID);
        if(ct >= limit || regStats==1){
            timer_check.stop();
            console.log("check uniqueID Finish = " + uniqueID);
            $('.bootbox').modal("hide");
            console.log("Result = "+regStats);
            if((ct>=limit) && (regStats==0)){
                alertPopUp(false,"Pengecekan Gagal","");
            }
            if(regStats==1){
                var urlPendaftaran = global_url + "self-service/pendaftaran/"+id_pasien;
                alertRedirect(true,"Data Sidik Jari Di Temukan",urlPendaftaran);
            }
        }
        ct++;
    });

}

function cekIdPasienSidikJari(uniqueID){
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
                                id_pasien = res['txtIdPasien'];
                                if(status==1){
                                    timer_check.stop();
                                    $('.bootbox').modal("hide");
                                    var urlPendaftaran = global_url + "self-service/pendaftaran/"+id_pasien;
                                    alertRedirect(true,"Data Sidik Jari Di Temukan",urlPendaftaran);
                                }
                                
                            }
                            catch(err)
                            {
                                alert(err.message);
                            }
                        }
    });
}

function absensiPegawai(){
    var uniqueID = $('input[name=uniqueIDPegawai]').val();

    loadingBox = bootbox.dialog({
        message : "Proses Pencarian Sidik Jari Di Database.....",

    });

    var limit = 3;
    var ct = 1;
    var timeout = 8000;
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
                var id = data['id'];
                window.location = global_url + 'self-service/landing-page-pegawai/'+id;
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
function checkPPK(noBPJS,idPasien){
        $.ajax({
        url : global_url+'bpjs/peserta/getPesertaNoBPJS/',
           type		:	"POST",
            data        :   "noBPJS="+noBPJS,
           success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var data_list = data['data'];
            if(status== true){
                if(data_list['kdProviderPst']['kdProvider'] == "13242401"){
                   
                   window.location.href = base_url_register+"pendaftaran/"+idPasien;
                }else{
                   alertPopUp(false, "Data bukan dari puskesmas bululawang" , "");
                }
                
            }else{
                window.location.href = base_url_register+"pendaftaran/"+idPasien;
            }
            }
       });
}