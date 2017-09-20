$(function(){

});

function printStruk(idKunjungan , idItem){
    $.ajax({
        url : global_url + 'printpage/printInvoiceRawatInap/',
        type : "POST",
        data : "idKunjungan="+idKunjungan+"&idItem="+idItem,
        dataType : "html",
        success : function(response){

        }
    });
}