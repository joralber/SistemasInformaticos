<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table productos(
id_producto integer not null auto_increment primary key,
id_cat integer not null,
id_color integer not null,
id_talla integer not null,
nombre_producto varchar(50),
precio_unitario decimal(11,2),
codigo_barra varchar(15),
cantidad integer,
estado boolean ,
created_at timestamp,
updated_at timestamp,
foreign key (id_cat) references categoria(id_cat),
foreign key (id_color) references color(id_color),
foreign key (id_talla) references talla(id_talla)
)ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
