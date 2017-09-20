$(function () {
    $("#datatable").DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": true,
		"info": false,
		"autoWidth": false
	  });
      if ($('#myModalAlert').length > 0) {
        $('#myModalAlert').modal();                     
        $('#myModalAlert').modal('show');  
        }
});

function alertMessage(message, success) {
    //code
    if (success==true) {
        //code
        var html = "<div class='alert alert-success alert-dismissable'><i class='fa fa-check'></i><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>"+message+"</div>";
    }else{
        var html = "<div class='alert alert-danger alert-dismissable'><i class='fa fa-ban'></i><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>"+message+"</div>";
    }
    return html;
}

function messageBox(status , message , id_alert) {
    //code
    $('#'+id_alert+"").css("display" , "inherit");
    if (status==true) {
        //code
        if($('#'+id_alert+"").hasClass("alert-danger")){
          $('#'+id_alert+"").removeClass("alert-danger");
          $('#'+id_alert+"").removeClass("fa-ban");
        }
        $('#'+id_alert+"").addClass("alert-success");
        $('#'+id_alert+"_icon").addClass("fa fa-check");
    }else{
        if($('#'+id_alert+"").hasClass("alert-success")){
          $('#'+id_alert+"").removeClass("alert-success");
          $('#'+id_alert+"").removeClass("fa-check");
        }
        $('#'+id_alert+"").addClass("alert-danger");
        $('#'+id_alert+"_icon").addClass("fa-ban");
    }
    $('#'+id_alert+"_content").html(message);
}

function getTimeClock ( ){
 	var currentTime = new Date ( );
  	var currentHours = currentTime.getHours ( );
  	var currentMinutes = currentTime.getMinutes ( );
  	var currentSeconds = currentTime.getSeconds ( );

  	// Pad the minutes and seconds with leading zeros, if required
  	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
   	return currentTimeString;
   	  	
 }
 
 function saveRedirect(urlPost , formPost , urlRedirect, alertMessage) {
    //code
    $.ajax({
            url : urlPost,
            type : "POST",
            data : $('#'+formPost).serialize(),
            dataType : "html",
            success: function msg(res){
                 var data = jQuery.parseJSON(res);
                 var status = data['status'];
                 var message = data['message'];
                 if (status==true) {
                    //code
                    window.location = urlRedirect;
                 }else{
                    alert(alertMessage);
                 }
            }
    });
 }
 
 function deleteRedirect(urlDelete , id , urlRedirect) {
    //code
    $.ajax({
            url : urlDelete,
            type : "POST",
            data : "id="+id,
            dataType : "html",
            success: function msg(res){
                 var data = jQuery.parseJSON(res);
                 var status = data['status'];
                 var message = data['message'];
                 if (status==true) {
                    //code
                    window.location = urlRedirect;
                 }else{
                    alert(message);
                 }
            }
    });
 }

function convertDigitIn(str){
   return str.split('-').reverse().join('-');
}
 
 function alertPopUp(status,message,urlreturn){
    var classDiv = "modal-success";
    if(!status){
        classDiv = "modal-danger";
    }

    bootbox.alert({
        size : "small",
        title : "Peringatan",
        message : message,
        className : classDiv,
        callback : function(){
            if(urlreturn!="" && status==true){
                window.location = urlreturn;
            }
            
        }
    });
}

function alertRedirect(status,message,urlreturn){
    var classDiv = "modal-success";
    if(!status){
        classDiv = "modal-danger";
    }

        bootbox.dialog({
            size : "small",
            title : "Peringatan",
            message : message,
            className : classDiv,
        });
    if(urlreturn!="" && status==true){
        window.location = urlreturn;
    }
}

function loadingDialog(){
    bootbox.dialog({
        size : "small",
        title : "Loading....",
        message : '<div class="text-center"><i class="fa fa-refresh fa-spin"></i> Pengecekan BPJS</div>',
        
    });
}

function alertBig(status,message,urlreturn){
    var classDiv = "modal-success";
    if(!status){
        classDiv = "modal-danger";
    }
        bootbox.dialog({
            size : "large",
            title : "Peringatan",
            message : message,
            className : classDiv,
            closeButton: false
        });
    if(urlreturn!="" && status==true){
        setTimeout(function(){ 
            window.location = urlreturn;
        }, 3000);
        
    }
}


function toCurrency(n) {   
  n = parseFloat(n);
    return n.toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
 
function panggilAntrian(txtIdKunjungan){
    $.playSound(global_url+'suara/antrian/'+txtIdKunjungan+'');
}

function VoiceTerimaKasih(){
    $.playSound(global_url+'assets/voice/Terima_Kasih');
}

function formatRepo (repo) {
      if (repo.loading) return repo.text;
      var markups = "<div class='select2-result-repository clearfix'>" +
          "<div class='select2-result-repository__meta'>" +
          "<div class='select2-result-repository__title'>" + repo.txtIndonesianName + " - "+repo.txtEnglishName+"</div>"+
          "<div class='select2-result-repository__description'>" + repo.txtCategory + "</div>"
          +"</div></div>";
      ///markups = repo.txtIndonesianName;
      return markups;
}
    
function formatRepoSelection (repo) {
      return repo.txtEnglishName || repo.text;
}

function cetak(){
    window.print();
}