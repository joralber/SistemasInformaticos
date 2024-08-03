<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleDevVentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table detalle_dev_venta(
            id_detdeventa integer not null auto_increment primary key,
            id_dventa int not null,
            id_producto int not null,
            cantidad int not null,
            precio decimal(10,2) not null,
            subtotal decimal(10,2) null,
            created_at timestamp,
            updated_at timestamp,
            foreign key (id_dventa) references devolucion_venta(id_dventa),
            foreign key (id_producto) references productos_terminados(id_producto)
        )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_dev_venta');
    }
}
