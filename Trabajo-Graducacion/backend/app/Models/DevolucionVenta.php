<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DevolucionVenta extends Model
{
    use HasFactory;
    protected $table = "devolucion_venta";
    protected $primaryKey = 'id_dventa';
    protected $fillable = [
        'id_venta',
        'fecha_devolucion',
        'motivo',
        'observaciones',
        'total',
        'estado'
      ];
}
