<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('study_centre_applications', function (Blueprint $table) {
            $table->id();

            $table->date('application_date');
            $table->string('centre_name');
            $table->string('address');
            $table->string('principal_name');
            $table->string('contact_number', 20);
            $table->string('email');
            $table->string('affiliated_board');
            $table->text('available_courses');
            $table->text('infrastructure');
            $table->integer('staff_strength');
            $table->integer('student_capacity');
            $table->text('resources_required');
            $table->text('previous_experience');
            $table->text('benefits');
            $table->string('declaration_principal');
            $table->date('declaration_date');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('study_centre_applications');
    }
};
