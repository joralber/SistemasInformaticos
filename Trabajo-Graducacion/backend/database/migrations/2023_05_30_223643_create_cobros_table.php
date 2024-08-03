<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCobrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table cobro(
            id_cobro integer not null auto_increment primary key,
            tiket varchar(50),
            pago decimal(10,2),
            fecha_cobro date,
            formapago varchar(25),
            id_cxc integer not null,
            created_at timestamp,
            updated_at timestamp,
            foreign key (id_cxc) references cuenta_cobrar(id_cxc)
        )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cobros');
    }
}
