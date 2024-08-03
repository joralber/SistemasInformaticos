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
            nombre varchar(100) not null,
            dui varchar(20) not null,
            nit varchar(20) not null,
            nrc varchar(20) null,
            direccion varchar(100) not null,
            id_municipio int not null,
            telefono varchar(15),
            email varchar(50),
            limite_credito int not null,
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
