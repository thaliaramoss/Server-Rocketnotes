// arquivo para reunir todas as rotas da aplicação

const {Router} = require("express")

const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()
routes.use("/users", usersRouter) // qnd acessar /users vai ser redirecionado para o usersRoutes
routes.use("/sessions", sessionsRouter)
routes.use("/notes", notesRouter) 
routes.use("/tags", tagsRouter)

module.exports = routes