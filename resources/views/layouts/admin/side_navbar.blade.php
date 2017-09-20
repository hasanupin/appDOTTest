<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
        <!--<li class="header">MAIN MENU</li>-->
            @foreach($menu as $menu_row) 

                @if(empty($menu_row['sub_menu']) && (isset($menu_row['sub_menu'])))
                    <li>
                    	<a href="{{$menu_row['main_url']}}">
                        	<i class="{{$menu_row['class']}}"></i>
                            <span>{{$menu_row['desc']}}</span>
                            </a>
                    </li>
                @else
                <li class="treeview">
                <a href="#">
                    <i class="{{$menu_row['class']}}"></i>
                    <span>{{$menu_row['desc']}}</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                        <ul class="treeview-menu">
                            @foreach($menu_row['sub_menu'] as $submenu_row) 
                                @if(empty($submenu_row['sub_menu']) && (isset($submenu_row['sub_menu'])))
                                <li>
                                    <a href="{{$submenu_row['main_url']}}">
                                        <i class="{{$submenu_row['class']}}"></i>
                                        <span>{{$submenu_row['desc']}}</span>
                                        </a>
                                </li>
                                @else
                                <i class="{{$menu_row['class']}}"></i>
                                <span>{{$menu_row['desc']}}</span>
                                <i class="fa fa-angle-left pull-right"></i>
                                    <ul class="treeview-menu">
                                        @foreach($submenu_row['sub_menu'] as $submenu_row2) 
                                        <li>
                                            <a href="{{$submenu_row2['main_url']}}">
                                                <i class="{{$submenu_row2['class']}}"></i>
                                                <span>{{$submenu_row2['desc']}}</span>
                                            </a>
                                        </li>
                                        @endforeach
                                    </ul>
                                @endif
                            @endforeach
                        </ul>
                </li>
                @endif
            @endforeach
        </ul>
        <!-- Sidebar user panel -->
    </section>
    <!-- /.sidebar -->
</aside>