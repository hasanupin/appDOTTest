var base_url_modul = global_url+'data-tindakan/';
var infoTable = "";
$( document ).ready(function(){
    
    $('#sendBtn').click(function(){
        getDataJumlahPengunjung();
    });

    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });

    $('#btnExportExcel').click(function(){
        exportExcel();
    });
    
});

function getDataJumlahPengunjung(){
    $.ajax({
       url : global_url+"mrekapitulasi/rekapitulasi_jumlah_pengunjung/getDataRekapJumlahPengunjung/",
       type : "POST",
       data : $('#frm-rekap-pengunjung').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var dataResult = data['data'];
            
            if (status==true) {
                //code
                var htmlRes = "";
                if (dataResult.length > 0) {
                    for(var indexData = 0 ; indexData<dataResult.length;indexData++){
                        htmlRes += "<tr>";
                        htmlRes += '<td>'+dataResult[indexData]['NAMA_PELAYANAN']+'</td>';
                        htmlRes += '<td>'+dataResult[indexData]['jumlah']+'</td>';
                        htmlRes += '<td>'+dataResult[indexData]['jumlah_antri']+'</td>';
                        htmlRes += '<td>'+dataResult[indexData]['jumlah_sedang_dilayani']+'</td>';
                        htmlRes += '<td>'+dataResult[indexData]['jumlah_selesai']+'</td>';
                        htmlRes += '<td>'+dataResult[indexData]['jumlah_rujukan']+'</td>';
                        htmlRes += "</tr>";
                    }
                }
                $('#results-jumlah-pengunjung').html(htmlRes);
            }
       }
    }); 
}

function exportExcel(){
    //var urlDownload = global_url+"rekapitulasi/downloadExcel/jumlah-pengunjung";
    var urlDownload = global_url+"mrekapitulasi/rekapitulasi_jumlah_pengunjung/downloadExcel/rekap-jumlah-pengunjung/";
    var id_pelayanan = $('#cmbPoli').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();

    if($('#results-jumlah-pengunjung').length > 0){
        var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date; 
        window.open(linkDownload,'_blank');
    }
    
        
    
        
}