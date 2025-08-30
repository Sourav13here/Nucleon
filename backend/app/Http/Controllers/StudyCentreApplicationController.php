<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudyCentreApplication;

class StudyCentreApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_date'       => 'required|date',
            'centre_name'            => 'required|string|max:255',
            'address'                => 'required|string',
            'principal_name'         => 'required|string|max:150',
            'contact_number'         => 'required|string|max:20',
            'email'                  => 'required|email|max:150',
            'affiliated_board'       => 'required|string|max:100',
            'available_courses'      => 'required|string',
            'infrastructure'         => 'required|string',
            'staff_strength'         => 'required|integer',
            'student_capacity'       => 'required|integer',
            'resources_required'     => 'required|string',
            'previous_experience'    => 'required|string',
            'benefits'               => 'required|string',
            'declaration_principal'  => 'required|string|max:255',
            'declaration_date'       => 'required|date',
        ]);

        $application = StudyCentreApplication::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Study Centre application saved successfully!',
            'data'    => $application
        ]);
    }

    public function index()
    {
        return response()->json(StudyCentreApplication::latest()->get());
    }

    public function show($id)
    {
        $application = StudyCentreApplication::findOrFail($id);

        return response()->json($application);
    }
}
