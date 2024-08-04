<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTallaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table talla(
id_talla integer not null auto_increment primary key, 
talla varchar(8),
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
        Schema::dropIfExists('talla');
    }
}
