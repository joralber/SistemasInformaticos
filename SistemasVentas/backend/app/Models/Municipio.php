<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    use HasFactory;
        protected $table = "municipio";
    protected $primaryKey = 'id_municipio';
    protected $fillable = [
        'codmunicipio',
        'nombremunicipio',
        'id_departamento'
      ];
}
