@extends('layouts.admin.default')
@section('content')
<div class="row">
    <div class="col-xs-12">
    <!-- Hasil Pencarian Data Pasien -->
    <div class="box box-success">
    <!-- form start -->
        <form class="form-horizontal" id="frm-filter">
          <div class="box-body">
              {{Form::bsText('nama_tindakan')}}
            <div class="col-sm-9 col-sm-offset-3" style="padding-left: 8px;">

                <button class="btn btn-primary btn-flat" id="searchBtn" type="button"><i class="fa fa-search"></i> Cari</button>
                <button class="btn btn-info btn-flat" id="refreshBtn" type="button" ><i class="fa fa-list"></i> Refresh</button>
            </div>
          </div>
        </form>
    </div>
      <div class="box box-primary">
        <!-- /.box-header -->
        <div class="box-header">
          <div class="box-tools">
            <a href="{{ $base_url }}create/" class="btn btn-success"><i class="fa fa-plus"></i> Tambah Data</a>
          </div>
        </div>
        <div class="box-body">
          <table class="table table-hover" id="table-data">
                <thead>
                  <tr>
                    <th>Nama Tindakan</th>
                    <th>Deskripsi Tindakan</th>
                    <th>Biaya</th>
                    <th>Status Tindakan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  @foreach($data_tindakan as $row_tindakan) 

                    <tr>
                      <td>{{$row_tindakan->nama_tindakan}}</td>
                      <td>{{$row_tindakan->biaya}}</td>
                      <td>{{$row_tindakan->deskripsi_tindakan}}</td>
                      <td>{{$row_tindakan->status_tindakan}}</td>
                      <td>
                        {!! link_to($base_url .'edit/'.$row_tindakan->id_tindakan, 'Edit', ['class'=>'btn btn-primary btn-flat']) !!}
                        {!! link_to($base_url .'destroy/'.$row_tindakan->id_tindakan, 'Delete', ['class'=>'btn btn-danger btn-flat']) !!}
                      </td>
                    </tr>
                  @endforeach
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