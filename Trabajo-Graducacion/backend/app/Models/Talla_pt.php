<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Talla_pt extends Model
{
    use HasFactory;

     protected $table = "talla_pt";
protected $primaryKey = 'id_talla_pt';

    protected $fillable = [
'nombre_talla', 
'estado',
    ]; 
}
