<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorMateria extends Model
{
 use HasFactory;
    protected $table = "color_mp";
protected $primaryKey = 'id_color';

    protected $fillable = [
'color', 
'estado',
    ];    
}
