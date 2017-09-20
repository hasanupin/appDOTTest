
var base_url_pasien = global_url+'pasien/';
var base_url_register = global_url+'loket-rawat-inap/';


$( document ).ready(function() {
   $('#searchPasien').click(function(){
      if ($('#id_pasien').val()!='') {
        //code
        getDataPasien();
      }
   });
   $(window).keypress(function(e) {
       var key = e.which;
       if (key==13) {
        //code
        e.preventDefault();
        getDataPasien();
       }
   });
});

function getDataPasien() {
    //code
    $.ajax({
        url : base_url_pasien+"getDataPasienSearch/",
        type : "POST",
        data : $('#frm-search-pasien').serialize(),
        dataType : "html",
        success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
            var data_list = data['data'];
            var html = '';
            if (status==true) {
                //code
                for (var indexArray = 0; indexArray < data_list.length;indexArray++) {
                    //code
                    html += '<tr>';
                    html += '<td>'+data_list[indexArray][0]+'</td>';
                    html += '<td>'+data_list[indexArray][1]+'</td>';
                    html += '<td>'+data_list[indexArray][3]+'</td>';
                    html += '<td>'+data_list[indexArray][4]+'</td>';
                    html += '<td>'+data_list[indexArray][5]+'</td>';
                    html += '<td><a href=\''+base_url_register+"daftar/"+data_list[indexArray][6]+'\' class="btn btn-success">Daftarkan</a></td>';
                    html += '</tr>';
                }
                $('#result-search-pasien').html(html);
            }
        }
    });
}
