var base_url_modul = global_url + '/users/'
var data_grid = "";
$( document ).ready(function(){
    data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          ajax : {
            url : base_url_modul+"retrieve-data/",
            type : "POST"
          }
    });

    $('#btnAdd').click(function(){
        $.ajax({
            url : base_url_modul + 'create/',
            success : function(response) {
                createDialog(response);
            }
        });
    });
});

function edit(id){
    $.ajax({
        url : base_url_modul+id,
        success : function(response) {
            createDialog(response);
        }
    });
}

function reload(){
    data_grid.ajax.reload();
}
function createDialog(response){
    bootbox.dialog({
        title : 'Form Tambah',
        message : response,
        size : 'large'
      });
}

function deleteData(id){
    bootbox.confirm("Apakah Anda Akan Menghapus Data", 
    function(result){ 
        if(result==true){
            $.ajax({
                url : global_url + "/users/" + id,
                type : "DELETE",
                success : function msg(result){
                    var data = $.parseJSON(result);
                    console.log(data);
                    var status = data['status'];
                    var message = data['message'];
                    $('.bootbox').modal("hide");
                    alertPopUp(status , message , "");
                    reload();
                }
            });
        }
     });
}

function alertPopUp(status,message,urlreturn){
    var classDiv = "modal-success";
    if(!status){
        classDiv = "modal-danger";
    }

    bootbox.alert({
        size : "small",
        title : "Peringatan",
        message : message,
        className : classDiv,
        callback : function(){
            if(urlreturn!="" && status==true){
                window.location = urlreturn;
            }
            
        }
    });
}