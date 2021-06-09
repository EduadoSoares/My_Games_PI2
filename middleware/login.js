const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        console.log(decode);
        req.usuario_id = decode.usuario_id;
        next();
    } catch (error){
        return res.status(404).send({ error: "Falha naautenticação"})
    }
} 