<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriaMpTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        DB::statement('create table categoria_mp(
 id_categoria integer not null auto_increment primary key,
 nombre varchar(50),
 estado boolean,
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
        Schema::dropIfExists('categoria_mp');
    }
}
