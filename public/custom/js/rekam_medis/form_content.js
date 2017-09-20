var base_url_rekmed = global_url+'rekam-medis/';
var base_url_pasien = global_url+'pasien/';

function formatRepo (repo) {
      if (repo.loading) return repo.text;
      var markups = "<div class='select2-result-repository clearfix'>" +
          "<div class='select2-result-repository__meta'>" +
          "<div class='select2-result-repository__title'>" + repo.txtNamaPasien + "</div>"+
          "<div class='select2-result-repository__description'>No Anggota : " + repo.txtNoAnggota + "</div>"
          +"</div></div>";
      ///markups = repo.txtIndonesianName;
      return markups;
}
    
function formatRepoSelection (repo) {
      return repo.txtNamaPasien || repo.text;
}

$( document ).ready(function() {
    var selectPasien = $('#txtIdPasien').select2({
        ajax: {
        url: base_url_pasien+"get-list-data-pasien/",
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
  placeholder: 'Ketikan Nama Pasien / No Anggota',
});
    
    selectPasien.on("change", function (e) {                        
      console.log($('#txtIdPasien').val());
      var idPasien = $('#txtIdPasien').val();
      $.getJSON( base_url_pasien+"get-no-anggota-pasien/"+idPasien, function( data ) {
            console.log(data);
            $('#txtNoRekamMedis').val(data.txtNoAnggota);
      });
   });
    
    
    $('#saveRekamMedis').click(function(){
      if ($('#frm-add-rekam-medis').valid()) {
          //code
          saveRekmed();
        }
    });
    $('#frm-add-rekam-medis').validate({
      ignore : "",
      rules : {
            txtNoRekamMedis : {
                  required : true,  
            },
            txtIdPasien : {
                  required : true,
            },
      }
    });
    
});

function saveRekmed() {
    //code
    $.ajax({
       url : base_url_rekmed+"save-rekam-medis/",
       type : "POST",
       data : $('#frm-add-rekam-medis').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);            
            var status = data['status'];
            var message = data['message'];
            messageBox(status , message , 'alert_message');
            if (status==true) {
             //code
            var idRekamMedis = data['id_rekmed'];
            window.location = base_url_rekmed+"detail-rekam-medis/"+idRekamMedis;
            }
       }
    }); 
}