exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id")
    table.text("name").notNullable() // não permite valores nulos
    
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") // se deletar a nota q a tag está vinculada, a tag tb será deletada
    table.integer("user_id").references("id").inTable("users")
})


exports.down = knex => knex.schema.dropTable("tags")