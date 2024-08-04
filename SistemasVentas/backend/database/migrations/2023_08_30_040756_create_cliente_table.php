<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table cliente(
            id_cliente int not null auto_increment primary key,
            nombre varchar(60) not null,
            dui varchar(9) not null,
            direccion varchar(50) not null,
            id_municipio int not null,
            telefono varchar(8),
            email varchar(100),
            estado boolean default 1,
            created_at timestamp,
            updated_at timestamp,
            foreign key(id_municipio) references municipio(id_municipio)
            )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cliente');
    }
}
