<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;
    protected $table = "compra";
    protected $primaryKey = 'id_compra';
    protected $fillable = [
        'id_proveedor',
        'n_factura',
        'fecha',
        'tipo_compra',
        'subtotal',
        'iva',
        'total',
        'estado'
      ];
    
}
