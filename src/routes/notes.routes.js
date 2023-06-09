// grupo de rotas das notas

const {Router} = require('express')

const NotesController = require('../controllers/NotesController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated) // aplicar para todas as rotas

notesRoutes.get('/', notesController.index) 
notesRoutes.post('/', notesController.create) 
notesRoutes.get('/:id', notesController.show) 
notesRoutes.delete('/:id', notesController.delete) 

module.exports = notesRoutes
