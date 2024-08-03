<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DevolucionCompra extends Model
{
    use HasFactory;
    protected $table = "devolucion_compra";
    protected $primaryKey = 'id_dcompra';
    protected $fillable = [
        'id_compra',
        'fechadevolucion',
        'motivo',
        'observaciones',
        'total',
        'estado'
      ];
}
