$(function() {
    $('#tgl').datepicker({
        format : 'dd-mm-yyyy'
    });
});
$('#jml').keyup(function() {
    stok_akhir();
})
function stok_akhir() {
    var jml = parseFloat($('#jml').val());
    if (!jml) {jml = 0}
    var stok = parseFloat($('#stok').val());
    if (!stok) {stok = 0}
    $('#stok_akhir').val(jml + stok);
}
