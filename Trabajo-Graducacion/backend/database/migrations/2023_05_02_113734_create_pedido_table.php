<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePedidoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table pedido(
idpedido integer not null auto_increment primary key,
numero_pedido integer not null,
descripcion varchar(100),
fecha date,
estado boolean,
created_at timestamp,
updated_at timestamp
)ENGINE = InnoDB;
');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pedido');
    }
}
