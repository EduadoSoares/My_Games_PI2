const knex = require('../database/dbConfig');

module.exports = {

    //index: listagem
    //store/create: inclisão
    //update alteração
    //show: retorna 1 registro
    //destroy: exclução

    async index(req, res) {

        const games = await knex
            .select('a.id', "a.nome", "e.nome as genero", "a.lancamento", "a.preco", "a.foto")
            .from("games as a")
            .leftJoin("generos as e", "a.generos_id", "e.id")
            .orderBy("a.id", "desc");

        res.status(200).json(games);
    },

    async store(req, res) {
        //Faz a desestruturação do objeto req.body
        const {nome, generos_id, lancamento, preco, foto } = req.body;

        // validação para os campos
        if (!nome || !generos_id || !lancamento || !preco || !foto) {
            res.status(400).json({ erro: "Enviar nome, generos_id, lancamento, preco e foto do game" });
            return;
        }

        try {
            const novo = await knex("games").insert({nome, generos_id, lancamento, preco, foto });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }
}

