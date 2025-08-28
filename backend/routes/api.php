<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

// POST /api/contacts → ContactController@store
Route::post('/contacts', [ContactController::class, 'store']);
