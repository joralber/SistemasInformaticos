<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factor extends Model
{
    use HasFactory;
        protected $table = 'factor';
protected $primaryKey = 'id_factor';

    protected $fillable = [
'id_mp', 
'fecha',
'unidades',
'factor',
'estado'
    ];    
}
