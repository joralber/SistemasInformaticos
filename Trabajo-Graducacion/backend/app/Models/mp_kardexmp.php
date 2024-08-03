<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mp_kardexmp extends Model
{
         use HasFactory;


        protected $table = "mp_kardexmp";
    protected $primaryKey = 'idmp_kardexmp';
    
        protected $fillable = [
'id_kardex',
'id_mp',
        ];

}
