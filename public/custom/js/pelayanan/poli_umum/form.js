var base_url_poli = global_url+"pelayanan/poli-umum/";
var base_url_penyakit = global_url+"data-penyakit/";
var base_url_rekam_medis = global_url+"rekam-medis/";
var base_url_register = global_url+"loket/";
var base_url_detail_rekmed = base_url_rekam_medis+"get-detail-poli-umum/";

var number = 1;
var numberTindakan = 1;
var statusQueue = 2;
var statusDone = 3;
function formatRepo (repo) {
      if (repo.loading) return repo.text;
      var markups = "<div class='select2-result-repository clearfix'>" +
          "<div class='select2-result-repository__meta'>" +
          "<div class='select2-result-repository__title'>" + repo.txtIndonesianName + "</div>"+
          "<div class='select2-result-repository__description'>" + repo.txtCategory + repo.txtSubCategory + "</div>"
          +"</div></div>";
      return markups;
}

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
    
function formatRepoSelection (repo) {
      return repo.txtIndonesianName || repo.text;
}

$( document ).ready(function() {
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
            txtPemeriksaan : {
                  required : true,
            },
            txtDetailDiagnosa : {
                  required : true,
            },
      }
    });
    
    
    
    $('#addRekmed').click(function(){  
      var htmlRes = '<div class="form-group" id="contSelect'+number+'">'+
                    '<label class="col-sm-3 control-label form-label">Diagnosa Penyakit '+(number + 1)+'</label>'+
                    '<div class="col-sm-9"><select name="selectDiagnosa[]" id="selectDiagnosa'+number+'" class="form-control select-diagnosa">'+
                    '</select></div>'+
                    '</div>';
               
        htmlRes += '<div class="form-group" id="contText'+number+'">'+
                    '<label for="txtDetailDiagnosa'+number+'" class="col-sm-3 control-label form-label">Detail Diagnosa</label>'+
                    '<div class="col-sm-9"><textarea name="txtDetailDiagnosa[]" cols="3" rows="2" id="txtDetailDiagnosa'+number+'" class="form-control"></textarea>'+
                    '</div></div>';

        htmlRes += '<div class="col-sm-9 col-sm-offset-3"><div class="form-group text-left" id="contBtn'+number+'"><button class="btn btn-default btn-flat" style="margin-left:10px;" onclick="hapusForm('+number+')">Hapus Diagnosa '+number+'</button></div></div>';
      $('#additional-rekmed').append(htmlRes);
      initiateSelect('selectDiagnosa'+number);
      number++;
    });
    
    $('#addTindakan').click(function(){
      var htmlRes = '<div class="form-group" id="contTindakanSelect'+numberTindakan+'">'+
                    '<label class="col-sm-3 control-label form-label">Tindakan '+(numberTindakan + 1)+'</label>'+
                    '<div class="col-sm-9"><select name="selectTindakan[]" id="select-tindakan'+numberTindakan+'" class="form-control">'+
                    '</select></div>'+
                    '</div>';
               
        htmlRes += '<div class="form-group" id="contTindakanText'+numberTindakan+'">'+
                    '<label for="txtDetailTindakan'+numberTindakan+'" class="col-sm-3 control-label form-label">Detail Tindakan</label>'+
                    '<div class="col-sm-9"><textarea name="txtDetailTindakan[]" cols="3" rows="2" id="txtDetailTindakan'+numberTindakan+'" class="form-control"></textarea>'+
                    '</div></div>';
                    htmlRes += '<div class="col-sm-9 col-sm-offset-3"><div class="form-group text-left" id="contTindakanBtn'+numberTindakan+'"><button class="btn btn-default btn-flat" style="margin-left:10px;" onclick="hapusTindakanForm('+numberTindakan+')">Hapus Tindakan '+numberTindakan+'</button></div></div>';
      $('#additional-tindakan').append(htmlRes);
      initiateSelectTindakan('select-tindakan'+numberTindakan);
      numberTindakan++;
    });
    
    $('#btnEditUpdate').click(function(){
      enableForm();
    });
    
    $('#btnCancelRekmed').click(function(){
      var urlRef = $('#btnBack').attr("href");
      var statusReset = updateStatusAntrianReferal("poli",1 , urlRef);
    });
    
    updateStatusAntrian("poli",statusQueue);
    
    
    var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
    var data_grid = $('#table-rekam-medis').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_detail_rekmed+idRekamMedis,
            type : "POST"
          }
    });
    
    $('#getRekamMedis').click(function(){
        var idRekamMedis = $('input[name=txtIdRekamMedis]').val();
        var url_post = base_url_detail_rekmed+idRekamMedis;
        data_grid.ajax.url(url_post).load();
    });
    
    $('#btnReferralPemeriksaan').click(function(){
        saveReferral();
    });
});

function saveReferral(){
    $.ajax({
       url : base_url_register+"save-referral-antrian/",
       type : "POST",
       data : $('#frm-detail-register').serialize() +"&"+ $('#form-pemeriksaan-lanjut').serialize()+"&"+ $('#frm-detail-rekmed').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            console.log(data);
            var status = data['status'];
            var message = data['message'];
            messageBox(status , message , 'alert_message');
            if (status==true) {
             //code
             var idRekmed = data['id_rekmed'];
             var idDetailRekmed = data['id_rekmed_detail'];
             $('input[name=txtIdRekamMedis]').val(idRekmed);
             $('input[name=txtIdRekmedDetail]').val(idDetailRekmed);
             disableForm();
            }
       }
    }); 
}

function saveRekmed() {
    //code
    $.ajax({
       url : base_url_rekam_medis+"save-rekam-medis/",
       type : "POST",
       data : $('#frm-detail-register').serialize() +"&"+ $('#frm-detail-rekmed').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var message = data['message'];
            messageBox(status , message , 'alert_message');
            if (status==true) {
             //code
             var idRekmed = data['id_rekmed'];
             var idDetailRekmed = data['id_rekmed_detail'];
             $('input[name=txtIdRekamMedis]').val(idRekmed);
             $('input[name=txtIdRekmedDetail]').val(idDetailRekmed);
             disableForm();
             updateStatusAntrian("poli",statusDone);
             var pengobatan = $('#txtPengobatan').val().trim();
             if (pengobatan!="") {
                  updateStatusAntrian("apotik",1);
             }
            }
       }
    }); 
}


function enableForm(){
      $('#frm-detail-rekmed input').removeAttr("disabled");
      $('#frm-detail-rekmed select').removeAttr("disabled");
      $('#frm-detail-rekmed textarea').removeAttr("disabled");
      $('#btnSaveRekmed').css("display" , "inline");
      $('#btnCancelRekmed').css("display" , "inline");
      $('#btnBack').css("display" , "none");
      $('#btnEditUpdate').css("display" , "none");
}

function disableForm(){
      $('#frm-detail-rekmed input').prop("disabled"  , true);
      $('#frm-detail-rekmed select').prop("disabled"  , true);
      $('#frm-detail-rekmed textarea').prop("disabled"  , true);
      $('#btnSaveRekmed').css("display" , "none");
      $('#btnCancelRekmed').css("display" , "none");
      $('#btnBack').css("display" , "inline");
      $('#btnEditUpdate').css("display" , "inline");
}

/// Form Add Diagnosa
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
              page: params.page,
              
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

function hapusForm(numberSelect) {
    //code
    $('#contSelect'+numberSelect).remove();
    $('#contText'+numberSelect).remove();
    $('#contBtn'+numberSelect).remove();
    number--;
}

function hapusTindakanForm(numberSelect) {
    //code
    $('#contTindakanSelect'+numberSelect).remove();
    $('#contTindakanText'+numberSelect).remove();
    $('#contTindakanBtn'+numberSelect).remove();
    numberTindakan--;
}

function resetForms() {
    //code
    $('#frm-detail-rekmed')[0].reset();
    $('#additional-rekmed').empty();
    $('#additional-tindakan').empty();
    number = 1;
}
/// Form Add Diagnosa
function getDetailRekamMedis() {
    //code
    $.ajax({
       url : base_url_rekam_medis+"get-detail-poli-umum/",
       type : "POST",
       data : $('#frm-detail-register').serialize()+"&page="+$('#page-detail-rekmed').val()+"&mode_form=false",
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            if (status==true) {
             //code
             var page_next = data['page'];
             var message = data['html'];
             $('#page-detail-rekmed').val(page_next);
             $('#accordion-rekmed').append(message);
            }else{
                  
            }
       }
    }); 
}

function updateStatusAntrianReferal(pelayanan,status,link) {
    //code
    $.ajax({
       url : base_url_register+"update-status-antrian/",
       type : "POST",
       data : "idKunjungan="+$('input[name=txtIdKunjungan]').val()+"&statusKunjungan="+status+"&statusPelayanan="+pelayanan,
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            if (status==true) {
                window.location = link;
            }
       }
    }); 
}

 function updateStatusAntrian(pelayanan,status) {
    //code
    $.ajax({
       url : base_url_register+"update-status-antrian/",
       type : "POST",
       data : "idKunjungan="+$('input[name=txtIdKunjungan]').val()+"&statusKunjungan="+status+"&statusPelayanan="+pelayanan,
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            return status;
       }
    }); 
}