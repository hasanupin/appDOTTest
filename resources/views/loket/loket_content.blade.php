<section class="content-header">
  <h1 class="title">Loket</h1>
</section>

<section class="content">
  <div class="row">
    <div class="col-md-5">
        <!-- small box -->
        <div class="small-box bg-green">
            <div class="inner">
              <form id="frm-search-pasien" action="" method="POST">
                  <div class="box-body" style="margin:-1px 0">
                    <div class="form-group">
                      <label for="inputNoId">Masukkan No. Anggota / No. Identitas/ Nama Pengguna Layanan / No Jaminan Kesehatan</label>
                        <div class="input-group col-md-10">
                            <input type="text" name="id_pasien" id="id_pasien" class="form-control">
                            <span class="input-group-btn">
                              <button class="btn btn-warning btn-flat" id="searchPasien" type="button"><i class="fa fa-search"></i> Cari</button>
                            </span>
                        </div>
                    </div>
                  </div>
                </form>
            </div>
            <div class="icon">
              <i class="fa fa-search"></i>
            </div>
            <div class="small-box-footer"></div>
        </div>
    </div>
    <div class="col-md-2">
      <!-- small box -->
     <a href="" onclick="cekSidikJari()">
	    <div class="small-box bg-aqua">
        <div class="inner">
          <p>Pencarian</p>
          <h4 style="font-size: 18px; font-weight: bold; padding: 11px 0;">Sidik Jari</h4>
        </div>
        <div class="icon">
          <i class="fa fa-hand-o-up"></i>
        </div>
        <div class="small-box-footer"></div>
      </div>
     </a>
    </div>
    <div class="col-md-2">
      <!-- small box -->
	  <div class="small-box bg-red">
        <div class="inner">
          <p>Jumlah Antrian</p>
          <h3 id="jumlah-pengunjung-antrian">0</h3>
        </div>
        <div class="icon">
          <i class="fa fa-users"></i>
        </div>
        <div class="small-box-footer"></div>
      </div>
    </div>
    <div class="col-md-3">
      <!-- small box -->
	  <div class="small-box bg-blue">
        <div class="inner">
          <p>Jam Operasional</p>
          <h3 id="jam-sekarang"></h3>
        </div>
        <div class="icon">
          <i class="fa fa-clock-o"></i>
        </div>
        <div class="small-box-footer"></div>
      </div>
    </div>
    <div class="col-xs-12">
    <!-- Cari Data Pasien -->
    <!-- Hasil Pencarian Data Pasien -->
      <div class="box box-success">
        <div class="box-header">
          <h3 class="box-title">Data Pengguna Layanan</h3>
          <a href="/" class="btn btn-success pull-right"><i class="fa fa-user-plus"></i> Tambah Pengguna Layanan Baru</a>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive" id="hidden-table" style="display:none">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>No KTP</th>
                <th>No Anggota</th>
                <th>Nama Pengguna Layanan</th>
                <th>Tanggal Lahir</th>
                <th>Jenis Kelamin</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="result-search-pasien">
              
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
</section>