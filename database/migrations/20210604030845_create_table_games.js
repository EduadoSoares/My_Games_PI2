
exports.up = (knex) => {
    return knex.schema.createTable('games', (table) => {
        table.increments();
        table.string('nome', 60).notNullable();
        table.string('foto').notNullable();
        table.integer('lancamento', 10).notNullable();
        table.decimal('preco', 9.2).notNullable();
        table.boolean('destaque').notNullable().defaultTo(false);

        // Cria campo de relacionamento com a tabela genero
        table.integer('generos_id').notNullable().unsigned();
        table.foreign('generos_id')
                .references('generos.id')
                .onDelete('restrict')
                .onUpdate('cascade');
        
        // Cria os campos created_at e update_at 
        table.timestamps(true, true);
    })
};

exports.down = (knex) =>  knex.schema.dropTable('games');

