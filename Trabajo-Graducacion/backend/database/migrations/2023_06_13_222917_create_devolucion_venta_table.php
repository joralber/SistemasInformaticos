<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevolucionVentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table devolucion_venta(
            id_dventa integer not null auto_increment primary key,
            id_venta int not null,
            fecha_devolucion date not null,
            motivo varchar(50) not null,
            observaciones varchar(100) null,
            total decimal(10,2) not null,
            estado boolean default 1,
            created_at timestamp,
            updated_at timestamp,
            foreign key (id_venta) references venta(id_venta)
        )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devolucion_venta');
    }
}
