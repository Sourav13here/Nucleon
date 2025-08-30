<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SchoolProject;
use App\Models\StudyCentreApplication;
use App\Models\DistanceLearningApplication;
use Illuminate\Support\Collection;

class TrashController extends Controller
{
    /**
     * Display a listing of all soft-deleted resources.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Retrieve only the soft-deleted records from each model
        $trashedSchoolProjects = SchoolProject::onlyTrashed()->get();
        $trashedStudyCentres = StudyCentreApplication::onlyTrashed()->get();
        $trashedDistanceLearning = DistanceLearningApplication::onlyTrashed()->get();

        // Format each collection to have a consistent structure for the frontend
        $formattedSchoolProjects = $trashedSchoolProjects->map(function ($item) {
            return [
                'id' => $item->id,
                'type' => 'School Project',
                'name' => $item->school_name,
                'deleted_at' => $item->deleted_at,
            ];
        });

        $formattedStudyCentres = $trashedStudyCentres->map(function ($item) {
            return [
                'id' => $item->id,
                'type' => 'Study Center',
                'name' => $item->centre_name,
                'deleted_at' => $item->deleted_at,
            ];
        });

        $formattedDistanceLearning = $trashedDistanceLearning->map(function ($item) {
            return [
                'id' => $item->id,
                'type' => 'Distance Learning',
                'name' => $item->applicant_name,
                'deleted_at' => $item->deleted_at,
            ];
        });

        // Merge all formatted collections into one
        $allTrashedItems = $formattedSchoolProjects
            ->merge($formattedStudyCentres)
            ->merge($formattedDistanceLearning);

        // Sort the final collection by the deletion date, most recent first
        $sortedTrashedItems = $allTrashedItems->sortByDesc('deleted_at')->values();

        return response()->json([
            'success' => true,
            'data' => $sortedTrashedItems,
        ]);
    }
}

