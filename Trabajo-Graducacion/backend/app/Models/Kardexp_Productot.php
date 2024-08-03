<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kardexp_Productot extends Model
{
    use HasFactory;
     protected $table = "kardexp_productot";
    protected $primaryKey = 'id_kardexp_productot';
    
        protected $fillable = [
    'id_producto',
    'id_kardex_productos',
  
        ];
}
