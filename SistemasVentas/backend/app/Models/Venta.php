<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;
            protected $table = "venta";
protected $primaryKey = 'id_venta';

    protected $fillable = [
'fecha',
'total',
'id_cliente',
'id',
'efectivo',
'cambio'
    ]; 
}
