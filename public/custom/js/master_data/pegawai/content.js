var base_url_modul = global_url+'data-pegawai/';
var data_grid = "";
////var searchKey = $('#searchText').val();
$( document ).ready(function(){
    data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          "processing" : true,
          serverSide: true,
          ajax : {
            url : base_url_modul+"retrieve-data/",
            type : "POST",
            data : function(p) {
                p.txtName = $('#searchText').val();
                p.intIdJabatan = $('#selectJenisPelayanan').val();
            }
          }
    });
    
    $('#searchBtn').click(function(){
        data_grid.ajax.reload();
    });
    
    $('#refreshBtn').click(function(){
        data_grid.ajax.reload();
    });
});

function hapusData(id) {
    //code
    var r = confirm("Apakah Data Akan Di Hapus??");
    if (r==true) {
        //code
        var url_hapus = base_url_modul+"delete/";
        deleteRedirect(url_hapus , id , base_url_modul);
    }
    
}

function checkFingerRegistration(intIdPegawai){    
    
    
    bootbox.dialog({
        title : "Peringatan" , 
        closeButton : false,
        message : '<div class="text-center"<i class="fa fa-spin fa-spinner"></i> Loading...</div>'
    });
    regStats = 0;
    regCt = -1;
    try
    {
        timer_register.stop();
    }
    catch(err)	
    {
        console.log('Registration timer has been init');
    }
        
    var limit = 2;
    var ct = 1;
    var timeout = 8000;
    
    timer_register = $.timer(timeout, function() {					
        console.log("registration checking...");
        user_checkregister(intIdPegawai);
        if (ct>=limit || regStats==1) 
        {
            timer_register.stop();
            console.log("registration checking end");
            if (ct>=limit && regStats==0)
            {
                alertPopUp(false,"Registrasi Sidik jari Gagal","");
                $('.bootbox').modal("hide");
            }						
            if (regStats==1)
            {
                alertPopUp(true,"Registrasi Sidik jari Berhasil","");
                data_grid.ajax.reload();
                $('.bootbox').modal("hide");
            }
        }
        ct++;
    });
}

function user_checkregister(intIdPegawai) {
    $.ajax({
        url			:	global_url+"fingerscan/checkFingerRegistrationPegawai/",
        type		:	"POST",
        data        :   "intIdPegawai="+intIdPegawai,
        success		:	function(data)
                        {
                            try
                            {
                                var res = jQuery.parseJSON(data);
                                console.log(res);	
                                if (res.status)
                                {
                                    regStats = 1;
                                }
                            }
                            catch(err)
                            {
                                alert(err.message);
                            }
                        }
    });
}

function hapusSidikJari(){
    var user_id = $('input[name=inputIdPasien]').val();
    bootbox.confirm("Apakah Sidik Jari Akan Di Hapus?", function(result) {
        if(result==true){
           $.ajax({
                url			:	global_url+"fingerscan/deleteFinger/",
                type		:	"POST",
                data        :   "txtIdPasien="+user_id,
                success		:	function(data)
                                {
                                    try
                                    {
                                        var res = jQuery.parseJSON(data);
                                        alertPopUp(res.status,res.message,"");
                                        window.location.reload();
                                    }
                                    catch(err)
                                    {
                                        alert(err.message);
                                    }
                                }
            }); 
        }
    }); 
}