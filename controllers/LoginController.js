const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const knex = require('../database/dbConfig');

module.exports = {

    async login(req, res) {
        //Faz a desestruturação do objeto req.body
        const { email, senha } = req.body;

        // validação para os campos
        if (!email || !senha) {
            res.status(400).json({ erro: "Login ou senha incorretos" });
            return;
        }


        //Valida se e-mail esta correto
        try {
            const dados = await knex("usuarios").where({ email });
            if (dados.length == 0) {
                res.status(400).json({ erro: "Login ou senha incorretos" });
                return;
            }

            if (bcrypt.compareSync(senha, dados[0].senha)) {

                const token = jwt.sign({
                    usuario_id: dados[0].id,
                    usuario_nome: dados[0].nome
                }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )

                res.status(200).json({ msg: "Ok! Acesso Liberado", token })
            } else {
                res.status(400).json({ msg: "Login ou senha incorretos" })
            }

        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

}