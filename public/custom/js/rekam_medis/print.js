$("#btnCheckAll").click(function () {
    if($("#frm-print-preview input:checkbox").is(':checked')){
        $("#frm-print-preview input:checkbox").prop('checked', false);    
    }else{
        $("#frm-print-preview input:checkbox").prop('checked', true);
    }
    
});