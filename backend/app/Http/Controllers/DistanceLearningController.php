<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DistanceLearningApplication;

class DistanceLearningController extends Controller
{
    // Store new distance learning application
    public function store(Request $request)
    {
        $request->validate([
            'agreement_date' => 'required|date',
            'applicant_name' => 'required|string|max:255',
            'applicant_address' => 'required|string',
            'application_date' => 'required|date',
            'contact_number' => 'required|string|max:20',
            'email_address' => 'required|email|max:255',
            'educational_qualification' => 'required|string|max:255',
            'center_area' => 'required|string|max:255',
            'number_of_schools' => 'required|integer',
            'avg_students' => 'required|integer',
            'signature_name' => 'required|string|max:255',
            'signature_date' => 'required|date',
        ]);

        $application = DistanceLearningApplication::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully',
            'data' => $application
        ], 201);
    }

    public function show($id)
    {
        $project = DistanceLearningApplication::find($id);

        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $project]);
    }

    // ✅ Fetch all distance learning applications
    public function index()
    {
        $applications = DistanceLearningApplication::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $applications
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
        $application = DistanceLearningApplication::find($id);

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
        $application = DistanceLearningApplication::onlyTrashed()->find($id);

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
        $application = DistanceLearningApplication::onlyTrashed()->find($id);

        if (!$application) {
            return response()->json(['success' => false, 'message' => 'Trashed application not found.'], 404);
        }

        $application->forceDelete();

        return response()->json(['success' => true, 'message' => 'Application permanently deleted.']);
    }
}