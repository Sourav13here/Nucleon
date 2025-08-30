<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_date',
        'school_name',
        'address',
        'principal_name',
        'contact_number',
        'email',
        'affiliated_board',
        'project_science',
        'project_math',
        'project_language',
        'project_social',
        'project_other',
        'objective',
        'target_audience',
        'duration',
        'students_involved',
        'resources_required',
        'previous_projects',
        'benefits',
        'declaration_principal',
        'declaration_date',
    ];
}
