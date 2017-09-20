var data_grid_antri;
var data_grid_sedang;
var data_grid_selesai;
var data_grid_rujuk;
$(function(){

    $('#registerButton').click(function(){
        getRefresh();
    });
    
    data_grid_antri = $('#table-antri').DataTable({
        "paging" : false,
           ajax : {
           url : global_url+"poli_gizi/Index/getDataRegisterGizi/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.dtStart = $('#txtTanggal').val();
                d.bitIsPoli = 1;
            }
          }
    });

    data_grid_sedang = $('#table-sedang').DataTable({
          "paging" : false,
           ajax : {
           url : global_url+"poli_gizi/Index/getDataRegisterGizi/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.dtStart = $('#txtTanggal').val();
                d.bitIsPoli = 2;
            }
          }
    });

    data_grid_selesai = $('#table-selesai').DataTable({
          "paging" : false,
           ajax : {
           url : global_url+"poli_gizi/Index/getDataRegisterGizi/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.dtStart = $('#txtTanggal').val();
                d.bitIsPoli = 3;
            }
          }
    });

    data_grid_rujuk = $('#table-rujukan').DataTable({
          "paging" : false,
           ajax : {
           url : global_url+"poli_gizi/Index/getDataRegisterGizi/",
           type : "POST",
           dataSrc: 'data',
           data : function(d){
                d.dtStart = $('#txtTanggal').val();
                d.bitIsPoli = 4;
            
           }
        }
    });

    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        autoclose : true
    });

    setInterval(function () {
        getRefresh();
    }, 10000);

    setInterval(function () {
      getClock();
    }, 1000);


});

function getRefresh(){
    data_grid_antri.ajax.reload();
    data_grid_sedang.ajax.reload();
    data_grid_selesai.ajax.reload();
    data_grid_rujuk.ajax.reload();
}

function getClock() {
    //code
    var jam_sekarang = getTimeClock();
    $('#jam-sekarang').html(jam_sekarang);
}