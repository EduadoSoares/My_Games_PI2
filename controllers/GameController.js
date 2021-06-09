const knex = require('../database/dbConfig');

module.exports = {

    //index: listagem
    //store/create: inclisão
    //update alteração
    //show: retorna 1 registro
    //destroy: exclução


    async gamesGeral(req, res) {
        const games = await knex('games')
        res.status(200).json(games);
    },

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
    },

    async destaque(req, res){
        const id = req.params["id"];
        try{
            const dados = await knex('games').where({id})
            if(dados.length == 0){
                res.status(400).json({msg: "ID invalido."})
                return;
            }
            if(dados[0].destaque == 1){
                await knex('games').where({id}).update({'destaque': 0})
                res.status(200).json({msg: "Removido dos destaques"})
            }else{
                await knex('games').where({id}).update({'destaque': 1})
                res.status(200).json({msg: "Adicionados dos destaques"})
            }
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    async destaqueGeral(req, res){
        try{
            const lista = await knex('games').where({'destaque': 1}).orderBy('id', 'desc')
            if(lista.length == 0){
                res.status(200).json({msg: "Nenhum destaque na lista."})
                return;
            }
            res.status(200).json(lista);
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    async updateGame(req, res) {
        const id = req.params["id"];
        const { preco } = req.body;
        const Ids = await knex("games").where({ id })

        if (Ids.length == 0) {
            res.status(400).json({ erro: "Game não cadastrado." })
            return;
        } else {
            if (!preco) {
                res.status(400).json({ erro: "Enviar Dados" })
                return;
            } else {
                try {
                    await knex("games").where({ id }).update({ preco })
                    res.status(201).json({ msg: "Dados alterados." })
                } catch {
                    res.status(400).json({ erro: error.message });
                }
            }
        }
    },

    //Delete Peripheral
    async deleteGame(req, res) {
        const id = req.params["id"];
        const Ids = await knex("games").where({ id })
        if (Ids.length == 0) {
            res.status(200).json({ erro: "Game não cadastrado" })
            return;
        }
        try {
            await knex("games").where({ id }).delete()
            res.status(201).json({ msg: "Game Deletado." })
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async search(req, res){
        const search = req.params["search"];
        try{
            const dados = await knex('games')
            .select("a.id", "a.nome", "a.foto", "a.lancamento", "a.preco")
            .from("games as a")
            .leftJoin("generos as e", "a.generos_id", "e.id")
            .orderBy("a.id", "desc")
            .where('preco', 'like', `%${search}%`)
            .orWhere('lancamento', 'like', `%${search}%`)
            .orderBy('id', 'desc');
            res.status(200).json(dados);
        }catch(error) {
            res.status(400).json({erro: error.message})
        }
    }
}

