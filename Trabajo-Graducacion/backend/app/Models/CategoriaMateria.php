<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaMateria extends Model
{
 use HasFactory;
    protected $table = "categoria_mp";
protected $primaryKey = 'id_categoria';

    protected $fillable = [
'nombre', 
'estado',
    ];
/*
        public function materiaPrimas()
    {
        return $this->hasMany('App\Models\MateriaPrima', 'id_categoria', 'id_categoria');
    }
    */
}
