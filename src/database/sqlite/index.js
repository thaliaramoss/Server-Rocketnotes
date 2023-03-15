const sqlite3 = require('sqlite3') // drive que estabelece comunicação com a base de dados
const sqlite = require('sqlite') // responsável por conectar
const path = require('path') // resolve endereços de acordo com o ambiente -> própio do node


// cria o arquivo database.db
async function sqliteConnection () {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    })

    return database
}

module.exports = sqliteConnection