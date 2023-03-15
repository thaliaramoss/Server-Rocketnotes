require("dotenv/config")
require('express-async-errors')

const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const express = require('express')

const routes = require('./routes/index.js') // padrão index.js
const uploadConfig = require('./configs/upload')
const cors = require('cors')

const app = express()

app.use(express.json()) // padrão utilizado ser o json
app.use(cors())
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

// ===== conexão com banco de dados =====
migrationsRun()

app.use(routes)

app.use((error, request, response, next)=> {
    // erro no clientside
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    // erro no servidor
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})


const port = process.env.SERVER_PORT || 3333
app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})