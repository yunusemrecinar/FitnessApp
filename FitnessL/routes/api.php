<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FitnessAppController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Example root for testing env connections
Route::get('/hello-world', [FitnessAppController::class, 'helloWorld']);

// Auth routes Begins
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user'])->middleware('auth.token');
// Auth routes Ends