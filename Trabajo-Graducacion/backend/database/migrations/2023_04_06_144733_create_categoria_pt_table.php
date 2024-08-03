<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriaPtTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement(
'create table categoria_pt(
id_cat_pt integer not null auto_increment primary key, 
nombre_cat varchar(50),
estado boolean,
created_at timestamp,
updated_at timestamp
)ENGINE = InnoDB;'

        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoria_pt');
    }
}
