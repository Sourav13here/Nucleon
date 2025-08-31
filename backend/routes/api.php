<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SchoolProjectController;
use App\Http\Controllers\StudyCentreApplicationController;
use App\Http\Controllers\DistanceLearningController;
use App\Http\Controllers\TrashController;

// Contact form routes
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']);
Route::get('/contacts/{id}', [ContactController::class, 'show']);
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

// School project routes
Route::post('/school-projects', [SchoolProjectController::class, 'store']);
Route::get('/school-projects', [SchoolProjectController::class, 'index']);
Route::get('/school-projects/{id}', [SchoolProjectController::class, 'show']);
Route::delete('/school-projects/{id}', [SchoolProjectController::class, 'destroy']);
Route::post('/school-projects/{id}/restore', [SchoolProjectController::class, 'restore']); // 👈 Add this
Route::delete('/school-projects/{id}/force-delete', [SchoolProjectController::class, 'forceDelete']); // 👈 Add this


// Study Centre routes
Route::post('/study-centre-applications', [StudyCentreApplicationController::class, 'store']);
Route::get('/study-centre-applications', [StudyCentreApplicationController::class, 'index']);
Route::get('/study-centre-applications/{id}', [StudyCentreApplicationController::class, 'show']);
Route::delete('/study-centre-applications/{id}', [StudyCentreApplicationController::class, 'destroy']);
Route::post('/study-centre-applications/{id}/restore', [StudyCentreApplicationController::class, 'restore']); // 👈 Add this
Route::delete('/study-centre-applications/{id}/force-delete', [StudyCentreApplicationController::class, 'forceDelete']); // 👈 Add this


// Distance learning routes
Route::post('/distance-learning', [DistanceLearningController::class, 'store']);
Route::get('/distance-learning', [DistanceLearningController::class, 'index']);
Route::get('/distance-learning/{id}', [DistanceLearningController::class, 'show']);
Route::delete('/distance-learning/{id}', [DistanceLearningController::class, 'destroy']);
Route::post('/distance-learning/{id}/restore', [DistanceLearningController::class, 'restore']); // 👈 Add this
Route::delete('/distance-learning/{id}/force-delete', [DistanceLearningController::class, 'forceDelete']); // 👈 Add this


// Trash routes
Route::get('/trash', [TrashController::class, 'index']); 