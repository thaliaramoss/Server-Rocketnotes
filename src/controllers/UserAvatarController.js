const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users")
    .where({id: user_id}).first() // usuáio específico

    
  if(!user) {
    throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
  }

  // se existir uma imagem anterior -> deletar
  if(user.avatar) {
    await diskStorage.deleteFile(user.avatar)
  }

  // salvar imagem 
  const filename = await diskStorage.saveFile(avatarFileName)
  // colocar a imagem no avatar do usuário
  user.avatar = filename

  await knex("users").update(user).where({id: user_id})

  return response.json(user)
  }

}

module.exports = UserAvatarController