<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriaPrimaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table materia_prima(
id_mp integer not null auto_increment primary key,
id_categoria integer not null,
id_color integer not null,
id_medida integer not null,
nombre_producto varchar(50),
cantidad integer,
precio_unitario decimal(11,2),
stock_minimo integer,
descripcion varchar(100),
estado boolean,
factor boolean,
cortesmp boolean,
created_at timestamp,
updated_at timestamp,
foreign key (id_categoria) references categoria_mp(id_categoria),
foreign key (id_color) references color_mp (id_color),
foreign key (id_medida) references medida_mp (id_medida)
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
        Schema::dropIfExists('materia_prima');
    }
}
