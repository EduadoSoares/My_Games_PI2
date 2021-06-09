const express = require('express');
const routes = express.Router()

const GameController = require('./controllers/GameController');
const UsuarioController = require('./controllers/UsuarioController');
const LoginController = require('./controllers/LoginController');
const loginMiddle = require("./middleware/login");


routes.get("/gamesGeral", loginMiddle, GameController.gamesGeral)
    .get("/games", loginMiddle, GameController.index)
    .post("/games", loginMiddle, GameController.store)
    .get("/destaque", loginMiddle, GameController.destaqueGeral)
    .post("/destaque/:id", loginMiddle, GameController.destaque)
    .delete("/games/:id", loginMiddle, GameController.delete)
    .put("/games/:id", loginMiddle, GameController.update)
    .get("/search/:search", loginMiddle, GameController.search)




routes.get("/usuarios", UsuarioController.index)
    .post("/usuarios", UsuarioController.store)
    .post("/login", LoginController.login)
    .delete("/usuarios/:id", UsuarioController.destroy)
    .put("/usuarios/:id", UsuarioController.update);

module.exports = routes;
