var base_url_register = global_url+'loket/';
$( document ).ready(function() {
  // Handler for .ready() called.
  $('#registerButton').click(function(e){
    e.preventDefault();
    if ($('#form-detail-pelayanan').valid()) {
        //code
        saveDataLayanan();
    }
  });
  
  $('#form-detail-pelayanan').validate({
    ignore : "",
    rules : {
           inputNoJamkes : {
                  required : true,
           },
    }
  });
  
  $('#inputTanggal').datepicker({
      "format": 'yyyy-mm-dd',
      "locale" : 'id',
      autoclose : true
  });

  $('#inputTanggal').change(function(){
      getUsiaPasien();
  });
  
});

function getUsiaPasien(){
    var inputTanggalLahir = $("input[name=inputTanggalLahir]").val();
    var inputTanggal = $("input[name=inputTanggal]").val();

    $.ajax({
        url : base_url_register+"getUsiaPasien/",
        type : "POST",
        data : "tanggalLahir="+inputTanggalLahir+"&tanggalPeriksa="+inputTanggal,
        success: function msg(res){
            var data = jQuery.parseJSON(res);
            var usiaPasien = data['usiaPasien'];
            var usiaPasienHari = data['usiaPasienHari'];
            $("input[name=inputUsia]").val(usiaPasien);
            $("input[name=intUsiaPasienHari]").val(usiaPasienHari);
        }
    });
}

function setNoJaminanKesehatan() {
    //code
    if ($('#selectJamkes').val()!='0') {
        //code
        if ($('#inputNoJamkes').attr('disabled')) {
            //code
            $('#inputNoJamkes').removeAttr("disabled");
        }else if ($('#inputNoJamkes').attr('readonly')){
            $('#inputNoJamkes').removeAttr("readonly");
        }
    }else{
        $('#inputNoJamkes').attr("disabled" , "disabled");
    }
}

function saveDataLayanan() {
    //code
    $.ajax({
        url : base_url_register+"saveDataLoket/",
        type : "POST",
        data : $('#form-detail-pelayanan').serialize(),
        dataType : "html",
        success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var message = data['message'];
            var idKunjungan = data['id'];
            if(status==true){
                confirmPrintNo(idKunjungan);
            }else{
                alertPopUp(status , message , base_url_register);
            }
            

            
        }
    });
}

function confirmPrintNo(idKunjungan){
    bootbox.confirm({
                    size : 'large',
                    title : "Data Berhasil Di Simpan",
                    message : "Cetak No Antrian ?",
                    callback : function(result){
                        if(result==true){
                            printNoAntrian(idKunjungan);
                            document.getElementById("registerButton").style.display = "none"; 
                            document.getElementById("progressBar").style.display = "block"; 
                            setTimeout(function () {
                                window.location = base_url_register;;
                            }, 4000);
                            
                        }else{
                            window.location = base_url_register;
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

function checkNoBPJS(){

    var jamKes = $('#selectJamkes').val();
    var noBPJS = $('#inputNoJamkes').val();

    if((jamKes!=0)){
        $.ajax({
            url : global_url + "bpjsapi/checkPasienByNoAnggota/",
            data : "txtNoAnggota="+noBPJS,
            type : "POST",
            success : function msg(response){
                var resVal = jQuery.parseJSON(response);
                var status = resVal['status'];
                var message = resVal['message'];
                var data = resVal['data'];
                
                if(status==1){
                    $('#inputNamaPasien').val(data['nama']);
                    $('#selectJenisKelamin').val(data['sex']);
                    $('#inputTanggalLahir').val(convertDigitIn(data['tglLahir']));
                    var aktif = data['aktif'];
                    if(aktif!=1){
                        alertPopUp(false , "Kartu Tidak Aktif ("+data['ketAktif']+")" , "");
                    }
                    
                }
                console.log(data);
            }
        });
    }
}



