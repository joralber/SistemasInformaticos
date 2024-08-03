<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CostoProduccion extends Model
{
    use HasFactory;
protected $table="costo_produccion";
protected $primaryKey="id_costo_produccion";
protected $fillable=[
'idcodigo_estilo',
'fecha',
'totalmedida',
'cdf_cif',
'costo_produccion',
'margen_contribucion',
'consumidor_final',
'total_iva_mayoreo',
'total_iva_consumidorf',
'estado',
    ];
}
