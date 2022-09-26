const fotografias = require('../models').fotografia
const fs = require('fs')
const thumb = require('node-thumbnail').thumb
const path = require('path')

function create(req, res){
    var body = req.body

    fotografias.create(body)
    .then(fotografias =>{
        res.status(200).send({fotografias})
    })
    .catch(err =>{
        res.status(500).send({message: "Ocorreu um erro ao guardar a fotografia"})
    })
}

function update(req, res){
    var id = req.params.id
    var body = req.body

    fotografias.findByPk(id)
    .then(fotografia =>{
        fotografia.update(body)
        .then(() =>{
            res.status(200).send({fotografia})
        })
        .catch(err =>{
            res.status(500).send({message: "Ocorreu um erro ao atuaizar a fotografia"})
        })
    })
    .catch(err =>{
        res.status(500).send({message:"Ocorreu um erro ao buscar a fotografia!"})
    })
}

function uploadFotografia(req, res){
    var id = req.params.id

    if(req.files){
        var file_path = req.files.foto.path
        var file_split = file_path.split('/')
        var file_name = file_split[3]
        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1]
        console.log(ext_split)
        if(file_ext =='jpg'){
            var foto = {}
            foto.imagem = file_name

            fotografias.findByPk(id)
            .then(fotografia =>{
                fotografia.update(foto)
                .then(() =>{
                    var newPath = './server/uploads/fotografias/' + file_name
                    var thumbPath = './server/uploads/fotografias/thumbs'

                    thumb({
                        source: path.resolve(newPath),
                        destination: path.resolve(thumbPath),
                        width: 200,
                        suffix: ''
                    }).then(()=>{
                        res.status(200).send({fotografia})
                    }).catch(err =>{
                        res.status(500).send({message: "Ocorreu um erro ao criar o thumbnail"})
                    })
                    //res.status(200).send({fotografia})
                })
                .catch(err =>{
                    fs.unlink(file_path, (err)=>{
                        if(err){
                            res.status(500).send({message: "Ocorreu um erro ao eliminar o arquivo"})
                        }                    
                    })
                    res.status(400).send({message:"Ocorreu um erro ao atualizar a fotografia"})
                })
            })
            .catch(err =>{
                fs.unlink(file_path, (err)=>{
                    if(err){
                        res.status(500).send({message: "Ocorreu um erro ao eliminar o arquivo"})
                    }                    
                })
                res.status(400).send({message:"Ocorreu um erro ao buscar a fotografia"})
            })
        }
        else{
            fs.unlink(file_path, (err)=>{
                if(err){
                    res.status(500).send({message: "Ocorreu um erro ao eliminar o arquivo"})
                }                    
            })
            res.status(400).send({message:"A extensão não é válida"})
        }
    }else{
        res.status(400).send({message:"Deve selecionar uma fotografia"})
    }
}

function getFotografia(req, res){
    var fotografia = req.params.fotografia
    var thumb = req.params.thumb

    if(!thumb){
        var path_foto = './server/uploads/fotografias/' + fotografia
    }else{
        var path_foto = './server/uploads/fotografias/thumbs' + fotografia
    }

    fs.exists(path_foto, (exists) =>{
        if(exists){
            res.sendFile(path.resolve(path_foto))
        }else{
            res.status(404).send({message: "Fotografia não encontrada!"})
        }
    })
}

function getAll(req, res){
    fotografias.findAll({
        where:{
            activo: true
        },
        order:[
            ['numero','ASC']
        ]
    })
    .then(fotografias =>{
        res.status(200).send({fotografias})
    })
    .catch(err=>{
        res.status(500).send({message: "Ocorreu um erro ao buscar as fotografias"})
    })
}

function getAllAdmin(req, res){
    fotografias.findAll({        
        order:[
            ['numero','ASC']
        ]
    })
    .then(fotografias =>{
        res.status(200).send({fotografias})
    })
    .catch(err=>{
        res.status(500).send({message: "Ocorreu um erro ao buscar as fotografias"})
    })
}


module.exports = {
    create,
    update,
    uploadFotografia,
    getFotografia,
    getAll,
    getAllAdmin
}