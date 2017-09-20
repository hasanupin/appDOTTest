var base_url_form = global_url+'data-pelayanan/';
$( document ).ready(function() {
  
  $('#saveBtn').click(function(e){
    e.preventDefault();
    if ($('#frm-input').valid()) {
        //code
        saveRedirect(base_url_form+"simpan-data/" , "frm-input" , base_url_form , "Data Gagal Di Simpan");	
    }
  });
  
  $('#frm-input').validate({
    ignore : "",
    rules : {
           txtNama : {
                  required : true,
           },
           
           txtSingkatan : {
                required : true,
           }
    },messages : {
      
    }
  });
});

function getListPoliBPJS(){
  
  $.ajax({
    url : global_url + 'bpjs/poli/getMasterPoli/',
    type : "POST",  
    success : function(response){
      var data = jQuery.parseJSON(response);
      var status = data['status'];
      if(status){
        $('#selectKodeBPJS').html(data['html']);
      }
    }
  });
}

function hapusData(id) {
    //code
    var url_hapus = base_url_form+"delete/";
    deleteRedirect(url_hapus , id , base_url_form);
}


    
