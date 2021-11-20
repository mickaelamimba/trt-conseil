import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Candidats extends BaseSchema {
  protected tableName = 'candidats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('profile_id')
        .unsigned()
        .references('profiles.id')
        .onDelete('CASCADE')
      table.string('files').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
