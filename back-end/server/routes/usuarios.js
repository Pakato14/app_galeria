const usuariosController = require('../controllers').usuarios
const md_auth = require('../authenticated/authenticated')

module.exports = (app)=>{
    app.post('/api/usuario', usuariosController.create) //md_auth.auth,
    app.post('/api/login', usuariosController.login)
    app.get('/api/usuarios', usuariosController.getAll) //md_auth.auth,
}