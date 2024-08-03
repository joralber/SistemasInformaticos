<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProveedorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table proveedor(
id_proveedor integer not null auto_increment primary key,
nombre varchar(50),
nit varchar(20),
nrc varchar(20),
dui varchar(15),
direccion varchar(100),
celular varchar(15),
email varchar(50),
limite_credito integer,
N_creditos integer,
estado boolean,
created_at timestamp,
updated_at timestamp 
)ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('proveedor');
    }
}
