<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    use HasFactory;
        protected $table = "productos";
protected $primaryKey = 'id_producto';

    protected $fillable = [

'id_cat',
'id_color',
'id_talla',
'nombre_producto',
'precio_unitario',
'codigo_barra',
'cantidad',
'estado',
    ];  
}
