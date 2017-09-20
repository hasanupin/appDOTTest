var base_url_form = global_url+'level/detail-menu/';
$( document ).ready(function() {
  
  $('#saveLevelBtn').click(function(e){
    e.preventDefault();
    if ($('#frm-level-akses').valid()) {
        //code
        saveDataMenuLevel();
    }
  });
  
  $('#frm-input').validate({
    ignore : "",
    rules : {
           'menu[]' : {
                  required : true,
           },
    },messages : {
      
    }
  });
  
$("#btnCheckAll").click(function () {
    if($("#frm-level-akses input:checkbox").is(':checked')){
        $("#frm-level-akses input:checkbox").prop('checked', false);    
    }else{
        $("#frm-level-akses input:checkbox").prop('checked', true);
    }
    
});

});



function checkForm(no){
    
  if($('#frm_checkbox_'+no).is(':checked')){
    $('#frm_checkbox_ins_'+no).prop('checked' , true);
    $('#frm_checkbox_upd_'+no).prop('checked' , true);
    $('#frm_checkbox_del_'+no).prop('checked' , true);
  }else{
    $('#frm_checkbox_ins_'+no).removeAttr('checked');
    $('#frm_checkbox_upd_'+no).removeAttr('checked');
    $('#frm_checkbox_del_'+no).removeAttr('checked');
  }
}

function saveDataMenuLevel(){
    $.ajax({
        url : base_url_form+"simpan-data/",
        type : "POST",
        data : $('#frm-input').serialize() + "&" + $('#frm-level-akses').serialize(),
        dataType : "html",
        success: function msg(res){
            var data = jQuery.parseJSON(res);
            console.log(data);
            var status = data['status'];
            var message = data['message'];
            if (status==true) {
                //code
                bootbox.alert({
                    size : 'small',
                    message : message,
                    callback: function(){ 
                        window.location = global_url+"level/";
                    }
                })
                
            }
        }
    });
}

function hapusData(id) {
    //code
    var url_hapus = base_url_form+"delete/";
    deleteRedirect(url_hapus , id , base_url_form);
}


    
