<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleDevolucionCompra extends Model
{
    use HasFactory;
    protected $table = "detalle_dev_compra";
    protected $primaryKey = 'id_detalle_dev';
    protected $fillable = [
        'id_dcompra',
        'id_mp',
        'cantidad',
        'precio',
        'subtotal'
      ];
}
