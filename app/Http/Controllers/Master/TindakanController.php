<?php

namespace App\Http\Controllers\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\CoreController;
use App\Model\TindakanModel;

class TindakanController extends CoreController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    var $base_url = "";
    var $main_title = "Data Tindakan";
    var $mode="";
    var $breadcrumbs = array();

    public function __construct(){
        $this->base_url =  url('/') . '/tindakan/';
        $this->breadcrumbs = [
            "/" => "Home" , 
            "#" => "Data Induk",
            "#" => "Data Tindakan"
        ];
        
    }
    public function index()
    {
        //
        $dataTindakan = TindakanModel::all();
        $dt = [
            "breadcrumbs" => $this->breadcrumbs,
            "title" => $this->main_title,
            "data_tindakan" => $dataTindakan,
            "base_url" => $this->base_url
        ];        

        return $this->view('master.tindakan.index' , $dt);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->mode = "insert";
        //
        $this->breadcrumbs['#'] = "Tambah Data Tindakan";
        $dt = [
            "breadcrumbs" => $this->breadcrumbs,
            "title" => $this->main_title,
            "base_url" => $this->base_url
        ];        
        $dt['mode'] = "insert";
        return $this->view('master.tindakan.form' , $dt);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $this->mode = "update";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
