<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTerminadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table productos_terminados(
id_producto integer not null auto_increment primary key,
id_cat_pt integer not null,
id_color_pt integer not null,
id_talla_pt integer not null,
id_costo_produccion integer not null,
idcodigo_estilo integer not null,
codigo_barra varchar(20),
cantidad integer,
stock_minimo integer,
estado boolean ,
created_at timestamp,
updated_at timestamp,
foreign key (id_cat_pt) references categoria_pt(id_cat_pt),
foreign key (id_color_pt) references color_pt(id_color_pt),
foreign key (id_talla_pt) references talla_pt(id_talla_pt),
foreign key (id_costo_produccion) references costo_produccion(id_costo_produccion),
foreign key (idcodigo_estilo) references codigo_estilo(idcodigo_estilo)

)ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos_terminados');
    }
}
