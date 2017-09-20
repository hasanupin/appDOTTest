var base_url_poli = global_url+"pelayanan/poli-ibu/";
var base_url_penyakit = global_url+"data-penyakit/";
var base_url_rekam_medis = global_url+"rekam-medis-ibu/";
var base_url_register = global_url+"loket/";
var base_url_detail_rekmed = base_url_rekam_medis+"get-detail-rekmed-ibu/";

var number = 1;
var statusQueue = 2;
var statusDone = 3;
var data_grid ="";

$(function() {
    ///getDataTables(); 
    $('#txtTanggalPemeriksaan').datepicker({
      format : 'yyyy-mm-dd', 
    });
    
    $('#add-rekam-medis').click(function(){
       $('#modal-ibu').modal('show');
    });
    
    $('#saveData').click(function(){
       if($('#frm-add-rekam-medis-ibu').valid()) {
            saveRekmed();
       }
    });
    
    $('#frm-add-rekam-medis-ibu').validate({
        ignore : "",
        rules : {
            txtKehamilanKe : {
                required : true,
            },
            txtNoIndeks : {
                required : true,
            },
        }
    });
    data_grid = $('#table-riwayat-kehamilan').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_detail_rekmed,
            type : "POST",
            data : function(d){
                d.txtIdRekamMedis = $('input[name=txtIdRekamMedis]').val();
                d.txtIdKunjungan = $('input[name=txtIdKunjungan]').val();
                d.jenisPelayanan = 'pelayanan';
            }
          }
    });
});

function saveRekmed() {
    //code
    $.ajax({
       url : base_url_rekam_medis+"save-rekam-medis/",
       type : "POST",
       data : $('#frm-detail-register').serialize() +"&"+ $('#frm-add-rekam-medis-ibu').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var message = data['message'];
            messageBox(status , message , 'alert_message');
            if (status==true) {
             //code
             ///getDataTables();
             data_grid.ajax.reload();
            }
       }
    }); 
}




/// Form Add Diagnosa

