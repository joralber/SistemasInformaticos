<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tareas extends Model
{
    use HasFactory;
    protected $fillable=[
        "titulo",
        "descripcion",
        "tipo",
        "estado",
        "user_id"
            ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
