<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdenCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table orden_compra(
            id_ordencompra integer not null auto_increment primary key,
            id_proveedor integer not null,
            fecha date,
            total decimal(10,2),
            estado boolean default 0,
            created_at timestamp,
            updated_at timestamp,
            foreign key (id_proveedor) references proveedor(id_proveedor)
            )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orden_compra');
    }
}
