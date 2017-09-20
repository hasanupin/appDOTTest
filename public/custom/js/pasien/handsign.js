var regHandStats;
var regHandCount;

function showLoadBar(){
    bootbox.dialog({
        title : "Perhatian",
        message : "Pengecekan Tanda Tangan Sedang di Lakukan...",
        backdrop : true,
    });
}
function checkHandSign(){    
    var user_id = $('input[name=inputIdPasien]').val();
    var user_name = $('#inputNamaPasien').val();
    ///$('body').ajaxMask();
    showLoadBar();
    regHandStats = 0;
    regHandCount = -1;
    try
    {
        timer_register_hs.stop();
    }
    catch(err)	
    {
        console.log('Registration timer has been init');
    }
        
    var limitHandSign = 4;
    var ctHandSign = 1;
    var timeoutHS = 8000;
    
    timer_register_hs = $.timer(timeoutHS, function() {					
        console.log("'"+user_name+"' registration checking...");
        checkHandSignAjax(user_id);
        if (ctHandSign>=limitHandSign || regHandStats==1) 
        {
            timer_register_hs.stop();
            console.log("'"+user_id+"' registration checking end");
            if (ctHandSign>=limitHandSign && regHandStats==0)
            {
                alertPopUp(false,"Tanda Tangan Gagal Di Simpan","");
                ///$('#txtFingerPrintStatus').val("Belum");
                $('.bootbox').modal('hide');
            }						
            if (regHandStats==1)
            {
                ////$("#user_finger_"+user_id).html(regctHandSign);
                ///$('#txtFingerPrintStatus').val("Sudah");
                alertPopUp(true,"Tanda Tangan Berhasil Di Simpan","");
                $('#previewDiv').html('<img src="'+global_url+'imagesign/getImageSign/'+user_id+'">');
                $('.bootbox').modal('hide');
            }
        }
        ctHandSign++;
    });
}

function checkHandSignAjax(user_id) {
    $.ajax({
        url			:	global_url+"imagesign/checkHandsign/",
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
                                    regHandStats = 1;
                                }
                            }
                            catch(err)
                            {
                                alert(err.message);
                            }
                        }
    });
}
