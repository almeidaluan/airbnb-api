'use strict'

const Image = use('app/Models/Image')
const Property = use('app/Models/Property')
const Helpers = use('Helpers')

class ImageController {


  /**
   * Estamos Fazendo o Upload de uma imagem e salvando elas em temp/uploads e para cada arquivo
   * esta sendo alterado o nome com timestamp atual evitando arquivos duplicados, caso aconteca
   * algum problema o processo para por ai e o front end fica sabendo dos problemas e por fim estamos
   * criando o registro de imagens no banco e associando com o imovel.
   * @param {*} param0
   */
  async store({ params, request}){
      const Property = Property.findOnFail(params.id)

      const images = request.file('image',{
        types:['images'], // Limitando apenas imagens e com um determinado tamanho
        size: '2mb'
      })

      await images.moveAll(Helpers.tmpPath('uploads'),file =>({
        name:`${Date.now()}-${file.clientName}`
      }))

      if(!images.moveAll()){
        return images.erros()
      }

      await Promise.all(
        images.movedList().map(
          image => property.images().create({path: image.fileName}))
      )
  }
}

module.exports = ImageController

//Agora que já temos os arquivos vamos criar os registros de imagens no banco de dados associados com o imóvel: continuar dai
