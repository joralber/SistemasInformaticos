<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKardexpProductotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table kardexp_productot(
id_kardexp_productot integer not null auto_increment primary key,
id_producto integer not null,
id_kardex_productos integer not null,
created_at timestamp,
updated_at timestamp,
foreign key (id_producto) references productos_terminados(id_producto),
foreign key (id_kardex_productos) references kardex_productos(id_kardex_productos)
)ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kardexp_productot');
    }
}
