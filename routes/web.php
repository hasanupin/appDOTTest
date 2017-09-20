<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/// Loket App
Route::get('/', 'DashboardController@index');
Route::get('loket', 'LoketController@index');


Route::resource('tindakan' , 'Master\TindakanController');
Route::resource('users' , 'UsersController');
Route::post('users/checkNoTelpon', 'UsersController@checkNoTelpon');
Route::post('users/retrieve-data', 'UsersController@retrieveData');

