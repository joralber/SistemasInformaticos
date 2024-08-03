<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMpKardexmpTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table mp_kardexmp(
                idmp_kardexmp integer not null auto_increment  primary key,
                id_kardex integer not null,
                id_mp integer not null,
                created_at timestamp,
                updated_at timestamp,
                foreign key (id_kardex) references kardex_mp(id_kardex),
                foreign key (id_mp) references materia_prima(id_mp)
                )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mp_kardexmp');
    }
}
