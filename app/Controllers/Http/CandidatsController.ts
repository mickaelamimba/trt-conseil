import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SkillValidator from 'App/Validators/SkillValidator'
import  User  from 'App/Models/User';
import Application from '@ioc:Adonis/Core/Application'

export default class CandidatsController {
  public async index({ request, response, auth, view }: HttpContextContract) {
    let users:User | null
    if (auth.user?.roles === 'CANDIDAT') {
    const user = await User
      .query()
      .where('roles', auth.user?.roles)
      .first()
      users = user
    }

    return  view.render('profile/candidats', {
      data: users
    })
  }

  public async create({ request,response }: HttpContextContract) {
    
    const payload = await request.validate(SkillValidator)
    await payload.files.move(Application.tmpPath('uploads'))
    console.log(await payload.files)

  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
