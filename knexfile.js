// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : 'freedb.tech',
      port: '3306',
      user : 'freedbtech_gamesMy',
      password : '12345',
      database : 'freedbtech_myGames'

    },
    migrations: {
      tableName: 'migrations',
      directory: './database/migrations',
    },    
    seeds: {
      directory:'./database/seeds'
    }
  } 

};