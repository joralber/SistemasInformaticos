<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleDevolucionVenta extends Model
{
     use HasFactory;
    protected $table = "detalle_dev_venta";
    protected $primaryKey = 'id_detdeventa';
    protected $fillable = [
        'id_dventa',
        'id_producto',
        'cantidad',
        'precio',
        'subtotal'
      ];
}
