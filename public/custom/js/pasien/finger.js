function checkFingerRegistration(){    
    var user_id = $('input[name=inputIdPasien]').val();
    var user_name = $('#inputNamaPasien').val();
    $('body').ajaxMask();
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
        
    var limit = 4;
    var ct = 1;
    var timeout = 8000;
    
    timer_register = $.timer(timeout, function() {					
        console.log("'"+user_name+"' registration checking...");
        user_checkregister(user_id);
        if (ct>=limit || regStats==1) 
        {
            timer_register.stop();
            console.log("'"+user_id+"' registration checking end");
            if (ct>=limit && regStats==0)
            {
                alertPopUp(false,"Registrasi Sidik jari Gagal","");
                $('#txtFingerPrintStatus').val("Belum");
                $('body').ajaxMask({ stop: true });
            }						
            if (regStats==1)
            {
                $("#user_finger_"+user_id).html(regCt);
                $('#txtFingerPrintStatus').val("Sudah");
                alertPopUp(true,"Registrasi Sidik jari Berhasil","");
                $('body').ajaxMask({ stop: true });
            }
        }
        ct++;
    });
}

function user_checkregister(user_id) {
    $.ajax({
        url			:	global_url+"fingerscan/checkFingerRegistration/",
        type		:	"POST",
        data        :   "txtIdPasien="+user_id,
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