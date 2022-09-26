const usuarios = require('../models').usuario
const jwt = require('../services/jwt')

function create(req, res){
    usuarios.create(req.body)
    .then(usuario =>{
        res.status(200).send({usuario})
    })
    .catch(err=>{
        res.status(500).send({err})
    })
}

function login(req, res){
    usuarios.findOne({
        where:{
            usuario:req.body.usuario,
            password:req.body.password
        }
    })
    .then(usuario =>{
        if(usuario){
            if(req.body.token){
                res.status(200).send({                    
                    token: jwt.createToken(usuario)
                })
            }else{
                res.status(200).send({
                    usuario:usuario
                })
            }            
        
        }else{
            res.status(401).send({message: "Acesso não autorizado"})
        }
    })
    .catch(err=>{
        res.status(500).send({message: "Ocorreu um erro ao buscar o usuário."})
    })
}

function getAll(req, res){
    usuarios.findAll()
    .then(usuarios =>{
        res.status(200).send({usuarios})
    })
    .catch(err =>{
        res.status(500).send({message: "Ocorreu um erro ao buscar os usuários"})
    })
}

module.exports = {
    create,
    login,
    getAll
}