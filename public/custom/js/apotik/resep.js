var dataObat = new Array;

$(function() {
  getDataObat();

  $('#txtObat').keypress(function(e) {
    if (e.keyCode == 13) {
      $('#btnTambahObat').click();
      return false;
    }
  });

  $('#btnCariObat').click(function() {
    $.ajax({
      url : '<?= base_url('apotik/pelayanan_resep/cari_obat') ?>?key=' + $('#txtObat').val(),
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

function getDataObat() {
  var html = '';
  $.each(dataObat, function(key, row) {
    if (row['jumlah']) { var jumlah = row['jumlah']; } else { var jumlah = 1 }
    if (row['aturan_minum']) { var aturan_minum = row['aturan_minum']; } else { var aturan_minum = ''}    
    html += '<tr>';
      html +='<td><input type="hidden" name="obat['+key+'][kode_obat]" value="'+row['kode_obat']+'">'+row['kode_obat']+' - '+row['nama_obat']+'</td>';
      html +='<td>'+row['kemasan']+'</td>';
      html +='<td><input type="text" name="obat['+key+'][jumlah]" value="'+jumlah+'" class="form-control text-center input-sm"/></td>';
      html +='<td><input type="text" name="obat['+key+'][aturan_minum]" value="'+aturan_minum+'" class="form-control input-sm"/></td>';
      html +='<td><button type="button" onclick="hapusObat('+key+')" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button></td>';
    html += '</tr>';
  });
  $('#tblObat tbody').html(html);
}


function tambahObat(obat) {  
  var parse = obat.split('*');
  if (parse.length == 2) {
    var jumlah = parse[0];
    obat = parse[1];
  }  
  $('#txtObat').val('');
  $.ajax({
    url : '<?= base_url('apotik/pelayanan_resep/tambah_obat') ?>',
    type : 'post',
    data : 'obat=' + obat,
    dataType : 'json',
    success : function(response) {
      if (response.length > 1) {
        $('#btnCariObat').click();
      } else {
        if (response[0]) {
          if (jumlah) {
            response[0]['jumlah'] = jumlah;
          }
          dataObat.push(response[0]);
          getDataObat();
        } else {
          alert('Obat tidak ditemukan');
        }
      }
    }
  });
}

function hapusObat(key) {
  dataObat.splice(key, 1);  
  getDataObat();
}