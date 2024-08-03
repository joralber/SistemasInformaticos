<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFactorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table factor(
id_factor integer not null auto_increment primary key,
id_mp integer not null,
fecha date,
unidades decimal(20,2),
factor varchar(40),
estado boolean,
created_at timestamp,
updated_at timestamp,
foreign key (id_mp) references materia_prima(id_mp) 
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
        Schema::dropIfExists('factor');
    }
}
