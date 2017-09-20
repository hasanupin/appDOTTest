var base_url_rekmed = global_url+'rekam-medis/';
var base_url_penyakit = global_url+"data-penyakit/";
var number = 1;
var numberTindakan = 1;
$('#add-rekam-medis').click(function(){
    $('#frm-detail-rekmed')[0].reset();
    $('#modal-frm-rekam-medis').modal('show');
});


function checkOdontogram(){
    var selectedOdontogram = $('input[name=selectOdontogram]').val();
    $.ajax({
        url : global_url + 'rekam_medis/getFormOdontogram/'+selectedOdontogram,
        success : function msg(response){
            bootbox.dialog({
                title : "Form Odontogram",
                message : response,
                size: "large"
            });            
        }
    });
}

 $(function(){
 
 var rujukan = $('input[name="rujukan"]').val();
 if(rujukan == ""){
     $('#cont-txtHasilRujukan').css('display','none');
 }  
$('#add-rekam-medis').click(function(){
    $('#frm-detail-rekmed')[0].reset();
    $('#modal-frm-rekam-medis').modal('show');
});
 $('#frm_tidak_setuju').click(function(){
            if($('#frm_tidak_setuju').is(':checked')){
                 $('input[name=pernyataan]').val("0");
            }    
        });
        $('#frm_setuju').click(function(){
            if($('#frm_setuju').is(':checked')){
                 $('input[name=pernyataan]').val("1");
            }    
        });
$('.select2').select2();
});


function formatListTindakan (repo) {
      if (repo.loading) return repo.text;
      var markups = "<div class='select2-result-repository clearfix'>" +
          "<div class='select2-result-repository__meta'>" +
          "<div class='select2-result-repository__title'>" + repo.txtTindakan  + "</div>"+
          "<div class='select2-result-repository__description'>" + repo.txtDeskripsi + "</div>"
          +"</div></div>";
      return markups;
}

function formatListTindakanSelection (repo) {
      return repo.txtTindakan || repo.text;
}



$( document ).ready(function() {
    ///$('#selectOdontogram').select2();
    $('.select-diagnosa').select2({
        ajax: {
        url: base_url_penyakit+"get-list-penyakit/",
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
              q: params.term, // search term
              page: params.page
            };
        },
        processResults: function (data, params) {
        params.page = params.page || 1;
        return {
          results: data.items,
          pagination: {
            more: (params.page * 20) < data.total_count
        }
        };
        },
        cache : true,
  },
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 1,
  templateResult: formatRepo, // omitted for brevity, see the source of this page
  templateSelection: formatRepoSelection, // omitted for brevity, see the source of this page
  placeholder: 'Ketikan Nama Penyakit / Kode ICD',
});
    initiateSelectTindakan('select-tindakan');
   
    $('#btnSaveRekmed').click(function(){
      if ($('#frm-detail-rekmed').valid()) {
          //code
          saveRekmed();
        }
    });
    $('#frm-detail-rekmed').validate({
      ignore : "",
      rules : {
            txtTanggalPemeriksaan : {
                  required : true,  
            },
            txtAnamnesa : {
                  required : true,
            },
      }
    });
   var number = parseInt($('input[name=noDiagnosa]').val());
   
   $('#addRekmed').click(function(){  
    var htmlRes = '<div class="form-group" id="contSelect'+number+'">'+
                    '<label class="col-sm-3 control-label form-label">Diagnosa Penyakit '+(number + 1)+'</label>'+
                    '<div class="col-sm-9"><select name="selectDiagnosa[]" onchange="checkDiagnosaBPJS('+(number + 1)+')" id="selectDiagnosa'+(number + 1)+'" class="form-control select-diagnosa"></select>'+
                    '<input type="text" name="diagnosaBPJS[]" class="form-control" readonly="" placeholder="Kode DiagnosaBPJS" id="diagnosaBPJS_'+(number + 1)+'">'+
                    '</div>'+
                    '</div>';
               
    htmlRes += '<div class="col-sm-9 col-sm-offset-3"><div class="form-group text-left" id="contBtn'+number+'"><button class="btn btn-default btn-flat" style="margin-left:10px;" onclick="hapusForm('+number+')">Hapus Diagnosa '+number+'</button></div></div>';
    if(number < 3){
        
      $('#additional-rekmed').append(htmlRes);
      initiateSelect('selectDiagnosa'+(number + 1));
      number++;
    }
    });
   numberTindakan = parseInt($('input[name=noTindakan]').val());
   $('#addTindakan').click(function(){
      var htmlRes = '<div class="form-group" id="contTindakanSelect'+numberTindakan+'">'+
                    '<label class="col-sm-3 control-label form-label">Tindakan '+(numberTindakan + 1)+'</label>'+
                    '<div class="col-sm-9"><select name="selectTindakan[]" id="select-tindakan'+numberTindakan+'" class="form-control">'+
                    '</select></div>'+
                    '</div>';
                 htmlRes += '<div class="col-sm-9 col-sm-offset-3"><div class="form-group text-left" id="contTindakanBtn'+numberTindakan+'"><button class="btn btn-default btn-flat" style="margin-left:10px;" onclick="hapusTindakanForm('+numberTindakan+')">Hapus Tindakan '+(numberTindakan + 1)+'</button></div></div>';
      $('#additional-tindakan').append(htmlRes);
      initiateSelectTindakan('select-tindakan'+numberTindakan);
      numberTindakan++;
      $('input[name=noTindakan]').val(numberTindakan);
    });
     
    var $signatureDiv = $('#signatureDiv');
        $signatureDiv.jSignature();
    var txtIdRekmedDetail = $('input[name=txtIdRekmedDetail]').val();

    if(txtIdRekmedDetail!=""){
        $('#signatureDiv').css('display' , 'none');
        $('#btnClearSign').attr("disabled" , "disabled");
    }
    

    $('#btnClearSign').click(function(){
        if($('#signatureDiv').css('display') == 'none'){
            $('#signatureDiv').css('display' , 'inline');
            $('#btnSaveSign').css('display' , 'inline');
            $('#previewDiv').empty();
       }
        $signatureDiv.jSignature('reset');
    });

    $('#btnSaveSign').click(function(){
        var txtIdKunjungan = $('input[name=txtIdKunjungan]').val();
        var datapair = $signatureDiv.jSignature("getData" , "base30");
        $.ajax({
            url : global_url + 'rekam_medis/convertToImage/',
            data : "imageString="+datapair+"&idKunjungan="+txtIdKunjungan,
            type : "POST",
            success : function msg(response){
                $('#signatureDiv').css('display' , 'none');
                $('#previewDiv').html('<img src="'+response+'">');
                $('#btnSaveSign').css('display' , 'none');
                $('input[name=inputTTD]').val(response);
            }
        })
    });
});

function hapusRekamMedis() {
    //code
    var r=confirm("Apakah Anda Akan Menghapus Data?? ");
    if (r==true) {
        //code
        var idRekamMedis =$('input[name=txtIdRekamMedis]').val();
        var idDetailRekamMedis = $('input[name=txtIdRekmedDetail]').val();
        var postData = 'txtIdRekamMedis='+idRekamMedis+"&txtIdDetailRekamMedis="+idDetailRekamMedis;
        $.ajax({
           url : base_url_rekmed+"hapus-rekam-medis/",
           type : "POST",
           data : postData,
           dataType : "html",
           success: function msg(res){
                var data = jQuery.parseJSON(res);
                var status = data['status'];
                if (status==true) {
                 //code
                 window.location = base_url_rekmed+"detail-rekam-medis/"+idRekamMedis;
                }else{
                 alert("Data Gagal Di hapus");
                }
           }
        }); 
    }
}

function enableForm(){
  $('#frm-detail-rekmed input').removeAttr("disabled");
  $('#frm-detail-rekmed select').removeAttr("disabled");
  $('#frm-detail-rekmed textarea').removeAttr("disabled");
  $('#frm-detail-rekmed button').removeAttr("disabled");
  $('#btnSaveRekmed').css("display" , "inline");
  $('#btnCancelEditRekmed').css("display" , "inline");
  $('#btnEditRekmed').css("display" , "none");
  $('#btnCetakRekmed').css("display" , "none");
  $('#btnCancelRekmed').css("display" , "none");
}

function disableForm(){
    var pernyataan = $('input[name=pernyataan]').val();
  $('#frm-detail-rekmed input').attr("disabled", "disabled");
  $('#frm-detail-rekmed select').attr("disabled", "disabled");
  $('#frm-detail-rekmed textarea').attr("disabled", "disabled");
  $('#frm-detail-rekmed button').attr("disabled", "disabled");
  $('#btnSaveRekmed').css("display" , "none");
  $('#btnCancelEditRekmed').css("display" , "none");
  $('#btnEditRekmed').css("display" , "inline");
  $('#btnCetakRekmed').css("display" , "inline");
  $('#btnCancelRekmed').css("display" , "inline");
  $('#btnEditRekmed').removeAttr("disabled");
  $('#btnCetakRekmed').removeAttr("disabled");
 
       $('#btnDownload').css("display" , "inline");
      
 }

$('#txtTanggalPemeriksaan').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
});

function hapusForm(numberSelect) {
    //code
    $('#contSelect'+numberSelect).remove();
    $('#contBtn'+numberSelect).remove();
    number--;
}


function hapusTindakanForm(numberSelect) {
    //code
    $('#contTindakanSelect'+numberSelect).remove();
    ///$('#contTindakanText'+numberSelect).remove();
    $('#contTindakanBtn'+numberSelect).remove();
    numberTindakan--;
    $('input[name=noTindakan]').val(numberTindakan);
}


function resetForms() {
    //code
    $('#frm-detail-rekmed')[0].reset();
    $('#additional-rekmed').empty();
    $('#additional-tindakan').empty();
    number = 1;
}

function initiateSelect(id) {
    //code
    $('#'+id).select2({
        ajax: {
        url: base_url_penyakit+"get-list-penyakit/",
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
              q: params.term, // search term
              page: params.page
            };
        },
        processResults: function (data, params) {
        params.page = params.page || 1;
        return {
          results: data.items,
          pagination: {
            more: (params.page * 20) < data.total_count
        }
        };
        },
        cache : true,
  },
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 1,
  templateResult: formatRepo, // omitted for brevity, see the source of this page
  templateSelection: formatRepoSelection, // omitted for brevity, see the source of this page
  placeholder: 'Ketikan Nama Penyakit / Kode ICD',
});
}

function initiateSelectTindakan(id) {
    //code
    $('#'+id).select2({
        ajax: {
        url: global_url+"data-tindakan/get-list-tindakan/",
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
              q: params.term, // search term
              page: params.page,
              idPelayanan: $('input[name=txtIdPelayanan]').val()
            };
        },
        processResults: function (data, params) {
        params.page = params.page || 1;
        return {
          results: data.items,
          pagination: {
            more: (params.page * 20) < data.total_count
        }
        };
        },
        cache : true,
  },
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 1,
  templateResult: formatListTindakan, // omitted for brevity, see the source of this page
  templateSelection: formatListTindakanSelection, // omitted for brevity, see the source of this page
  placeholder: 'Ketikan Tindakan Yang Di Lakukan',
});
}


function saveRekmed() {
    var link_pernyataan = $('input[name=link_pernyataan]').val();
    var link_cetak = $('input[name=link_cetak]').val();
      bootbox.confirm({
        size : "small",
        title : "Konfirmasi",
        message : "Rekam medis tidak dapat diubah jika telah disimpan !!!",
        callback : function(response){
            if(response==true){
               $.ajax({
       url : global_url+"rekam_medis/save_mode_form",
       type : "POST",
       data : $('#frm-detail-rekmed').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);            
            console.log(data);
            var status = data['status'];
            var message = data['message'];
            var id = data['id_rekmed_detail'];
            messageBox(status , message , 'alert_message');
            if (status==true) {
             //code
            $("#btnCetakRekmed").attr('href', link_cetak+'/'+id);
            $("#btnDownload").attr('href', link_pernyataan+'/'+id);
            var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
            $('input[name=txtIdRekmedDetail]').val(id);
            disableForm();
            }
       }
    });               
            }
            
        }
    });
    
}

function checkDiagnosaBPJS(number){
    var idDiagnosaPenyakit = $('#selectDiagnosa'+number).val();
    if(!idDiagnosaPenyakit){
        alert("Diagnosa Utama Belum Di Pilih");
    }else{
        $.ajax({
            url : global_url + 'bpjs/diagnosa/getDiagnosaUmum/',
            type : 'POST',
            data : 'idDiagnosa='+idDiagnosaPenyakit+"&number="+number,
            success : function msg(response){
                var results = jQuery.parseJSON(response);
                var status = results['status'];
                var message = results['message'];
                var jumlahDiagnosa = results['jumlahDiagnosa'];
                if(status){
                    var dataDiagnosa = results['diagnosa'];
                    if(jumlahDiagnosa==1){
                        var strKodeDiagnosa = dataDiagnosa.kdDiagnosaBPJS+'-'+dataDiagnosa.nmDiagnosaBPJS;
                        $('#diagnosaBPJS_'+number).val(strKodeDiagnosa);
                    }else{
                        bootbox.dialog({
                            title : "List Data Penyakit Yang Sama",
                            message : results['htmlVal']
                        });
                    }
                }else{
                    alertPopUp(status , message , "");
                }
            }
        });
    }
}
function selectPoli(){
    var pelayanan = $('#txtIdPelayanan').val();
    if(pelayanan == 3){
        $('#cont-selectOdontogram').css('display','inline');
    }else{
        $('#cont-selectOdontogram').css('display','none');
    }
}
