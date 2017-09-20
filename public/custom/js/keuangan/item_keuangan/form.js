$(function() {
	$('#jasa_sarana_currency').html(toCurrency($('#jasa_saranan').val()));
	$('#jasa_pelayanan_currency').html(toCurrency($('#jasa_pelayanan').val()));
	totalTarif();

	$('#jasa_saranan').keyup(function() {
		totalTarif();
		$('#jasa_sarana_currency').html(toCurrency($(this).val()));
	});

	$('#jasa_pelayanan').keyup(function() {
		totalTarif();
		$('#jasa_pelayanan_currency').html(toCurrency($(this).val()));
	});

	function totalTarif() {
		var jasa_saranan = parseFloat($('#jasa_saranan').val());
		if (!jasa_saranan) { jasa_saranan = 0 }
		var jasa_pelayanan = parseFloat($('#jasa_pelayanan').val());
		if (!jasa_pelayanan) { jasa_pelayanan = 0 }
		tarif = jasa_saranan + jasa_pelayanan;
		$('#tarif').val(tarif);
		$('#tarif_currency').html(toCurrency(tarif));
	}

	function toCurrency(n) {		
		n = parseFloat(n);
	    return n.toFixed(2).replace(/./g, function(c, i, a) {
	        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
	    });
	}

});