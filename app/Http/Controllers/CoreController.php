<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CoreController extends Controller
{
    //

    function view($template , $data){
        
        $breadcrumbs_array = $data['breadcrumbs'];        
        $data['menu'] = config("menu.main_menu");
        $data['breadcrumb'] = $this->breadCrumbs($breadcrumbs_array);
        $data['pagecrumb'] = $data['title'];
        return view($template , $data);
        
    }

    function breadCrumbs($arrData){
        $html = '<ol class="breadcrumb">';
                // for dashboard, only add home
        foreach ($arrData as $key => $nav) {
            $html .= '<li>';
            $html .= '<a href="' . url($key) . '">' . $nav . '</a>';
            $html .= '</li>';
        }

        return $html . '</ol>';        
    }
    
}
