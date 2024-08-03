<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleOrdenCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table detalle_orden_compra(
            id_detalleoc integer not null auto_increment primary key,
            id_ordencompra integer not null,
            id_mp integer not null,
            descripcion varchar(150),
            cantidad integer,
            cant_aprobada integer default 0,
            precio_unitario decimal(11,2),
            subtotal decimal(11,2),
            total decimal(11,3),
            estado boolean,
            created_at timestamp,
            updated_at timestamp,
            FOREIGN KEY (id_ordencompra) REFERENCES orden_compra(id_ordencompra),
            FOREIGN KEY (id_mp) REFERENCES materia_prima (id_mp)
            )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_orden_compra');
    }
}
