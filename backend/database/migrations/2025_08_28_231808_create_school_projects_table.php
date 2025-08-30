<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('school_projects', function (Blueprint $table) {
            $table->id();

            // General info
            $table->date('application_date')->nullable();

            // School Information
            $table->string('school_name');
            $table->text('address');
            $table->string('principal_name', 150);
            $table->string('contact_number', 20);
            $table->string('email', 150);
            $table->string('affiliated_board', 50);

            // Project Details
            $table->boolean('project_science')->default(false);
            $table->boolean('project_math')->default(false);
            $table->boolean('project_language')->default(false);
            $table->boolean('project_social')->default(false);
            $table->string('project_other')->nullable();
            $table->text('objective')->nullable();
            $table->text('target_audience')->nullable();
            $table->string('duration', 100)->nullable();
            $table->integer('students_involved')->nullable();
            $table->text('resources_required')->nullable();

            // Additional Info
            $table->text('previous_projects')->nullable();
            $table->text('benefits')->nullable();

            // Declaration
            $table->string('declaration_principal', 150);
            $table->date('declaration_date')->nullable();

            // Auto timestamps (created_at & updated_at)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_projects');
    }
};
