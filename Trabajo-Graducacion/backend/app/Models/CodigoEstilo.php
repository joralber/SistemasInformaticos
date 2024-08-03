<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodigoEstilo extends Model
{
    use HasFactory;
        protected $table = "codigo_estilo";
protected $primaryKey = 'idcodigo_estilo';

    protected $fillable = [
'codigo',
'estilo',
'estado'
    ];
}
