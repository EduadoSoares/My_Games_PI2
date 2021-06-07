
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {nome: "New World", generos_id: 2, lancamento: 2021, preco: 79, foto: "https://steamcdn-a.akamaihd.net/steam/apps/1063730/capsule_616x353.jpg?t=1594611839" },
        {nome: "The Elder Scrolls Online", generos_id: 2, lancamento: 2014, preco: 61, foto: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/header.jpg?t=1622743433" },
        {nome: "Ride 4", generos_id: 5, lancamento: 2020, preco: 94, foto: "https://cdn.cloudflare.steamstatic.com/steam/apps/1259980/header.jpg?t=1613635658" },
        {nome: "Counter-Strike: Global Offensive", generos_id: 3, lancamento: 2012, preco: 00, foto: "http://media.steampowered.com/apps/csgo/blog/images/fb_image.png?v=6" },
        {nome: "League of Legends", generos_id: 4, lancamento: 2009, preco: 00, foto: "https://blog.kabum.com.br/wp-content/uploads/2021/04/Riot-League-of-Legends.jpg" },
        {nome: "The Witcher 3: Wild Hunt", generos_id: 1, lancamento: 2015, preco: 80, foto: "https://image.api.playstation.com/vulcan/img/rnd/202009/2913/TQKAd8U6hnIFQIIcz6qnFh8C.png" }
      ]);
    });
};
