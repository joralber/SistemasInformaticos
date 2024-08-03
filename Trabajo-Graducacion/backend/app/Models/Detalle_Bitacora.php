<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle_Bitacora extends Model
{
    use HasFactory;
        protected $table = "detalle_bitacora";
protected $primaryKey = 'id_detalle_b';

    protected $fillable = [
'id_bitacora', 
'acciones',
'hora',
    ]; 
}


