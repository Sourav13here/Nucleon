<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('distance_learning_applications', function (Blueprint $table) {
            $table->id();
            $table->date('agreement_date');
            $table->string('applicant_name');
            $table->text('applicant_address');
            $table->date('application_date');
            $table->string('contact_number', 20);
            $table->string('email_address');
            $table->string('educational_qualification');
            $table->string('center_area');
            $table->string('investment_amount')->default('₹1,00,000/-');
            $table->integer('number_of_schools');
            $table->integer('avg_students');
            $table->string('signature_name');
            $table->date('signature_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('distance_learning_applications');
    }
};
