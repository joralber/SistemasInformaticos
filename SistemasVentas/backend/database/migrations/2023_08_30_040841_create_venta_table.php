<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table venta(
        id_venta int not null auto_increment primary key,
       fecha date not null,
        total decimal(10,2) not null,
        id_cliente int not null,
        id integer not null,
        efectivo decimal(10,2) not null,
        cambio decimal(10,2) not null,
        created_at timestamp,
        updated_at timestamp,
        foreign key(id) references users(id),
        foreign key(id_cliente) references cliente(id_cliente)
    )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('venta');
    }
}
