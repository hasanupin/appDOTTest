var base_url_pasien = global_url+'pasien/';
var base_url_register = global_url+'loket/';
var base_url_rekmed = global_url+'rekam-medis/';

$( document ).ready(function() {
  $('#selectKecamatan').select2();
  $('#selectKelurahan').select2();
  $('#inputPekerjaan').select2();
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
           inputNamaPasien : {
                  required : true,
           },
           inputTanggalLahir : {
               required : true,
           }
    },messages : {
      inputNamaPasien : "Nama Pasien harus Di Isi",
      inputTanggalLahir : "Tanggal Lahir harus Di Isi",
    }
  });

    var $signatureDiv = $('#signatureDiv');
        $signatureDiv.jSignature();
    var inputMode = $('input[name=inputMode]').val();

    if(inputMode=="detail"){
        $('#signatureDiv').css('display' , 'none');
        $('#btnClearSign').attr("disabled" , "disabled");
    }
    

    $('#btnClearSign').click(function(){
        if($('#signatureDiv').css('display') == 'none'){
            $('#signatureDiv').css('display' , 'inline');
            $('#btnSaveSign').css('display' , 'inline');
            $('#previewDiv').empty();
            ////$signatureDiv.jSignature('init');
        }
        $signatureDiv.jSignature('reset');
    });

    $('#btnSaveSign').click(function(){
        var txtIdKunjungan = $('input[name=inputIdPasien]').val();
        var datapair = $signatureDiv.jSignature("getData" , "base30");
        ///$('input[name=inputTTD]').val(datapair);
        $.ajax({
            url : global_url + 'rekam_medis/convertToImage/',
            data : "imageString="+datapair+"&idKunjungan="+txtIdKunjungan,
            type : "POST",
            success : function msg(response){
                $('#signatureDiv').css('display' , 'none');
                $('#previewDiv').html('<img src="'+response+'">');
                $('#btnSaveSign').css('display' , 'none');
                $('input[name=txtTtdPasien]').val(response);
            }
        })
    });
  
});


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
                      if (mode=='loket') {
                        //code
                        var idpasien = data['idPasien'];
                        $('input[name=inputIdPasien]').val(idpasien);
                        saveRekamMedis();
                        disableForm();
                        var urlRegister = base_url_register+"daftar/"+idpasien;
                        $('#moveKunjunganPasien').attr("href" , urlRegister);
                        $('#inputNoAnggota').val(data['no_anggota']);
                     }else if($mode=="rawat-inap") {
                         var idpasien = data['idPasien'];
                        $('input[name=inputIdPasien]').val(idpasien);
                        saveRekamMedis();
                        disableForm();
                        var urlRegister = global_url+"loket-rawat-inap/daftar/"+idpasien;
                        $('#moveKunjunganPasien').attr("href" , urlRegister);
                        $('#inputNoAnggota').val(data['no_anggota']);
                     }else if (mode=="insert") {
                        //code
                        var idPasien = data['idPasien'];
                        var modeSet = mode=="insert" ? "update" : mode;
                        var urlRekamMedis = data['link_rekmed'];
                        disableForm();
                        $('input[name=inputIdPasien]').val(idPasien);
                        $('input[name=inputMode]').val(modeSet);
                        $('#moveKunjunganPasien').attr("href" , urlRekamMedis);
                        $('#inputNoAnggota').val(data['no_anggota']);
                     }else{
                        var idPasien = data['idPasien'];
                        var modeSet = mode=="insert" ? "update" : mode;
                        var urlRekamMedis = data['link_rekmed'];
                        disableForm();
                        $('input[name=inputIdPasien]').val(idPasien);
                        $('input[name=inputMode]').val(modeSet);
                        $('#moveKunjunganPasien').attr("href" , urlRekamMedis);
                        $('#inputNoAnggota').val(data['no_anggota']);
                     }
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
    autoclose : true
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