<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyCentreApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_date',
        'centre_name',
        'address',
        'principal_name',
        'contact_number',
        'email',
        'affiliated_board',
        'available_courses',
        'infrastructure',
        'staff_strength',
        'student_capacity',
        'resources_required',
        'previous_experience',
        'benefits',
        'declaration_principal',
        'declaration_date',
    ];
}
