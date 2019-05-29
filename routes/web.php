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



Auth::routes();
// Route::get('/', function () {
//     return view('tasks');
// });
Route::get('/home', 'HomeController@index');

// Route::get('/tasks', 'TaskController@index');
Route::resource('tasks','TaskController'); 
// Route::delete('/tasks/{id}/delete','TaskController@destroy'); 

