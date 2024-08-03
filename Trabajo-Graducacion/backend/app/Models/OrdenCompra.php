<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdenCompra extends Model
{
    use HasFactory;
    protected $table = "orden_compra";
    protected $primaryKey = 'id_ordencompra';
    protected $fillable = [
        'id_proveedor',
        'fecha',
        'total',
        'estado'
      ];
}
