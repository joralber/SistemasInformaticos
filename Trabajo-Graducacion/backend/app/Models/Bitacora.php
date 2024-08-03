<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitacora extends Model
{
    use HasFactory;

    protected $table = "bitacora";
protected $primaryKey = 'id_bitacora';

    protected $fillable = [
'id', 
'inicio',
'salida',
    ];  
}
