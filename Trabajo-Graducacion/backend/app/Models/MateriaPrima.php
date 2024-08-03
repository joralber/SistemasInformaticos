<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MateriaPrima extends Model
{
    use HasFactory;
       protected $table = "materia_prima";
protected $primaryKey = 'id_mp';

    protected $fillable = [
        'id_categoria' ,
        'id_color',
        'id_medida',
        'nombre_producto',
        'cantidad',
        'precio_unitario',
        'stock_minimo',
        'descripcion',
        'estado',
        'factor',
        'cortesmp',
];

/*
public function categoria_mp()
{
    return $this->hasOne('App\Models\CategoriaMateria', 'id_categoria', 'categoria_mp')
}
*/

/*
   public function categoriaMp()
    {
        return $this->hasOne('App\Models\CategoriaMateria', 'id_categoria', 'id_categoria');
    }
*/
     public function medidaMp()
    {
        return $this->hasOne('App\Models\MedidaMateria', 'id_medida', 'id_medida');
    }
}
