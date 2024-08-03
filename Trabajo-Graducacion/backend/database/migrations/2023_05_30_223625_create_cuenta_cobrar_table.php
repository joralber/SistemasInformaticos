<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCuentaCobrarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table cuenta_cobrar(
            id_cxc int not null auto_increment primary key,
            monto_credito decimal(10,2) not null,
            numero_cuotas int not null,
            monto_cuota decimal(10,2) not null,
            saldo decimal(10,2) not null,
            cuotas_pendientes int not null,
            periodopago varchar(15),
            estado boolean default 1,
            id_venta int not null,
            created_at timestamp,
            updated_at timestamp,
            foreign key(id_venta) references venta(id_venta)
        )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cuenta_cobrar');
    }
}
