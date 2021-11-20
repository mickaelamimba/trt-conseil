import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
  
    password: schema.string({}, [
      rules.confirmed('passwordConfirm'),
      rules.minLength(8),
      rules.maxLength(14)
    ]),
    firstName: schema.string({}, [
      rules.required()
    ]),
    lastName: schema.string({}, [
      rules.required()
    ]),
    roles: schema.enum(['RECRUTEURS', 'CANDIDAT']),



  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    required: ' {{ field }} est requis pour créer un nouveau compte ',
    'email.unique': 'Courriel déja enregister',
    enum: 'La valeur de {{ field }} doit être dans {{ options.choices }} ',
    confirmed:'veuillire confirmer votre mots de pas',
    'password':' votre mot de passe doit contenir au minimum {{ options.minLength }} et {{ options.maxLength }} maximal',
  }
}
