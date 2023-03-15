// grupo de rotas do usuário
const {Router, response} = require('express')
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const usersAvatarController = new UserAvatarController()

usersRoutes.post('/', usersController.create)  // usuário que vai se cadastrar não precisa se autenticar
usersRoutes.put('/', ensureAuthenticated, usersController.update) // precisa se autenticar
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), usersAvatarController.update)

module.exports = usersRoutes
