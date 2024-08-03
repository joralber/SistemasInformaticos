<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleCodigoEstiloTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table detalle_codigo_estilo(
iddetalle_codigo_estilo integer not null auto_increment primary key,
idcodigo_estilo integer not null,
id_mp integer not null,
created_at timestamp,
updated_at timestamp,
foreign key(idcodigo_estilo) references codigo_estilo(idcodigo_estilo),
foreign key(id_mp) references materia_prima(id_mp)
)ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_codigo_estilo');
    }
}
