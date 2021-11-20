import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class LoginController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ auth, request,response }: HttpContextContract) {
      const email = request.input('email')
    const password = request.input('password')

    const user = await User
      .query()
      .where('email', email)
      .where('is_valid',true)
      .first()
    console.log(user)
    if (!user?.isValid) {
      return response.badRequest('Votre compte na pas encore eté valider ')
    }

    if (!(Hash.verify(user.password, password))) {
     return response.badRequest('Invalid credentials')
    }

    await auth.use('web').login(user)

    response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
      await auth.use('web').logout()
       response.redirect('/login')

  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
