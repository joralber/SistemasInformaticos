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
descripcionp varchar(100),
fechap date,
inv_inicialp decimal(20,2),
entradasp decimal(20,2),
salidap decimal(20,2),
inv_finalp decimal(20,2),
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
