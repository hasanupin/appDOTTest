var base_url_form = global_url+'detail-menu/';
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
           txtLevel : {
                  required : true,
           },
    },messages : {
      
    }
  });

});

function checkForm(no){
  if($('#frm_checkbox_'+no).is(':checked')){
    $('#frm_checkbox_ins_').prop('checked' , 'checked');
    $('#frm_checkbox_upd_').prop('checked' , 'checked');
    $('#frm_checkbox_del_').prop('checked' , 'checked');
  }else{
    $('#frm_checkbox_ins_').removeAttr('checked');
    $('#frm_checkbox_upd_').removeAttr('checked');
    $('#frm_checkbox_del_').removeAttr('checked');
  }
}

function hapusData(id) {
    //code
    var url_hapus = base_url_form+"delete/";
    deleteRedirect(url_hapus , id , base_url_form);
}


    
