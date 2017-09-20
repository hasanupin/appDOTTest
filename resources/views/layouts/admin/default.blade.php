<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="author" content="{!! config('app.author') !!}">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="/img/icon.png" rel="shortcut icon" />

        <title>Apps CRUD</title>
        <link href="/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="/dist/css/AdminLTE.css" rel="stylesheet" type="text/css" />
        <link href="/plugins/font-awesome-4.6.3/css/font-awesome.min.css" rel="stylesheet" >
        <link href="/dist/css/skins/_all-skins.css" rel="stylesheet" type="text/css" />
        <link href="/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" type="text/css" />
        <!-- new post -->
        <!-- datepicker -->
        <link href="/plugins/datepicker/datepicker3.css" rel="stylesheet" type="text/css" />
        <link href="/custom/css/global.css" rel="stylesheet" type="text/css" />
        <!-- jQuery 2.1.3 -->
        <script src="/plugins/jQuery/jQuery-2.1.4.min.js"></script>
        <!-- Bootstrap datetime Picker -->
        <!-- audio player-->
        <script src='/plugins/playsound/jquery.playSound.js'></script>
        @yield('styles')
    </head>

    <script>
      var global_url = '{!!Url('/')!!}';
    </script>


    <body class="skin-green-light sidebar-mini">
        <div class="wrapper">
            @include('layouts.admin.top_navbar')
            @include('layouts.admin.side_navbar')
            
            <div class="content-wrapper">
            <section class="content-header">
                <h1>{!! $pagecrumb !!}</h1>
                {!! $breadcrumb !!}
            </section>
            <section class="content">
            @yield('content')
            </section>
            </div>
            <footer class="main-footer">
                <div class="text-right">
                    &copy; {{ date('Y') }} <strong>{!! config('app.name') !!}</strong>
                </div>
            </footer>
        </div>
        <script src="/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <!-- Slimscroll -->
        <script src="/plugins/slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <!-- FastClick -->
        <script src='/plugins/fastclick/fastclick.min.js'></script>
        <!-- DataTables -->
        <script src='/plugins/datatables/jquery.dataTables.min.js'></script>
        <script src='/plugins/datatables/dataTables.bootstrap.min.js'></script>
        <!-- Date Picker-->
        <script src='/plugins/datepicker/bootstrap-datepicker.js'></script>
        <script src='/plugins/moment/moment.min.js'></script>

        <script src='/plugins/raphael-master/raphael.min.js'></script>
        <!-- bootbox-->
        <script src='/plugins/bootbox/bootbox.js'></script>

        <!-- AdminLTE App -->
        <script src="/dist/js/app.min.js" type="text/javascript"></script>
        <!-- Globak App -->
        
        @yield('scripts')
    </body>
</html>
