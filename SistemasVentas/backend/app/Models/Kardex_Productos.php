<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kardex_Productos extends Model
{
    use HasFactory;
     protected $table = "kardex_productos";
    protected $primaryKey = 'id_kardex_productos';
    
        protected $fillable = [
    'descripcionp',
    'fechap',
    'inv_inicialp',
    'entradasp',
    'salidap',
    'inv_finalp'
        ];
}

