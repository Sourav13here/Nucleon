<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SchoolProjectController;
use App\Http\Controllers\StudyCentreApplicationController;
use App\Http\Controllers\DistanceLearningController;
// Contact form route
Route::post('/contacts', [ContactController::class, 'store']);

// School project form route
Route::post('/school-projects', [SchoolProjectController::class, 'store']);

// Study Centre Partnership form routes
Route::post('/study-centre-applications', [StudyCentreApplicationController::class, 'store']);

// Distance learning Form
Route::post('/distance-learning', [DistanceLearningController::class, 'store']);

Route::get('/contacts', [ContactController::class, 'index']);   // Fetch all contacts
