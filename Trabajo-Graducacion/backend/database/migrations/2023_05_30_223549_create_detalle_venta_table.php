<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleVentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table detalle_venta(
            id_detalleventa int not null auto_increment primary key,
            cantidad int not null,
            precio_unitario decimal(10,2) not null,
            subtotal decimal(10,2) not null,
            descripcion varchar(100) null,
            id_venta int not null,
            id_producto int not null,
            created_at timestamp,
            updated_at timestamp,
            foreign key(id_venta) references venta(id_venta),
            foreign key(id_producto) references productos_terminados(id_producto)
        )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_venta');
    }
}
