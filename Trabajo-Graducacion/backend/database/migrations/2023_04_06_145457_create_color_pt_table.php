<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColorPtTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

DB::statement('create table color_pt(
id_color_pt integer not null auto_increment primary key, 
nombre_color varchar(50),
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
        Schema::dropIfExists('color_pt');
    }
}
