<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCuentasPagarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
          DB::statement('create table cuentas_pagar(
            id_cxp integer not null auto_increment primary key,
            id_compra integer not null,
            deuda decimal(11,2),
            montocuota decimal(11,2),
            saldo decimal(11,2),
            numero_cuotas integer,
            cuotaspendientes integer,
            periodopago varchar(15),
            estado_cuenta boolean default 1,
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
        Schema::dropIfExists('cuentas_pagar');
    }
}
