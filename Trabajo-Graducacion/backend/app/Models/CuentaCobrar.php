<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuentaCobrar extends Model
{
    use HasFactory;
    protected $table = "cuenta_cobrar";
    protected $primaryKey = 'id_cxc';
    protected $fillable = [
        'monto_credito',
        'numero_cuotas',
        'monto_cuota',
        'saldo',
        'cuotas_pendientes',
        'fecha_factura',
        'periodopago',
        'id_venta'
      ];

}
