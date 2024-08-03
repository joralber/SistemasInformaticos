<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuentasPagar extends Model
{
    use HasFactory;
    protected $table = "cuentas_pagar";
    protected $primaryKey = 'id_cxp';
    protected $fillable = [
        'id_compra',
        'deuda',
        'montocuota',
        'saldo',
        'numero_cuotas',
        'cuotaspendientes',
        'fecha_factura',
        'estado_cuenta'
      ];
}
