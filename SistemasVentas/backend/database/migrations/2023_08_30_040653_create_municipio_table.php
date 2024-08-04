<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMunicipioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table municipio(
            id_municipio integer not null auto_increment primary key,
            codmunicipio varchar(4) not null,
            nombremunicipio varchar(45) not null,
            id_departamento int not null,
            foreign key(id_departamento) references departamento(id_departamento)
        )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('municipio');
    }
}
