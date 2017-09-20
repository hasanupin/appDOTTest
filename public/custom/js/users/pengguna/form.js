var base_url_form = global_url+'pengguna/';
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
           txtUserName : {
                  required : true,
           },
           txtPassword : {
                required : true,
           },
           txtRePassword : {
                equalTo : txtPassword,
           },
           txtEmail : {
                required : true,
           }
    },messages : {
      
    }
  });

});

function hapusData(id) {
    //code
    var url_hapus = base_url_form+"delete/";
    deleteRedirect(url_hapus , id , base_url_form);
}


    
