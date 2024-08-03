<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodigoEstiloTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table codigo_estilo(
idcodigo_estilo integer not null auto_increment primary key,
codigo integer,
estilo varchar(50), 
estado boolean,
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
        Schema::dropIfExists('codigo_estilo');
    }
}
