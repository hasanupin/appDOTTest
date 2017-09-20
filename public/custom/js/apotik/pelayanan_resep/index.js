var rowsObat = $('#tblObat tb tr').length;

$(function() {  

  $('.select2').select2();

  $('#tgl_pengambilan').datepicker({
    format : 'dd-mm-yyyy'
  });

  $('#id_desa').select2();

  $('#txtObat').keypress(function(e) {
    if (e.keyCode == 13) {
      $('#btnTambahObat').click();
      return false;
    }
  });

  $('#btnCariObat').click(function() {
    $.ajax({
      url : global_url + 'apotik/'+$('#form-pelayanan').data('apotik')+'/pelayanan/resep/cari_obat?key=' + $('#txtObat').val(),
      success : function(response) {
         bootbox.dialog({
          title : 'Cari Obat',
          message : response
        });
      }
    });   
  });

  $('#btnTambahObat').click(function() {
    tambahObat($('#txtObat').val());
  });

});

/*function tambahObat(obat) {  
  $('#txtObat').val('');
  $.ajax({
    url : global_url + 'apotik/'+$('#form-pelayanan').data('apotik')+'/pelayanan/resep/tambah_obat',
    type : 'post',
    data : 'obat=' + obat,
    dataType : 'json',
    success : function(response) {
      if (response.length > 1) {
        $('#btnCariObat').click();
      } else {
        if (response[0]) {                              
          rowsObat++;
          html = '<tr data-row="'+rowsObat+'">';
            html +='<td><input type="hidden" name="obat['+rowsObat+'][id_obat]" value="'+response[0]['id']+'"><input type="hidden" name="obat['+rowsObat+'][kode_obat]" value="'+response[0]['kode_obat']+'"><input type="hidden" name="obat['+rowsObat+'][nama_obat]" value="'+response[0]['nama_obat']+'">'+response[0]['kode_obat']+' - '+response[0]['nama_obat']+'</td>';
            html +='<td><input type="hidden" name="obat['+rowsObat+'][id_kemasan]" value="'+response[0]['id_kemasan']+'"><input type="hidden" name="obat['+rowsObat+'][kemasan]" value="'+response[0]['kemasan']+'">'+response[0]['kemasan']+'</td>';
            html +='<td><input type="text" name="obat['+rowsObat+'][jml]" value="1" class="form-control text-center input-sm"/></td>';      
            html +='<td><input type="text" name="obat['+rowsObat+'][aturan_minum]" value="" class="form-control text-center input-sm"/></td>';      
            html +='<td><button type="button" onclick="hapusObat('+rowsObat+')" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button></td>';
          html += '</tr>';
          $('#tblObat tbody').append(html);
        } else {
          alert('Obat tidak ditemukan');
        }
      }
    }
  });
}*/

function hapusObat(id) {
  $('#tblObat tbody [data-row="'+id+'"]').remove();
=======
=======
>>>>>>> parent of 5ccbd09... Pull
=======
>>>>>>> parent of 5ccbd09... Pull
var rowsObat = $('#tblObat tb tr').length;

$(function() {  

  $('#tgl_pengambilan').datepicker({
    format : 'dd-mm-yyyy'
  });

  $('#id_desa').select2();

  $('#txtObat').keypress(function(e) {
    if (e.keyCode == 13) {
      $('#btnTambahObat').click();
      return false;
    }
  });

  $('#btnCariObat').click(function() {
    $.ajax({
      url : global_url + 'apotik/'+$('#form-pelayanan').data('apotik')+'/pelayanan/resep/cari_obat?key=' + $('#txtObat').val(),
      success : function(response) {
         bootbox.dialog({
          title : 'Cari Obat',
          message : response
        });
      }
    });   
  });

  $('#btnTambahObat').click(function() {
    tambahObat($('#txtObat').val());
  });

});

/*function tambahObat(obat) {  
  $('#txtObat').val('');
  $.ajax({
    url : global_url + 'apotik/'+$('#form-pelayanan').data('apotik')+'/pelayanan/resep/tambah_obat',
    type : 'post',
    data : 'obat=' + obat,
    dataType : 'json',
    success : function(response) {
      if (response.length > 1) {
        $('#btnCariObat').click();
      } else {
        if (response[0]) {                              
          rowsObat++;
          html = '<tr data-row="'+rowsObat+'">';
            html +='<td><input type="hidden" name="obat['+rowsObat+'][id_obat]" value="'+response[0]['id']+'"><input type="hidden" name="obat['+rowsObat+'][kode_obat]" value="'+response[0]['kode_obat']+'"><input type="hidden" name="obat['+rowsObat+'][nama_obat]" value="'+response[0]['nama_obat']+'">'+response[0]['kode_obat']+' - '+response[0]['nama_obat']+'</td>';
            html +='<td><input type="hidden" name="obat['+rowsObat+'][id_kemasan]" value="'+response[0]['id_kemasan']+'"><input type="hidden" name="obat['+rowsObat+'][kemasan]" value="'+response[0]['kemasan']+'">'+response[0]['kemasan']+'</td>';
            html +='<td><input type="text" name="obat['+rowsObat+'][jml]" value="1" class="form-control text-center input-sm"/></td>';      
            html +='<td><input type="text" name="obat['+rowsObat+'][aturan_minum]" value="" class="form-control text-center input-sm"/></td>';      
            html +='<td><button type="button" onclick="hapusObat('+rowsObat+')" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button></td>';
          html += '</tr>';
          $('#tblObat tbody').append(html);
        } else {
          alert('Obat tidak ditemukan');
        }
      }
    }
  });
}*/

function hapusObat(id) {
  $('#tblObat tbody [data-row="'+id+'"]').remove();
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5ccbd0902153f36e993c2668af2dc5b97a2f68ab
=======
>>>>>>> parent of 5ccbd09... Pull
=======
>>>>>>> parent of 5ccbd09... Pull
}