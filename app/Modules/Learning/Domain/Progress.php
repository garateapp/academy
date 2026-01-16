<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'percent',
        'status',
        'last_activity_at',
    ];

    protected $casts = [
        'last_activity_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
