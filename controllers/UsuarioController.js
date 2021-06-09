const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const knex = require('../database/dbConfig');

module.exports = {

    //index: listagem
    //store/create: inclisão
    //update alteração
    //show: retorna 1 registro
    //destroy: exclução

    async index(req, res) {
        const usuarios = await knex("usuarios")
        res.status(200).json(usuarios);
    },

    async store(req, res) {
        //Faz a desestruturação do objeto req.body
        const { nome, email, senha } = req.body;

        // validação para os campos
        if (!nome || !email || !senha) {
            res.status(400).json({ erro: "Enviar nome, email e senha" });
            return;
        }


        //Valida se e-mail já foi cadastrado
        try {
            const dados = await knex("usuarios").where({ email });
            if (dados.length) {
                res.status(400).json({ erro: "E-mail já cadastrado" });
                return;
            }
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }



        //gera um hash da senha a ser salva no banco
        const hash = bcrypt.hashSync(senha, 10);


        try {
            const novo = await knex("usuarios").insert({ nome, email, senha: hash });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async updateUsuario(req, res) {
        const id = req.params["id"];
        const { email } = req.body;
        const Ids = await knex("usuarios").where({ id })

        if (Ids.length == 0) {
            res.status(400).json({ erro: "Usuario não cadastrado." })
            return;

        } else {

            if (!email) {
                res.status(400).json({ erro: "Enviar Dados" })
                return;

            } else {

                try {
                    await knex("usuarios").where({ id }).update({ email })
                    res.status(201).json({ msg: "Dados alterados." })
                } catch {
                    res.status(400).json({ erro: error.message });
                }
            }
        }
    }, 

    async deleteUsuario(req, res) {
        const id = req.params["id"];
        const Ids = await knex("usuarios").where({ id })
        if (Ids.length == 0) {

            res.status(200).json({ erro: "Usuario não cadastrado" })
            return;

        }
        try {
            
            await knex("usuarios").where({ id }).delete()
            res.status(201).json({ msg: "Usuario Deletado." })
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }
}

