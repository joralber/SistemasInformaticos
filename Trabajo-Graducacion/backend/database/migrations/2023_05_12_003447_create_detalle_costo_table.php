<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleCostoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         DB::statement('create table detalle_costo(
id_detalle_costo integer not null auto_increment primary key,
id_costo_produccion integer not null,
id_factor integer,
id_mp integer not null,
id_cortes integer,
medida1 decimal(11,2),
medida2 decimal(11,2),
total_m decimal(11,2),
precio decimal(11,2),
created_at timestamp,
updated_at timestamp,
foreign key (id_costo_produccion) references costo_produccion(id_costo_produccion),
foreign key (id_mp) references materia_prima(id_mp),
foreign key(id_factor) references factor(id_factor),
foreign key(id_cortes) references cortes(id_cortes)
)ENGINE = InnoDB;');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_costo');
    }
}
