const fs = require("fs") // manipulação de arquivos
const path = require("path") // lidar com diretórios
const uploadConfig = require("../configs/upload")

// deletar e salvar arquivos que foram feitos upload para o backend
class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
        // rename -> "mudar" arquivo de pastas
        path.resolve(uploadConfig.TMP_FOLDER, file),
        path.resolve(uploadConfig.UPLOADS_FOLDER, file)
      )

      return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch  {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage