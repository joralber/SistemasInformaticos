<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle_Pedido extends Model
{
    use HasFactory;

       protected $table='detalle_pedido_mp';
    protected $primaryKey='id_datellep';
    protected $fillable=[
'idpedido',
'id_mp',
'cantidad2',
   ];
}



