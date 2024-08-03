<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table venta(
        id_venta int not null auto_increment primary key,
        n_factura varchar(20) not null,
        fecha date not null,
        tipocompra varchar(15) not null,
        subtotal decimal(10,2) not null,
        iva decimal(10,2) null,
        total decimal(10,2) not null,
        tipoprecio varchar(20) not null,
        estado boolean default 1,
        id_tipodocumento int not null,
        id_cliente int not null,
        created_at timestamp,
        updated_at timestamp,
        foreign key(id_tipodocumento) references tipo_documento(id_tipodocumento),
        foreign key(id_cliente) references cliente(id_cliente)
    )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('venta');
    }
}
