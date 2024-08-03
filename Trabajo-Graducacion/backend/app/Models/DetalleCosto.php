<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleCosto extends Model
{
    use HasFactory;


    protected $table='detalle_costo';
    protected $primaryKey='id_detalle_costo';
    protected $fillable=[
'id_costo_produccion',
'id_factor',
'id_mp',
'id_cortes',
'medida1',
'medida2',
'total_m',
'precio',
    ];

}
