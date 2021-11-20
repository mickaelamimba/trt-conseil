import { DateTime } from 'luxon'
import { BaseModel, column,HasOne,hasOne  } from '@ioc:Adonis/Lucid/Orm'
import Candidat from './Candidat';
import Recruteur from './Recruteur';

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @hasOne(() => Candidat)
  public candidat: HasOne<typeof Candidat>
  @hasOne(() => Recruteur)
  public recruteur: HasOne<typeof Recruteur>
  @column()
  public userId :number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
