$(function(){
    $('#checkBPJS').click(function(){
      checkNoBPJS(1);
    });

    $('#checkBPJSLoket').click(function(){
      checkNoBPJS(2);
    });
    $('#checkBPJSkegiatan').click(function(){
      checkBPJS(2);
    });

    $('#checkBPJSByNIK').click(function(){
        checkBPJSByNIK();
    });

});

function checkBPJSByNIK(){
    loadingDialog();
    var txtNIK = $('#inputNoIdentitas').val();

    if(txtNIK==''){
        alert("Isikan NIK / No.KTP Terlebih Dahulu");
    }else{
    $.ajax({
        url : global_url + "bpjs/peserta/getPesertaByNIK/",
        data : "txtNIK="+txtNIK,
        type : "POST",
        success : function msg(response){
            $('.bootbox').modal('hide');
            var resVal = jQuery.parseJSON(response);
            var status = resVal['status'];
            var message = resVal['message'];
            var data = resVal['data'];
            
            if(status==true){
                /// Form Pendaftaran pasien
                bootbox.alert({
                    title : "Check Pasien BPJS",
                    message : resVal['htmlResult'],
                    className : "modal-success",
                    backdrop : true,
                });
                
            }else{
                alertPopUp(status , message , "");
            }
            //console.log(data);
        }
    });
    }
}

function checkNoBPJS(mode){
    loadingDialog();
    var jamKes = $('#selectJamkes').val();
    var noBPJS = $('#inputNoJamkes').val();

    if((jamKes!=0)){
        if(noBPJS==''){
            alert("Isikan Nomor Terlebih Dahulu");
        }else{
        $.ajax({
            url : global_url + "bpjs/peserta/getPesertaByNoBPJS/",
            data : "txtNoAnggota="+noBPJS,
            type : "POST",
            success : function msg(response){
                $('.bootbox').modal('hide');
                var resVal = jQuery.parseJSON(response);
                var status = resVal['status'];
                var message = resVal['message'];
                var data = resVal['data'];
                
                if(status==true){
                    /// Form Pendaftaran pasien
                    
                    if(mode==1){
                        $('#inputNamaPasien').val(data['nama']);
                        $('#selectJenisKelamin').val(data['sex']);
                        $('#inputTanggalLahir').val(convertDigitIn(data['tglLahir']));
                    }
                    
                    bootbox.alert({
                        title : "Data Pasien BPJS",
                        message : resVal['htmlResult'],
                        className : "modal-success",
                        backdrop : true,
                    });
                    
                }else{
                    alertPopUp(status , message , "");
                }
                console.log(data);
            }
        });
        }
 
    }
}

function checkBPJS(mode){
    loadingDialog();
   
    var noBPJS = $('#inputBPJS').val();

   
        if(noBPJS==''){
            alert("Isikan Nomor Terlebih Dahulu");
        }else{
        $.ajax({
            url : global_url + "bpjs/peserta/getPesertaByNoBPJS/",
            data : "txtNoAnggota="+noBPJS,
            type : "POST",
            success : function msg(response){
               
                var resVal = jQuery.parseJSON(response);
                var status = resVal['status'];
                var message = resVal['message'];
                var data = resVal['data'];
                
                if(status==true){
                    /// Form Pendaftaran pasien
                    
                    if(mode==1){
                        $('#nama').val(data['nama']);
                        $('#jenis_kelamin').val(data['sex']);
                        $('#tanggal_lahir').val(convertDigitIn(data['tglLahir']));
                    }
                    
             
                    
                }else{
                    alertPopUp(status , message , "");
                }
                console.log(data);
            }
        });
        }
 
    
}
