<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'message' => 'required|string',
            'program' => 'nullable|string',

        ]);

        $validated['submitted_at'] = now();
        $contact = Contact::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Message saved successfully!',
            'data' => $contact
        ]);
    }

    public function index()
    {
        $contacts = Contact::orderBy('submitted_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $contacts
        ]);
    }


}
