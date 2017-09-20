var data_grid = "";
var data_grid_inap = "";
$(function(){
     getDataAntrian();
     getTotalKunjungan();
     data_grid = $('#table-antrian').DataTable({
          "paging": false,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": false,
          "processing": true,
           ajax : {
           url : global_url+"antrian/getDataAntrian",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.intPoli = $('#intIdPoli').val();
                d.txtTanggal = $('input[name=txtTanggal]').val();
            }
          }
    });

    $('#txtTanggal').change(function(){
        data_grid.ajax.reload();
    });

    $('#intIdPoli').change(function(){
        data_grid.ajax.reload();
    });

    $('#txtTanggal').datepicker({
        autoclose : 'true',
        format : "yyyy-mm-dd"
    });

    setInterval(function () {
      getClock();
    }, 1000);
    

    setInterval(function () {
        getDataAntrian();
        getTotalKunjungan();
        data_grid.ajax.reload();
    }, 5000);
});

function getClock() {
    //code
    var jam_sekarang = getTimeClock();
	var tanggal_sekarang = getTimeClock();
    $('#jam-sekarang').html(jam_sekarang);
    $('#tanggal-sekarang').html(tanggal_sekarang);
}

function getDataAntrian(){
    var intIdPoli = $('#intIdPoli').val();
    var dateAntrian = $('input[name=txtTanggal]').val();
    $.ajax({
            url : global_url + 'antrian/getDashboardAntrian/',
            data : "date="+dateAntrian+"&poli="+intIdPoli,
            type : "POST",
            success : function(response) {
                var data = jQuery.parseJSON(response);
                var jumlahTunggu = data['jumlah_angka'];
                var noAntrianDiLayani = data['no_antrian_dilayani'];
                $('#kunjungan_antrian').html(noAntrianDiLayani);
                $('#waiting_kunjungan_list').html(jumlahTunggu);
        }
    });
}

function getTotalKunjungan(){
    var dateAntrian = $('input[name=txtTanggal]').val();
    var intIdPoli = $('#intIdPoli').val();
    $.ajax({
            url : global_url + 'antrian/getTotalKunjungan/',
            data : "date="+dateAntrian+"&poli="+intIdPoli,
            type : "POST",
            success : function(response) {
                var data = jQuery.parseJSON(response);
                var jumlahAngka = data['jumlah_dilayani'];
                $('#kunjungan-total').html(jumlahAngka);
        }
    });
}