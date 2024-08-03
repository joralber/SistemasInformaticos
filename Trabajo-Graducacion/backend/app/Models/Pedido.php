<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;
    protected $table='pedido';
    protected $primaryKey='idpedido';
    protected $fillable=[
        'numero_pedido',
     'fecha',
     'descripcion',
     'estado',
    ];
}

