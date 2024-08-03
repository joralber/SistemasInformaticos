<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color_pt extends Model
{
    use HasFactory;

      protected $table = "color_pt";
protected $primaryKey = 'id_color_pt';

    protected $fillable = [
'nombre_color', 
'estado',
    ];    
}
