<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBitacoraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::statement('create table bitacora(
id_bitacora integer not null auto_increment primary key,
id   integer not null,
inicio timestamp,
salida timestamp,
created_at datetime DEFAULT NULL,
updated_at datetime DEFAULT NULL,
foreign key (id) references users(id)
)ENGINE=InnoDb;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bitacora');
    }
}
