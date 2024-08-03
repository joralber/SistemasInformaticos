<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevolucionCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table devolucion_compra(
            id_dcompra integer not null auto_increment primary key,
            id_compra integer not null,
            fechadevolucion date,
            motivo varchar(50),
            observaciones varchar(100),
            total decimal(11,2),
            estado boolean default 1,
            created_at timestamp,
            updated_at timestamp,
            foreign key (id_compra) references compra(id_compra)
            )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devolucion_compra');
    }
}
