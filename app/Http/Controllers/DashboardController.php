<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\CoreController;

class DashboardController extends CoreController
{
    //
    function index(){
        
        $data = [
            'breadcrumbs' => [
                "#" => "Dashboard"    
            ],
            'title' => "Dashboard"
        ];
        return $this->view('dashboard.index' , $data);
    }
}
