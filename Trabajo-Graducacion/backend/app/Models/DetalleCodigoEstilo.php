<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleCodigoEstilo extends Model
{
    use HasFactory;
           protected $table = "detalle_codigo_estilo";
protected $primaryKey = 'iddetalle_codigo_estilo';

    protected $fillable = [
'idcodigo_estilo',
'id_mp',

    ];
}
