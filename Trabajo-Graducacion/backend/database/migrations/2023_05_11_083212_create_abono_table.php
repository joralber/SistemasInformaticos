<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbonoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         DB::statement('create table abono(
            id_abono integer not null auto_increment primary key,
            id_cxp integer not null,
            tiket varchar(50),
            pago decimal(11,2),
            fecha_abono date,
            formapago varchar(25),
            created_at timestamp,
            updated_at timestamp,
            foreign key (id_cxp) references cuentas_pagar(id_cxp)
            )ENGINE = InnoDB;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('abono');
    }
}
