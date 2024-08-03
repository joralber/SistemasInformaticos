<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleOrdenCompra extends Model
{
    use HasFactory;
    protected $table = "detalle_orden_compra";
    protected $primaryKey = 'id_detalleoc';
    protected $fillable = [
        'id_ordencompra',
        'id_mp',
        'descripcion',
        'cantidad',
        'cant_aprobada',
        'precio_unitario',
        'subtotal',
        'estado'
      ];
}
