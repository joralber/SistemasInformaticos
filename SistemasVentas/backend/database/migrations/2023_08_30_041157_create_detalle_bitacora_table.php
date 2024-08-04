<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleBitacoraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
     DB::statement('create table detalle_bitacora(
id_detalle_b integer not null auto_increment primary key,
id_bitacora integer not null,
acciones varchar(100),
hora timestamp,
created_at datetime DEFAULT NULL,
updated_at datetime DEFAULT NULL,
foreign key (id_bitacora) references bitacora(id_bitacora)
)ENGINE=InnoDb;
');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_bitacora');
    }
}
