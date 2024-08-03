<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos_terminados extends Model
{
    use HasFactory;
     protected $table = "productos_terminados";
protected $primaryKey = 'id_producto';

    protected $fillable = [
        'id_cat_pt',
'id_color_pt',
'id_talla_pt',
'id_costo_produccion',
'idcodigo_estilo',
'codigo_barra',
'cantidad',
'stock_minimo',
'estado',
    ];
}



/*
productos_terminados
id_producto
id_cat_pt
id_color_pt
id_talla_pt
id_costo_produccion
idcodigo_estilo
codigo_barra
cantidad
stock_minimo
estado
*/
