var base_url_rekmed = global_url+'rekam-medis/';
var base_url_penyakit = global_url+"data-penyakit/";
var number = 1;
$('#add-rekam-medis').click(function(){
    $('#frm-detail-rekmed')[0].reset();
    $('#modal-frm-rekam-medis').modal('show');
});

function formatRepo (repo) {
      if (repo.loading) return repo.text;
      var markups = "<div class='select2-result-repository clearfix'>" +
          "<div class='select2-result-repository__meta'>" +
          "<div class='select2-result-repository__title'>" + repo.txtIndonesianName + "</div>"+
          "<div class='select2-result-repository__description'>" + repo.txtCategory + repo.txtSubCategory + "</div>"
          +"</div></div>";
      ///markups = repo.txtIndonesianName;
      return markups;
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
            txtPemeriksaan : {
                  required : true,
            },
            txtDetailDiagnosa : {
                  required : true,
            },
            txtTindakan : {
                  required : true,
            },
            txtPengobatan : {
                  required : true,
            }
      }
    });
    $('#addRekmed').click(function(){  
    var htmlRes = '<div class="form-group" id="contSelect'+number+'">'+
                    '<label class=" control-label form-label">Diagnosa Penyakit '+(number + 1)+'</label>'+
                    '<select name="selectDiagnosa[]" id="selectDiagnosa'+number+'" class="form-control select-diagnosa">'+
                    '</select>'+
                    '</div>';
               
        htmlRes += '<div class="form-group" id="contText'+number+'">'+
                    '<label for="txtDetailDiagnosa'+number+'" class="control-label form-label">Detail Diagnosa</label>'+
                    '<textarea name="txtDetailDiagnosa[]" cols="3" rows="2" id="txtDetailDiagnosa'+number+'" class="form-control"></textarea>'+
                    '</div>';

        htmlRes += '<div class="form-group text-left" id="contBtn'+number+'"><button class="btn btn-default btn-flat" onclick="hapusForm('+number+')">Hapus Diagnosa '+number+'</button></div>';
      $('#additional-rekmed').append(htmlRes);
      initiateSelect('selectDiagnosa'+number);
      number++;
    });
    getDetailRekamMedis();
});

$('#txtTanggalPemeriksaan').datepicker({
    "format": 'yyyy-mm-dd',
    "locale" : 'id',
});

function hapusForm(numberSelect) {
    //code
    $('#contSelect'+numberSelect).remove();
    $('#contText'+numberSelect).remove();
    $('#contBtn'+numberSelect).remove();
    number--;
}

function resetForms() {
    //code
    $('#frm-detail-rekmed')[0].reset();
    $('#additional-rekmed').empty();
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

function saveRekmed() {
    //code
    $.ajax({
       url : base_url_rekmed+"save-rekam-medis/",
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
             $('#page-detail-rekmed').val(1);
            resetForms();
            getDetailRekamMedis();
            }
       }
    }); 
}

function getDetailRekamMedis() {
    //code
    $.ajax({
       url : base_url_rekmed+"get-detail-poli-umum/",
       type : "POST",
       data : $('#frm-detail-register').serialize()+"&page="+$('#page-detail-rekmed').val()+"&mode_form=true",
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