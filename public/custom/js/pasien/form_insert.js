var base_url_pasien = global_url+'pasien/';
$( document ).ready(function() {
  $('#selectKecamatan').select2();
  $('#selectKelurahan').select2();
  $('#inputPekerjaan').select2();
  // Handler for .ready() called.
  $('#savePasien').click(function(e){
    e.preventDefault();
    if ($('#form-input-pasien').valid()) {
        //code
        saveDataPasien(1);
    }
  });
  $('#inputTanggalLahir').change(function(e){
    var tanggalLahir = $('#inputTanggalLahir').val();
    if (tanggalLahir!='') {
        //code
        var age = moment().diff(tanggalLahir, 'years');
        if (age==0) {
            //code
            var age = moment().diff(tanggalLahir, 'months');
        }
        console.log(age);
    }
    
  });
  
  $('#savePasienFull').click(function(e){
    e.preventDefault();
    if ($('#form-input-pasien').valid()) {
        //code
        saveDataPasien(2);
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
           },
    },messages : {
      
    }
  });

  //// Check No bpjsapi

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


function saveDataPasien(mode) {
    //code
    //var mode = $('#inputMode').val();
    if (mode==1) {
        //code
      var dataPost = $('#form-input-pasien').serialize() ;  
    }else{
      var dataPost = $('#form-input-pasien').serialize() + "&" + $('#form-kelengkapan-pasien').serialize();
    }
    $.ajax({
            url : base_url_pasien+"save-pasien/",
            type : "POST",
            data : dataPost,
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
                    if (mode=='loket') {
                        //code
                        saveRekamMedis();
                    }
                    disableForm();
                    $('input[name=inputIdPasien]').val(idPasien);
                    $('input[name=txtNoAnggota]').val(data['no_anggota']);
                    $('input[name=inputMode]').val(modeSet);
                    $('#moveKunjunganPasien').attr("href" , urlRekamMedis);
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
  $('#form-input-pasien button').removeAttr("disabled");
  $('#form-kelengkapan-pasien input').removeAttr("disabled");
  $('#form-kelengkapan-pasien select').removeAttr("disabled");
  $('#form-kelengkapan-pasien textarea').removeAttr("disabled");
  $('#form-kelengkapan-pasien button').removeAttr("disabled");
  $('#btnClearSign').removeAttr("disabled");
  $('#savePasien').css("display" , "inline");
  $('#cancelEditPasien').css("display" , "inline");
  $('#deletePasien').css("display","none");
  $('#backPasien').css("display","none");
  $('#editPasien').css("display" , "none");
  $('#moveKunjunganPasien').css("display" , "none");
  $('#moveKunjunganPasienDetil').css("display" , "none");
}

function disableForm(){
  $('#form-input-pasien input').attr("disabled", "disabled");
  $('#form-input-pasien select').attr("disabled", "disabled");
  $('#form-input-pasien textarea').attr("disabled", "disabled");
  $('#form-kelengkapan-pasien input').attr("disabled", "disabled");
  $('#form-kelengkapan-pasien select').attr("disabled", "disabled");
  $('#form-kelengkapan-pasien textarea').attr("disabled", "disabled");
  $('#btnClearSign').attr("disabled", "disabled");
  $('#savePasien').css("display" , "none");
  $('#cancelPasien').css("display" , "none");
  $('#cancelEditPasien').css("display" , "none");
  $('#editPasien').css("display" , "inline");
  $('#backPasien').css("display","inline");
  $('#moveKunjunganPasien').css("display" , "inline");
  $('#moveKunjunganPasienDetil').css("display" , "inline");
  $('#deletePasien').css("display","inline");
}

function setNoJaminanKesehatan() {
    //code
    if ($('#selectJamkes').val()!='') {
        //code
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

function hapusData() {
    //code
    var r = confirm("Apakah Anda Akan Menghapus Data Ini??")
    if (r==true) {
        //code
        var id = $('input[name=inputIdPasien]').val();
    $.ajax({
      url : base_url_pasien+"delete-data-pasien/",
      type : "POST",
      data : "id="+id,
      dataType : "html",
      success: function msg(res){
           var data = jQuery.parseJSON(res);
           var status = data['status'];
           var resHtml = data['html'];
           if (status==true) {
            //code
            window.location = base_url_pasien;
           }
      }
    });
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