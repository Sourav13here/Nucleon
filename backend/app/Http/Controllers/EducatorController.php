<?php

namespace App\Http\Controllers;

use App\Models\Educator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Exception;

class EducatorController extends Controller
{
    /**
     * Store a newly created educator application in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:255',
                'dob' => 'required|date|before:today',
                'gender' => 'required|in:Male,Female',
                'address' => 'required|string|max:1000',
                'phone' => 'required|string|regex:/^\+?[0-9]{10,15}$/',
                'email' => 'required|email|max:255',
                'resume' => 'required|file|mimes:pdf,doc,docx|max:10240', // 10MB max
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Handle file upload
            $resumePath = null;
            if ($request->hasFile('resume')) {
                $file = $request->file('resume');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $resumePath = $file->storeAs('educator_resumes', $fileName, 'public');
            }

            // Create educator record
            $educator = Educator::create([
                'full_name' => $request->full_name,
                'dob' => $request->dob,
                'gender' => $request->gender,
                'address' => $request->address,
                'phone' => $request->phone,
                'email' => $request->email,
                'resume_path' => $resumePath,
                'submitted_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Educator application submitted successfully!',
                'data' => [
                    'id' => $educator->id,
                    'full_name' => $educator->full_name,
                    'email' => $educator->email,
                    'submitted_at' => $educator->submitted_at
                ]
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your application.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of educator applications.
     */
    public function index(): JsonResponse
    {
        try {
            $educators = Educator::orderBy('submitted_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $educators
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching educator applications.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified educator application.
     */
    public function show($id): JsonResponse
    {
        try {
            $educator = Educator::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $educator
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Educator application not found.',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Download educator resume
     */
    public function downloadResume($id): mixed
    {
        try {
            $educator = Educator::findOrFail($id);

            if (!$educator->resume_path || !Storage::disk('public')->exists($educator->resume_path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resume file not found.'
                ], 404);
            }

            return Storage::disk('public')->download($educator->resume_path);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while downloading the resume.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified educator application from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $educator = Educator::findOrFail($id);

            // Delete the resume file if it exists
            if ($educator->resume_path && Storage::disk('public')->exists($educator->resume_path)) {
                Storage::disk('public')->delete($educator->resume_path);
            }

            $educator->delete();

            return response()->json([
                'success' => true,
                'message' => 'Educator application deleted successfully.'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting the educator application.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}