<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudyCentreApplication;

class StudyCentreApplicationController extends Controller
{
    // Store a new application
    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_date'      => 'required|date',
            'centre_name'           => 'required|string|max:255',
            'address'               => 'required|string',
            'principal_name'        => 'required|string|max:150',
            'contact_number'        => 'required|string|max:20',
            'email'                 => 'required|email|max:150',
            'affiliated_board'      => 'required|string|max:100',
            'available_courses'     => 'required|string',
            'infrastructure'        => 'required|string',
            'staff_strength'        => 'required|integer',
            'student_capacity'      => 'required|integer',
            'resources_required'    => 'required|string',
            'previous_experience'   => 'required|string',
            'benefits'              => 'required|string',
            'declaration_principal' => 'required|string|max:255',
            'declaration_date'      => 'required|date',
        ]);

        $application = StudyCentreApplication::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Study Centre application saved successfully!',
            'data'    => $application
        ], 201);
    }

    // Fetch all applications
    public function index()
    {
        $applications = StudyCentreApplication::latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $applications
        ]);
    }

    // Fetch a single application by ID
    public function show($id)
    {
        $application = StudyCentreApplication::find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $application
        ]);
    }

    /**
     * Soft delete an application.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $application = StudyCentreApplication::find($id);

        if (!$application) {
            return response()->json(['success' => false, 'message' => 'Application not found.'], 404);
        }

        $application->delete(); // This performs a soft delete

        return response()->json(['success' => true, 'message' => 'Application moved to trash.']);
    }

    /**
     * Restore a soft-deleted application.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($id)
    {
        $application = StudyCentreApplication::onlyTrashed()->find($id);

        if (!$application) {
            return response()->json(['success' => false, 'message' => 'Trashed application not found.'], 404);
        }

        $application->restore();

        return response()->json(['success' => true, 'message' => 'Application restored successfully.']);
    }

    /**
     * Permanently delete an application.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function forceDelete($id)
    {
        $application = StudyCentreApplication::onlyTrashed()->find($id);

        if (!$application) {
            return response()->json(['success' => false, 'message' => 'Trashed application not found.'], 404);
        }

        $application->forceDelete();

        return response()->json(['success' => true, 'message' => 'Application permanently deleted.']);
    }
}
