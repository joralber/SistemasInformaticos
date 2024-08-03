<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKardexMpTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table kardex_mp(
id_kardex integer not null auto_increment primary key,
descripcion varchar(100),
fecha date,
inv_inicial decimal(20,2),
entradas decimal(20,2),
salida decimal(20,2),
inv_final decimal(20,2),
created_at timestamp,
updated_at timestamp
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
        Schema::dropIfExists('kardex_mp');
    }
}
