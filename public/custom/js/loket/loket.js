
var base_url_pasien = global_url+'pasien/';
var base_url_register = global_url+'loket/';


$( document ).ready(function() {
   $('#searchPasien').click(function(){
      if ($('#id_pasien').val()!='') {
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
   getDataRegister();
   setInterval(function () {
        getDataRegister();
    }, 10000);
   setInterval(function () {
      getClock();
    }, 1000);
});

$('.datepicker').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
});

function getDataPasien() {
    //code
    $.ajax({
        url : base_url_pasien+"getDataPasienSearch/",
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
                    //code
                    html += '<tr>';
                    html += '<td>'+data_list[indexArray][0]+'</td>';
                    html += '<td>'+data_list[indexArray][1]+'</td>';
                    html += '<td>'+data_list[indexArray][3]+'</td>';
                    html += '<td>'+data_list[indexArray][4]+'</td>';
                    html += '<td>'+data_list[indexArray][5]+'</td>';
                    html += '<td><a href=\''+base_url_register+"daftar/"+data_list[indexArray][6]+'\' class="btn btn-primary"><i class="fa fa-sign-in"> </i> Daftarkan Kunjungan</a> <a href=\''+base_url_pasien+"/pendaftaran/detail/"+data_list[indexArray][6]+'\' class="btn btn-warning"><i class="fa fa-info-circle"> </i> Detil</a></td>';
                    html += '</tr>';
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
                $('#jumlah-pengunjung-antrian').html(data['jumlah_antri']);
            }
       }
    }); 
};

function getClock() {
    //code
    var jam_sekarang = getTimeClock();
    $('#jam-sekarang').html(jam_sekarang);
}
var loadingBox = "";
var timer_check = "";
var id_pasien = "";
var regStats = "";
function cekSidikJari(){
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
                var urlPendaftaran = global_url + "loket/daftar/"+id_pasien;
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
                                    var urlPendaftaran = global_url + "loket/daftar/"+id_pasien;
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