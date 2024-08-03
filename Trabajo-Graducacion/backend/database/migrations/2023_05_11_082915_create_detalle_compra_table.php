<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table detalle_compra(
            id_detalle_compra integer not null auto_increment primary key,
            id_compra integer not null,
            id_mp integer not null,
            descripcion varchar(100),
            cantidad integer,
            precio_unitario decimal(11,2),
            subtotal decimal(11,2),
            estado boolean,
            created_at timestamp,
            updated_at timestamp,
            foreign key (id_compra) references compra(id_compra),
            foreign key (id_mp) references materia_prima(id_mp)
            )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_compra');
    }
}
