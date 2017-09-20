var base_url_modul = global_url+'data-group/';

var data_grid = "";
$( document ).ready(function(){
    data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "processing" : true,
          ajax : {
            url : base_url_modul+"retrieve-data/",
            type : "POST"
          }
    });
        
    $('#refreshBtn').click(function(){
        data_grid.ajax.reload();
    });
    $('#btnSimpanGroup').click(function(){
        simpanData();
    });
});

function detailData(id){
    $.ajax({
         url : global_url+"master/group/getDetail/",
         type : "POST",
         data : "id="+id,
         success : function(response){
             var data = jQuery.parseJSON(response);
             console.log(data);
             $('input[name=intIdGroup]').val(data['intIdGroup']);
             $('#txtGroupName').val(data['txtGroupName']);
             $('#bitGroupType').val(data['bitGroupType']);
             $('#bitGroupStatus').val(data['bitGroupStatus']);
         }
    });
}

function simpanData(){
    var txtGroupName = $('#txtGroupName').val();
    if(txtGroupName!=""){
        $.ajax({
         url : global_url+"master/group/simpanData/",
         type : "POST",
         data : $('#frm-group').serialize(),
         success : function(response){
             var data = jQuery.parseJSON(response);
             var status = data['status'];
             var message = data['message']; 
             alertPopUp(status, message , base_url_modul);
             if(status==true){
                 $('#frm-group')[0].reset();
                 data_grid.ajax.reload();
             }
         }
        });
    }else{
        alertPopUp(false, "Nama Group Belum Di Isi" , "");
    }
}

function hapusData(id) {
    //code
    var r = confirm("Apakah Data Akan Di Hapus??");
    if (r==true) {
        //code
        var url_hapus = global_url+"master/group/hapusData/";
        deleteRedirect(url_hapus , id , base_url_modul);
    }
    
}