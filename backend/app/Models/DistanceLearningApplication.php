<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistanceLearningApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'agreement_date',
        'applicant_name',
        'applicant_address',
        'application_date',
        'contact_number',
        'email_address',
        'educational_qualification',
        'center_area',
        'investment_amount',
        'number_of_schools',
        'avg_students',
        'signature_name',
        'signature_date',
        
    ];
}
