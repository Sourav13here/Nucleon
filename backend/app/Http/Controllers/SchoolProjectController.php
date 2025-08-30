<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SchoolProject;

class SchoolProjectController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'application_date'      => 'nullable|date',
        'school_name'           => 'required|string|max:255',
        'address'               => 'required|string',
        'principal_name'        => 'required|string|max:150',
        'contact_number'        => 'required|string|max:20',
        'email'                 => 'required|email|max:150',
        'affiliated_board'      => 'required|string|max:50',

        'project_science'       => 'nullable|boolean',
        'project_math'          => 'nullable|boolean',
        'project_language'      => 'nullable|boolean',
        'project_social'        => 'nullable|boolean',
        'project_other'         => 'nullable|string|max:255',

        'objective'             => 'nullable|string',
        'target_audience'       => 'nullable|string',
        'duration'              => 'nullable|string|max:100',
        'students_involved'     => 'nullable|integer',
        'resources_required'    => 'nullable|string',
        'previous_projects'     => 'nullable|string',
        'benefits'              => 'nullable|string',

        'declaration_principal' => 'required|string|max:150',
        'declaration_date'      => 'nullable|date',
    ]);

    $validated['submitted_at'] = now();

    $schoolProject = SchoolProject::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'School project application saved successfully!',
        'data'    => $schoolProject
    ], 201); // 👈 return JSON + proper status
}

}
