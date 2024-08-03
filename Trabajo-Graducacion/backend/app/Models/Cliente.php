<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{

  use HasFactory;
  protected $table = "cliente";
  protected $primaryKey = 'id_cliente';
  protected $fillable = [
    'nombre',
    'dui',
    'nit',
    'nrc',
    'direccion',
    'id_municipio',
    'telefono',
    'email',
    'limite_credito',
    'estado'
  ];
}
