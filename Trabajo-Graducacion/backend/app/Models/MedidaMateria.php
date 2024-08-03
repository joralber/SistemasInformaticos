<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedidaMateria extends Model
{
 use HasFactory;
    protected $table = "medida_mp";
protected $primaryKey = 'id_medida';

    protected $fillable = [
'medida', 
'estado',
    ];


         public function materiaPrimas()
    {
        return $this->hasMany('App\Models\MateriaPrima', 'id_categoria', 'id_categoria');
    }
}
