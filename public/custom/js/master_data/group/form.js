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
            url : base_url_modul+"get-data-pegawai/",
            type : "POST",
            data : function(a){
                a.intIdGroup = $('input[name=intIdGroup]').val();
            }
          }
    });
        
    $('#btnRefresh').click(function(){
        refreshTable();
    });

    $('#btnAddPegawai').click(function(){
        getFormGroup();
    });
});

function refreshTable(){
    data_grid.ajax.reload();
}

function getFormGroup(){
    intIdGroup = $('input[name=intIdGroup]').val();
    $.ajax({
        url : global_url+"master/group/formInputNoHandphone/",
        type : "POST",
        data : "intIdGroup="+intIdGroup,
        success : function(response){
            var data = jQuery.parseJSON(response);
            var htmlRes = data['resHtml'];
            bootbox.dialog({
                size : "big",
                title : "Peringatan",
                message : htmlRes,
            });
        }
    });
}

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

function hapusData(id , intIdGroup) {
        //code
        var url_hapus = global_url+"master/group/hapusPegawai/";
        bootbox.confirm({
            title : "Peringatan",
            message : "Apakah Datah Akah Di Hapus?",
            callback : function(result){
                if(result==true){
                    $.ajax({
                        url : url_hapus , 
                        type : "POST",
                        data : "id="+id+"&intIdGroup="+intIdGroup,
                        success : function(response){
                            var data = jQuery.parseJSON(response);
                            var status = data['status'];
                            var message = data['message'];
                            if(status==true){
                               /// window.location = global_url+"master/group/";
                               refreshTable();
                            }
                        }

                    })
                }
            }
        });
}