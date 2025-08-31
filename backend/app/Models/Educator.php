<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Educator extends Model
{
    protected $fillable = [
        'full_name',
        'dob',
        'gender',
        'address',
        'phone',
        'email',
        'resume_path',
        'submitted_at',
    ];

    public $timestamps = false; // Since you don't want created_at/updated_at

    protected $casts = [
        'dob' => 'date',
        'submitted_at' => 'datetime',
    ];
}