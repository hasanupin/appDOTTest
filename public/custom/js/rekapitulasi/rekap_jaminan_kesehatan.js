var base_url_modul = global_url+'data-tindakan/';
var infoTable = "";
$( document ).ready(function(){
    
    $('#sendBtn').click(function(){
        getData();
    });

    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });

    $('#btnExportExcel').click(function(){
        exportExcel();
    });
    
});

function getData(){
    $.ajax({
       url : global_url+"mrekapitulasi/rekapitulasi_pengunjung_jamkes/getDataRekapJaminanKesehatan/",
       type : "POST",
       data : $('#frm-rekap-pengunjung').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            $('#result-table-jamkes').html(dataResult);
       }
    }); 
}

function exportExcel(){
     // var urlDownload = global_url+"mrekapitulasi/rekapitulasi_pengunjung_jamkes/downloadExcel/rekap-jaminan-kesehatan/";
  
    var urlDownload = global_url+"mrekapitulasi/rekapitulasi_pengunjung_jamkes/downloadExcel/rekap-jaminan-kesehatan/";
     var id_pelayanan = $('#cmbPoli').val();
   
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date; 
    window.open(linkDownload,'_blank');
        
}