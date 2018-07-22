'use strict'
const Property = use('App/Models/Property')

//insert into properties values(4,1,"Rocketseat","Rua sem nome Rio de Janeiro","120.00",-27.210768,-49.644018,null,null);

class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   */
  async index ({ request }) {
    
    const { latitude, longitude } = request.all()

    const properties = Property.query()
    .nearBy(latitude,longitude,10)
    .fetch()
    
    return properties
  }

  /**
   * Create/save a new property.
   * POST properties
   */
  async store ({ request, response }) {
    
  }

  /**
   * Display a single property.
   * GET properties/:id
   */
  async show ({ params }) {
    
    const property = await Property.findOrFail(params.id)
    
    await property.load('images')

    return property
  
  }

  /**
   * Update property details.
   * PUT or PATCH properties/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   */
  async destroy ({ params, auth, response }) {

    const properties = await Property.findOrFail(params.id)

    if(properties.user_id !== auth.user.id){
      return response.status(401).send({error: 'Not Authorized'})
    }

    await properties.delete()
  }
}

module.exports = PropertyController
