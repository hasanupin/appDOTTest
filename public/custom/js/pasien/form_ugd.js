var base_url_pasien = global_url+'pasien/';
var base_url_register = global_url+'loket/';
var base_url_rekmed = global_url+'rekam-medis/';
$( document ).ready(function() {
  $('#selectKecamatan').select2();
  $('#selectKelurahan').select2();
  // $('#selectKelurahan').select2();
  // Handler for .ready() called.
  $('#savePasien').click(function(e){
    e.preventDefault();
    if ($('#form-input-pasien').valid()) {
        //code
        saveDataPasien();
    }
  });
  
  $('#form-input-pasien').validate({
    ignore : "",
    rules : {
           inputNoAnggota : {
                  required : true,
           },
           inputNamaPasien : {
                  required : true,
           },
    },messages : {
      
    }
  });
});

function changeInputDate(modeData) {
    //code To DateTime / Tanggal
    //alert(mode);
    if (modeData==1) {
        //code
        $('#inputTanggalLahir').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
        });
        
        $('#inputTanggalLahir').css("display" , "inline");
        $('#inputUsia').css("display" , "none");
    }else{
        $('#inputUsia').css("display" , "inline");
        $('#inputTanggalLahir').css("display" , "none");
    }
}

function saveDataPasien() {
    //code
    $.ajax({
            url : base_url_pasien+"save-pasien/",
            type : "POST",
            data : $('#form-input-pasien').serialize(),
            dataType : "html",
            success: function msg(res){
                 var data = jQuery.parseJSON(res);
                 var status = data['status'];
                 var message = data['message'];
                 var mode = data['mode'];
                 messageBox(status , message , 'alert_message');
                 if (status==true) {
                    //code
                    var idPasien = data['idPasien'];
                    var modeSet = mode=="insert" ? "update" : mode;
                    var urlRekamMedis = data['link_rekmed'];
                    saveRegister();
                    saveRekamMedis();
                    disableForm();
                    $('input[name=inputIdPasien]').val(idPasien);
                    $('input[name=inputMode]').val(modeSet);
                    $('#moveKunjunganPasien').attr("href" , urlRekamMedis);
                    window.location = global_url+"loket-ugd/";
                 }
            }
    });
}


function saveRekamMedis() {
    //code
    var idPasien = $('input[name=inputIdPasien]').val();
    var noRekamMedis = $('#inputNoAnggota').val();
    $.ajax({
       url : base_url_rekmed+"save-rekam-medis/",
       type : "POST",
       data : "txtNoRekamMedis="+noRekamMedis+"&txtIdPasien="+idPasien+"&modeInsertRekamMedis=insertNoRekamMedis",
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);            
            var status = data['status'];
            var message = data['message'];
            //messageBox(status , message , 'alert_message');
       }
    }); 
}

function saveRegister(){
    var idPasien = $('input[name=inputIdPasien]').val();
    var noRekamMedis = $('#inputNoAnggota').val();
    var idPelayanan = $('input[name=inputIdPelayanan]').val();
}


function enableForm(){
  $('#form-input-pasien input').removeAttr("disabled");
  $('#form-input-pasien select').removeAttr("disabled");
  $('#form-input-pasien textarea').removeAttr("disabled");
  $('#form-kelengkapan-pasien input').removeAttr("disabled");
  $('#form-kelengkapan-pasien select').removeAttr("disabled");
  $('#form-kelengkapan-pasien textarea').removeAttr("disabled");
  $('#savePasien').css("display" , "inline");
  $('#cancelPasien').css("display" , "inline");
  $('#editPasien').css("display" , "none");
  $('#moveKunjunganPasien').css("display" , "none");
}

function disableForm(){
  $('#form-input-pasien input').attr("disabled", "disabled");
  $('#form-input-pasien select').attr("disabled", "disabled");
  $('#form-input-pasien textarea').attr("disabled", "disabled");
  $('#form-kelengkapan-pasien input').attr("disabled", "disabled");
  $('#form-kelengkapan-pasien select').attr("disabled", "disabled");
  $('#form-kelengkapan-pasien textarea').attr("disabled", "disabled");
  $('#savePasien').css("display" , "none");
  $('#cancelPasien').css("display" , "none");
  $('#editPasien').css("display" , "inline");
  $('#moveKunjunganPasien').css("display" , "inline");
}

function setNoJaminanKesehatan() {
    //code
    if ($('#selectJamkes').val()!='') {
        //code
        //$('#inputNoJamkes').removeAttr("disabled");
        if ($('#inputNoJamkes').is(":disabled")) {
            //code
            $('#inputNoJamkes').removeAttr("disabled");
        }else{
            $('#inputNoJamkes').removeAttr("readonly");
        }
    }else{
        $('#inputNoJamkes').attr("readonly" , "readonly");
    }
}

$('.datepicker').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
  });

function getKelurahan() {
    //code
    $.ajax({
        url : base_url_pasien+"getDataKelurahan/",
              type : "POST",
              data : "idKecamatan="+$('#selectKecamatan').val(),
              dataType : "html",
              success: function msg(res){
                   var data = jQuery.parseJSON(res);
                   var status = data['status'];
                   var resHtml = data['html'];
                   console.log(resHtml);
                   $('#selectKelurahan').html(resHtml);
              }
    });
}
function pekerjaan(){
    var dropPekerjaan =  $('#inputPekerjaan').val();
    if (dropPekerjaan == "0") {
        $('#txtPekerjaan').removeAttr('disabled');
    }else{
        $('#txtPekerjaan').attr('disabled','disabled');
    }
}