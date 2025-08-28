<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'program',
        'message',
        'submitted_at',   // <-- Add this
    ];

    public $timestamps = false; // keep this since you don't want created_at/updated_at
}
