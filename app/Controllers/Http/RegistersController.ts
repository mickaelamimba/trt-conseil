import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'



export default class RegistersController {
  public async index({ }: HttpContextContract): Promise<void> {

  }

  public async create({ request, response, session }: HttpContextContract) {


    const payload = await request.validate(RegisterValidator)

    const user = await User.
      create({ ...payload, isValid: false })
    const profile = await user
  .related('profile').create({userId:user.id})


    session.flash({ successMessage: 'compte cree avec success' })
    response.redirect().back()



  }

  public async store({ }: HttpContextContract): Promise<void> {

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

