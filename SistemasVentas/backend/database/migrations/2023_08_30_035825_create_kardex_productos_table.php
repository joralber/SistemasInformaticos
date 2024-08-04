<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKardexProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
     DB::statement('create table kardex_productos(
id_kardex_productos integer not null auto_increment primary key,
descripcionp varchar(40),
fechap date,
inv_inicialp integer,
entradasp integer,
salidap integer,
inv_finalp integer,
created_at timestamp,
updated_at timestamp 
)ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kardex_productos');
    }
}
