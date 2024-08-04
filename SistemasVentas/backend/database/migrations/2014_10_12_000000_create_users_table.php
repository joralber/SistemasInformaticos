<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('create table users(
id integer auto_increment not null,
name   varchar(100),
role   varchar(30),
email varchar(100),
password varchar(60),
estado boolean,
created_at datetime DEFAULT NULL,
updated_at datetime DEFAULT NULL,
CONSTRAINT pk_users PRIMARY KEY(id)
)ENGINE=InnoDb;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
