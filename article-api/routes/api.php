<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostControlller;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/get-article', [PostControlller::class, 'getArticle']);
Route::post('/create-article', [PostControlller::class, 'createArticle']);
Route::delete('/delete-article/{id}', [PostControlller::class, 'deleteArticle']);
Route::put('/update-article/{id}', [PostControlller::class, 'updateArticle']);
Route::get('/latest-article', [PostControlller::class, 'latestArticle']);