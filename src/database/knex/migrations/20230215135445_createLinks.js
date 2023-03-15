exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id")
    table.text("url").notNullable() // não permite valores nulos
    
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") // se deletar a nota q a tag está vinculada, a tag tb será deletada
    table.timestamp("created_at").default(knex.fn.now())
})


exports.down = knex => knex.schema.dropTable("links")