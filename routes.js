const express = require('express');
const routes = express.Router()

const GameController = require('./controllers/GameController');
const UsuarioController = require('./controllers/UsuarioController');

const login = require("./middleware/login");


routes.get("/games", GameController.index)
    .post("/games", login, GameController.store);

routes.get("/usuarios", UsuarioController.index)
    .post("/usuarios", UsuarioController.store)
    .post("/login", UsuarioController.login);

module.exports = routes;
