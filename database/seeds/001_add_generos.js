
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('generos').del()
    .then(function () {
      // Inserts seed entries
      return knex('generos').insert([
        {id:1, nome: 'RPG'},
        {id:2, nome: 'MMO'},
        {id:3, nome: 'FPS'},
        {id:4, nome: 'Estrategia'},
        {id:5, nome: 'Simulador'},
        {id:6, nome: 'Acao'},
        {id:7, nome: 'Casual'},
      ]);
    });
};
