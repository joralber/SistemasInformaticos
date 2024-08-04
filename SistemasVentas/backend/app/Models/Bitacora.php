<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitacora extends Model
{
    use HasFactory;

    protected $table = "bitacora";
protected $primaryKey = 'id_bitacora';

    protected $fillable = [
'id', 
'inicio',
'salida',
    ];  

    
       public function detalles() {
        return $this->hasMany(Detalle_Bitacora::class, 'id_bitacora');
    }
}
