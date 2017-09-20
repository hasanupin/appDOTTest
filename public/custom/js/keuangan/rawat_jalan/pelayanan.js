var rowsLayanan = $('#tblLayanan tbody tr').length;

$(function() {  

  countGrandTotal();
  $('#tgl_bayar').datepicker({
    format : 'yyyy-mm-dd'
  });

  $('[name="bitBebasBiaya"]').click(function() {
    countGrandTotal();    
  });

  $('#btnBayar').click(function() {    
    countGrandTotal();
    $('#frmBayar').modal('show');
  });

  $('#txtLayanan').keypress(function(e) {
    if (e.keyCode == 13) {
      $('#btnTambahLayanan').click();
      return false;
    }
  });

  $('#btnCariLayanan').click(function() {
    $.ajax({
      url : global_url + 'keuangan/rawat_inap/pelayanan/cari_layanan',
      success : function(response) {
         bootbox.dialog({
          title : 'Cari Layanan',
          message : response
        });
      }
    });   
  });

  $('#btnTambahLayanan').click(function() {
    tambahLayanan($('#txtLayanan').val());
  });

  $('#bayar').keyup(function() {
    var grandTotal = $('#grandTotal').val();
    grandTotal = parseFloat(grandTotal);
    if (!grandTotal) {
      grandTotal = 0;
    }
    var bayar = $('#bayar').val();
    bayar = parseFloat(bayar);
    if (!bayar) {
      bayar = 0;
    }
    var kembalian = bayar - grandTotal;
    $('#kembalian').val(toCurrency(kembalian));
  });

});

function tambahLayanan(layanan) {  
  $('#txtLayanan').val('');
  $.ajax({
    url : global_url + 'keuangan/rawat_inap/pelayanan/tambah_layanan',
    type : 'post',
    data : 'jamkes='+$('[name="intIdJaminanKesehatan"]').val()+'&layanan=' + layanan,
    dataType : 'json',
    success : function(response) {
      if (response.length > 1) {
        $('#btnCariLayanan').click();
      } else {
        if (response[0]) {                              
          rowsLayanan++;
          var jasa_sarana = response[0]['jasa_sarana'];
          jasa_sarana = parseFloat(jasa_sarana);
          var jasa_pelayanan = response[0]['jasa_pelayanan'];
          jasa_pelayanan = parseFloat(jasa_pelayanan);
          var tarif = jasa_sarana + jasa_pelayanan;
          var total = tarif * 1;
          html = '<tr data-row="'+rowsLayanan+'">';
            html +='<td><input type="hidden" name="layanan['+rowsLayanan+'][id]" value="'+response[0]['id']+'"><input type="hidden" name="layanan['+rowsLayanan+'][nama_item]" value="'+response[0]['nama_item']+'">'+response[0]['nama_item']+'</td>';                  
            html +='<td><input type="text" name="layanan['+rowsLayanan+'][jasa_sarana]" value="'+response[0]['jasa_sarana']+'" class="form-control text-right input-sm" onkeyup="countTarifTotal('+rowsLayanan+')"/></td>';      
            html +='<td><input type="text" name="layanan['+rowsLayanan+'][jasa_pelayanan]" value="'+response[0]['jasa_pelayanan']+'" class="form-control text-right input-sm" onkeyup="countTarifTotal('+rowsLayanan+')"/></td>';      
            html +='<td data-name="tarif" class="text-right">'+toCurrency(tarif)+'</td>';      
            html +='<td><input type="text" name="layanan['+rowsLayanan+'][jml]" value="1" class="form-control text-center input-sm" onkeyup="countTarifTotal('+rowsLayanan+')"/></td>';                  
            html +='<td data-name="total" class="text-right">'+toCurrency(total)+'</td>';      
            html +='<td><button type="button" onclick="hapusLayanan('+rowsLayanan+')" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button></td>';
          html += '</tr>';
          $('#tblLayanan tbody').append(html);
          countGrandTotal();          
          $('.tgl_tindakan').datepicker({
            format : 'yyyy-mm-dd'
          });
        } else {
          alert('Layanan tidak ditemukan');
        }
      }
    }
  });
}

function countTarifTotal(row) {  
  var jasa_sarana = $('[name="layanan['+row+'][jasa_sarana]"]').val();
  jasa_sarana = parseFloat(jasa_sarana);
  if (!jasa_sarana) {
    jasa_sarana = 0;
  }
  var jasa_pelayanan = $('[name="layanan['+row+'][jasa_pelayanan]"]').val();  
  jasa_pelayanan = parseFloat(jasa_pelayanan);
  if (!jasa_pelayanan) {
    jasa_pelayanan = 0;
  }
  var jml = $('[name="layanan['+row+'][jml]"]').val();
  jml = parseFloat(jml);
  if (!jml) {
    jml = 0;
  }
  var tarif = jasa_sarana + jasa_pelayanan;
  var total = tarif * jml;
  $('#tblLayanan tbody [data-row="'+row+'"] [data-name="tarif"]').html(toCurrency(tarif));
  $('#tblLayanan tbody [data-row="'+row+'"] [data-name="total"]').html(toCurrency(total));
  countGrandTotal();
}

function countGrandTotal() {
  var grandTotal = 0;
  $.each($('#tblLayanan tbody tr'), function(key, elem) {
    var row = $(elem).data('row');    
    var jasa_sarana = $('[name="layanan['+row+'][jasa_sarana]"]').val();
    jasa_sarana = parseFloat(jasa_sarana);
    if (!jasa_sarana) {
      jasa_sarana = 0;
    }
    var jasa_pelayanan = $('[name="layanan['+row+'][jasa_pelayanan]"]').val();  
    jasa_pelayanan = parseFloat(jasa_pelayanan);
    if (!jasa_pelayanan) {
      jasa_pelayanan = 0;
    }
    var jml = $('[name="layanan['+row+'][jml]"]').val();
    jml = parseFloat(jml);
    if (!jml) {
      jml = 0;
    }    
    var tarif = jasa_sarana + jasa_pelayanan;
    var total = tarif * jml;    
    grandTotal += total;
  });    
  $('#grandTotal').val(grandTotal);
  $('#grandTotalLabel').html(toCurrency(grandTotal));  
  if ($('[name="bitBebasBiaya"]').prop('checked')) {
    $('#tagihan').val(toCurrency(0));
  } else {
    $('#tagihan').val(toCurrency(grandTotal));
  }
}

function hapusLayanan(id) {
  $('#tblLayanan tbody [data-row="'+id+'"]').remove();
  countGrandTotal();
}

function simpanPembayaran() {
  if (!$('[name="bitBebasBiaya"]').prop('checked')) {
    var grandTotal = $('#grandTotal').val();
    grandTotal = parseFloat(grandTotal);
    if (!grandTotal) {
      grandTotal = 0;
    }
    var bayar = $('#bayar').val();
    bayar = parseFloat(bayar);
    if (!bayar) {
      bayar = 0;
    }
    var kembalian = bayar - grandTotal;
  } else {
      var grandTotal = 0;
      var bayar = 0;
  }
  if (bayar < grandTotal) {
    alert('Pembayaran tidak cukup');
    return false;
  } else {
    return confirm('Apakah anda yakin akan menyimpan pembayaran ini?');
  }
}