<div class="row">
<div class="col-xs-12">
        {!! Form::model($models ,['url' => ['users'] , 'class'=>'form-horizontal' , 'id' => 'form-users']) !!}    
        {!! Form::hidden('id') !!}
        {!! Form::bsText('nama') !!}
        {!! Form::bsTextArea('alamat') !!}
        {!! Form::bsText('telpon') !!}
        <div class="col-sm-9 col-sm-offset-3">
            {!! Form::button("Simpan", ['class' => 'btn btn-primary btn-flat' , 'id' => 'btnSimpan']) !!}
        </div>
        </div>
        {!! Form::close() !!}
<!-- /.col -->
</div>

<script>
$(function(){
    
    $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    $('#form-users').validate({
        ignore : "",
        rules : {
            "nama" : {
                required : true,
            },
            "alamat" : {
                required : true,
            },
            "telpon" : {
                required : true,
                minlength : 9,
                remote : {
                    url : global_url + "/users/checkNoTelpon" ,
                    type : "POST",
                    data : {
                        no_telpon: function() {
                            return $( "#telpon" ).val();
                        }
                    }
                }
            },
        }
    });

    var idData = $('input[name=id]').val();
    if(idData!=""){

    }

    $('#btnSimpan').click(function(){
        if($('#form-users').valid()){
            simpanData();
        }
    });
});


function simpanData(){
    var idData = $('input[name=id]').val();
    
    var typePost = idData=="" ? "POST" : "PUT";
    var dataPost = $('#form-users').serialize();
    var urlPost = global_url + "users/" + idData;
    $.ajax({
        url : global_url + "/users/" + idData,
        type : typePost,
        data : $('#form-users').serialize(),
        success : function msg(result){
            var data = $.parseJSON(result);
            console.log(data);
            var status = data['status'];
            var message = data['message'];
            $('.bootbox').modal("hide");
            alertPopUp(status , message , "");
            reload();
        }
    });
}

</script>

