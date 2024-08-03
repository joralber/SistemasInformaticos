<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cortes extends Model
{
    use HasFactory;
        protected $table = "cortes";
protected $primaryKey = 'id_cortes';

    protected $fillable = [
'id_mp', 
'cortes',
    ];  
}




