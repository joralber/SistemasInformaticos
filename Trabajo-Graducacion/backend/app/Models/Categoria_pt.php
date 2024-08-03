<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria_pt extends Model
{
    use HasFactory;

    protected $table = "categoria_pt";
protected $primaryKey = 'id_cat_pt';

    protected $fillable = [
'nombre_cat', 
'estado',
    ];  
}
