<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SchoolProject;

class SchoolProjectController extends Controller
{
    // Store school project application
    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_date' => 'nullable|date',
            'school_name' => 'required|string|max:255',
            'address' => 'required|string',
            'principal_name' => 'required|string|max:150',
            'contact_number' => 'required|string|max:20',
            'email' => 'required|email|max:150',
            'affiliated_board' => 'required|string|max:50',

            'project_science' => 'nullable|boolean',
            'project_math' => 'nullable|boolean',
            'project_language' => 'nullable|boolean',
            'project_social' => 'nullable|boolean',
            'project_other' => 'nullable|string|max:255',

            'objective' => 'nullable|string',
            'target_audience' => 'nullable|string',
            'duration' => 'nullable|string|max:100',
            'students_involved' => 'nullable|integer',
            'resources_required' => 'nullable|string',
            'previous_projects' => 'nullable|string',
            'benefits' => 'nullable|string',

            'declaration_principal' => 'required|string|max:150',
            'declaration_date' => 'nullable|date',
        ]);

        $schoolProject = SchoolProject::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'School project application saved successfully!',
            'data' => $schoolProject
        ], 201);
    }

    public function show($id)
    {
        $project = SchoolProject::find($id);

        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $project]);
    }

    // Fetch all non-trashed school projects
    public function index()
    {
        $projects = SchoolProject::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }

    /**
     * Soft delete a school project.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $project = SchoolProject::find($id);

        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Project not found.'], 404);
        }

        $project->delete(); // This performs a soft delete

        return response()->json(['success' => true, 'message' => 'Project moved to trash.']);
    }

    /**
     * Restore a soft-deleted school project.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($id)
    {
        $project = SchoolProject::onlyTrashed()->find($id);

        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Trashed project not found.'], 404);
        }

        $project->restore();

        return response()->json(['success' => true, 'message' => 'Project restored successfully.']);
    }

    /**
     * Permanently delete a school project.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function forceDelete($id)
    {
        $project = SchoolProject::onlyTrashed()->find($id);

        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Trashed project not found.'], 404);
        }

        $project->forceDelete();

        return response()->json(['success' => true, 'message' => 'Project permanently deleted.']);
    }
}
