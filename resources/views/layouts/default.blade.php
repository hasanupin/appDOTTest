<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="author" content="{!! config('app.author') !!}">
        <meta name="keywords" content="{!! config('app.keywords') !!}">
        <meta name="description" content="{{ $HTMLDescription }}"/>
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @include ('partials.favicons')

        <title>| eMedica - Sistem Informasi Fasilitas Kesehatan</title>
        <link rel="stylesheet" href="/css/admin.css?v=1">
        @yield('styles')
    </head>

    <body class="hold-transition skin-blue sidebar-mini">

        <div class="wrapper">
            @include('admin.partials.header')

            @include('admin.partials.navigation')

            <div class="content-wrapper">
                <section class="content-header">
                    {!! $pagecrumb !!}

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

        @include('notify::notify')
        @include('admin.partials.modals')

        <script type="text/javascript" charset="utf-8" src="/js/admin.js?v=1"></script>
        <script type="text/javascript" charset="utf-8">
            $(document).ready(function ()
            {
                initAdmin();
            });
        </script>

        @yield('scripts')

        @if(config('app.env') != 'local')
            @include('partials.analytics')
        @endif
    </body>
</html>
