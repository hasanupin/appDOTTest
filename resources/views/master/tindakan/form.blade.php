<div class="row">
    <div class="col-xs-12">
    <!-- Hasil Pencarian Data Pasien -->
    <div class="box box-success">
    <!-- form start -->
        <div class="box-body">
        {!! Form::open(['url' => ['tindakan'] , 'class'=>'form-horizontal']) !!}    
            {!! Form::bsText('nama') !!}
            {!! Form::bsTextArea('alamat') !!}
            {!! Form::bsText('no_telpon') !!}
            <div class="col-sm-9 col-sm-offset-3">
                {!! Form::submit("Simpan", ['class' => 'btn btn-primary btn-flat']) !!}
            </div>
            </div>
            {!! Form::close() !!}
    </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
  </div>