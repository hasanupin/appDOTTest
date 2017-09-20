var base_url_modul = global_url+'grafik/';
$( document ).ready(function(){
    
    $('#sendBtn').click(function(){
        getData();
    });

    $('.datepicker').datepicker({
        "format": 'yyyy-mm-dd',
        "locale" : 'id',
    });

});

function getData(){
    $.ajax({
       url : base_url_modul+"getDataRekapJaminanKesehatan/",
       type : "POST",
       data : $('#frm-rekap-pengunjung').serialize(),
       dataType : "html",
       success: function msg(res){
            var data = jQuery.parseJSON(res);
            var status = data['status'];
			document.getElementById("barChart").innerHTML = "";
            if (status==true) {
                //code
				document.getElementById('barChart').style.display = 'block';
				//document.getElementById('barChartResult').style.height = '200px';
				getBarChart(data['jamkes'], data['jumlah']);
            }
       }
    }); 
}

function getBarChart(chartLabel, chartData){
	
	var randomColor = [];
	 
	for(var i = 0 ; i<chartLabel.length; i++){
		randomColor[i] = getRandomColor();
	}
	//alert (chartLabel);
	var ctx = document.getElementById("barChartResult");
	var myChart = new Chart(ctx, {
		type: 'pie',
		animation:{
        	animateScale:true
    	},
		data: {
			labels: chartLabel,
			datasets: [{
				label : '',
				data: chartData,
				backgroundColor: randomColor,
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: 1
			},
			height: 100,
		}
	});
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

