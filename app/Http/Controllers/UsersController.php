<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\CoreController;
use App\UsersModel;
use App\Providers\FormProvider;
use Collective\Html\FormFacade;
class UsersController extends CoreController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    var $base_url = "";
    var $main_title = "Data Users";
    var $mode="";
    var $breadcrumbs = array();

    public function __construct(){
        $this->base_url =  url('/') . '/tindakan/';
        $this->breadcrumbs = [
            "/" => "Home" , 
            "#" => "Data Users"
        ];
        
    }

    public function index()
    {
        //
        $dataModel = UsersModel::all();
        $dt = [
            "breadcrumbs" => $this->breadcrumbs,
            "title" => $this->main_title,
            "data" => $dataModel,
            "base_url" => $this->base_url
        ];        

        return $this->view('users.index' , $dt);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $dt = [
            'models' => [],
            'id' => ""
        ];
        return view('users.form' , $dt);
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
        $retVal = array();
        $users = new UsersModel;
        $users->nama = $request->nama;
        $users->alamat = $request->alamat;
        $users->telpon = $request->telpon;

        $res = $users->save();
        $arrDataPost = array(
            "id" => $users->id,
            "name"=> $request->nama,
            "alamat"=> $request->alamat,
            "telepon"=> $request->telpon,
        );
        $requestAPI = Request::create('http://dev.dot.co.id/smipoc/api/user/' , 'POST' , $arrDataPost);
        if($res){
            $retVal['status'] = true;
            $retVal['status_api'] = $requestAPI['status'];
            $retVal['message'] = "Data Berhasil Di SImpan";
        }else{
            $retVal['status'] = false;
            $retVal['status_api'] = $requestAPI['status'];
            $retVal['message'] = "Data Gagal Di SImpan";
        }
        echo json_encode($retVal);
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
        $dataModel = UsersModel::findOrFail($id);
        
        $dt = [
            'models' => $dataModel,
            'id' => $id,
        ];
        return view('users.form' , $dt);

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
        $users = UsersModel::find($id);
        $users->nama = $request->nama;
        $users->alamat = $request->alamat;
        $users->telpon = $request->telpon;

        $res = $users->save();
        if($res){
            $retVal['status'] = true;
            $retVal['message'] = "Data Berhasil Di SImpan";
        }else{
            $retVal['status'] = false;
            $retVal['message'] = "Data Gagal Di SImpan";
        }
        echo json_encode($retVal);
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
        $users = UsersModel::destroy($id);
        if($users){
            $retVal['status'] = true;
            $retVal['message'] = "Data Berhasil Di SImpan";
        }else{
            $retVal['status'] = false;
            $retVal['message'] = "Data Gagal Di SImpan";
        }
        echo json_encode($retVal);
    }

    public function retrieveData(){
        $dataModel = UsersModel::all();
        $retVal['data'] = [];

        foreach($dataModel as $rowData){
            $id = $rowData->id;
            $strButtonEdit = FormFacade::button("Edit", ['class' => 'btn btn-warning btn-flat' , 'onclick' => 'edit('.$id.')' , 'id' => 'btnEdit']);
            $strButtonDelete = FormFacade::button("Delete", ['class' => 'btn btn-danger btn-flat' , 'onclick' => 'deleteData('.$id.')' , 'id' => 'btnDelete']);
            $arrData = [
                $rowData->nama,
                $rowData->alamat,
                $rowData->telpon,
                $strButtonEdit.$strButtonDelete    
            ];
            $retVal['data'][] = $arrData;
        }

        echo json_encode($retVal);
    }

    public function checkNoTelpon(Request $request){
        ///echo $request->no_telpon;
        $dataModel = UsersModel::where('telpon' , $request->no_telpon)->first();
        if(!empty($dataModel)){
            echo json_encode("Nomor Sudah Ada");
        }else{
            echo json_encode(true);
        }
    }
}
