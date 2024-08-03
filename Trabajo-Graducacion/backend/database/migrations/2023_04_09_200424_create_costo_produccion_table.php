<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCostoProduccionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table costo_produccion(
id_costo_produccion integer not null auto_increment primary key,
idcodigo_estilo integer not null,
fecha date,
totalmedida decimal(11,2),
cdf_cif decimal(11,2),
costo_produccion decimal(11,2),
margen_contribucion decimal(11,2),
consumidor_final decimal(11,2),
total_iva_mayoreo decimal(11,2),
total_iva_consumidorf decimal(11,2),
estado boolean,
created_at timestamp,
updated_at timestamp, 
foreign key(idcodigo_estilo) references codigo_estilo (idcodigo_estilo)
)ENGINE = InnoDB;
');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('costo_produccion');
    }
}
