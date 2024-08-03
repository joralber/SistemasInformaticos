<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleDevCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table detalle_dev_compra(
            id_detalle_dev integer not null auto_increment primary key,
            id_dcompra integer not null,
            id_mp integer not null,
            cantidad integer,
            precio decimal(11,2),
            subtotal decimal(11,2),
            created_at timestamp,
            updated_at timestamp,
            foreign key (id_dcompra) references devolucion_compra(id_dcompra),
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
        Schema::dropIfExists('detalle_dev_compra');
    }
}
