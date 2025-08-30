<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DistanceLearningApplication;

class DistanceLearningController extends Controller
{
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

        DistanceLearningApplication::create($request->all());

        return response()->json(['success' => true, 'message' => 'Application submitted successfully']);
    }
}
