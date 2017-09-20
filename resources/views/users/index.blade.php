@extends('layouts.admin.default')
@section('content')
<div class="row">
    <div class="col-xs-12">
    <!-- Hasil Pencarian Data Pasien -->
      <div class="box box-primary">
        <!-- /.box-header -->
        <div class="box-header">
          <div class="box-tools">
            <button id="btnAdd" class="btn btn-success"><i class="fa fa-plus"></i> Tambah Data</button>
          </div>
        </div>
        <div class="box-body">
          <table class="table table-hover" id="table-data">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Telpon</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </table>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
  </div>
  <!-- /.row -->
  @endsection

  @section('scripts')
    <script src="/plugins/validate/jquery.validate_1.11.1.min.js" type="text/javascript"></script>
    <script src="/js/form.js" type="text/javascript"></script>
  @endsection