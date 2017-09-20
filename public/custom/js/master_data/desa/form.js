var base_url_form = global_url+'data-desa/';
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
           nama_desa : {
                  required : true,
           },
    },messages : {
      
    }
  });

  $('#btnAddPetugas').click(function(){
    var num = $('.row-form-petugas').length;
    var newNum = new Number(num + 1);
    var newSection = $('#row-form-petugas-' + num).clone().attr("id" , "row-form-petugas-" + newNum);
    newSection.children(":first").children(":first").attr("id","listPegawai"+newNum).val("");
    newSection.children(":nth-child(2)").html('<button type="button" onclick="hapusPetugas('+newNum+')" class="btn btn-danger btn-flat" id="btnHapusPetugas'+newNum+'"><i class="fa fa-trash"></i> Hapus</button>');
//    console.log(newSection);
    $('#cont-list-petugas').last().append(newSection);
  });
});

function hapusPetugas(num){
  console.log(num);
  $('#row-form-petugas-' + num).remove();
  
}

function hapusData(id) {
    //code
    var url_hapus = base_url_form+"delete/";
    deleteRedirect(url_hapus , id , base_url_form);
}


    
