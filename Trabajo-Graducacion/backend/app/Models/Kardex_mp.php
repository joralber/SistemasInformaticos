<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kardex_mp extends Model
{
     use HasFactory;

    protected $table = "kardex_mp";
    protected $primaryKey = 'id_kardex';
    
        protected $fillable = [
    'descripcion',
    'fecha',
    'inv_inicial',
    'entradas',
    'salida',
    'inv_final'
        ];
}

