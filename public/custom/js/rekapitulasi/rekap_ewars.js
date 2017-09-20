var base_url_penyakit = global_url+"data-penyakit/";
var infoTable = "";

$( document ).ready(function(){
    var data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": true,
          "processing" : true,
          "ajax" : {
            "url" : global_url+"mrekapitulasi/rekapitulasi_ewars/getRekapDataPenyakitEwars/",
            "type" : "POST",
            "data" : function (postParams) {
                postParams.id_pelayanan = $('#cmbPoli').val();
                postParams.start_date = $('#datepicker1').val();
                postParams.end_date = $('#datepicker2').val();
                postParams.data_penyakit = $('#cmbPenyakit').val();
            }
          }
    });

    $('#cmbPenyakit').select2({
        ajax: {
            url: base_url_penyakit+"get-list-penyakit/",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                q: params.term, // search term
                page: params.page
                };
            },
            processResults: function (data, params) {
            params.page = params.page || 1;
            return {
            results: data.items,
            pagination: {
                more: (params.page * 20) < data.total_count
            }
            };
            },
            cache : true,
        },
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection, // omitted for brevity, see the source of this page
        placeholder: 'Ketikan Nama Penyakit / Kode ICD',
    });
    
    $('#sendBtn').click(function(){
        data_grid.ajax.reload();
        infoTable = data_grid.page.info();
    });

    data_grid.on('draw.dt', function () {
        ///console.log( 'Redraw occurred at: '+new Date().getTime() );
        infoTable = data_grid.page.info();
    });

    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });

    $('#btnExportExcel').click(function(){
        exportExcel();
    });
    
});

function exportExcel(){
    var urlDownload = global_url+"mrekapitulasi/rekapitulasi_ewars/downloadExcel/rekap-data-penyakit-tertentu/";
    var id_pelayanan = $('#cmbPoli').val();
    var start_date = $('#datepicker1').val();
    var end_date = $('#datepicker2').val();
    var cmbPenyakitList = $('#cmbPenyakit').val();
    var linkDownload = urlDownload+id_pelayanan+"/"+start_date+"/"+end_date+"/"+cmbPenyakitList;
    var linkDownload = linkDownload.replace(",","%");
    window.open(linkDownload,'_blank');    
}