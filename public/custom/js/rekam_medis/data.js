var base_url_rekmed = global_url+'rekam-medis/';
var base_url_penyakit = global_url+"data-penyakit/";
var data_grid = "";
var data_grid2 = "";
$( document ).ready(function(){
    data_grid = $('#table-data').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "processing" : true,
          "autoWidth": true,
          "iDisplayLength": 20,
          serverSide: true,
          ajax : {
            url : base_url_rekmed+'get-data-rekam-medis/',
            type : "POST",
            data : function(d) { 
                d.dtStartDate = $('#filterTanggalAwal').val();
                d.dtEndDate = $('#filterTanggalAkhir').val();
                d.intIdPelayanan = $('#intIdPelayanan').val();
                d.selectDiagnosa = $('#selectDiagnosa').val();   
        }
          }
    });

    $('#searchBtn').click(function(){
        data_grid.ajax.reload();
    });

    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });
    
     $('#selectDiagnosa').select2({
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

});