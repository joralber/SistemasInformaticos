<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         DB::statement('create table compra(
            id_compra integer not null auto_increment primary key,
            id_proveedor integer not null,
            n_factura varchar(15),
            fecha date,
            tipo_compra varchar(10),
            subtotal decimal(11,2),
            iva decimal(11,2),
            total decimal(11,2),
            estado varchar(15),
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
        Schema::dropIfExists('compra');
    }
}
