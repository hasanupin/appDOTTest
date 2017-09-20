var base_url_form = global_url+'pengguna/';
$( document ).ready(function() {
  
  $('#saveBtn').click(function(e){
    e.preventDefault();
    if ($('#frm-input').valid()) {
        //code
        ///saveRedirect(base_url_form+"check-password/" , "frm-input" , base_url_form , "Data Gagal Di Simpan");
        saveData();
    }
  });
  
  $('#frm-input').validate({
    ignore : "",
    rules : {
           txtOldPassword : {
                  required : true,
           },
           txtPassword : {
                required : true,
           },
           txtRePassword : {
                equalTo : txtPassword,
           },
    },messages : {
      
    }
  });

});

function saveData(){
    $.ajax({
       url : base_url_form+"check-password/",
       type : "POST",
       data : $('#frm-input').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);            
            var status = data['status'];
            var message = data['message'];
            var link = data['link_index'];
            alertPopUp(status , message , link);   
       }
    });
}


    
