const fotografiasContoller = require('../controllers').fotografias
const md_auth = require('../authenticated/authenticated')
const cm = require('connect-multiparty')
const md_upload = cm({uploadDir: './server/uploads/fotografias'})

module.exports=(app)=>{
    app.post('/api/fotografia', fotografiasContoller.create) //md_auth.auth
    app.put('/api/fotografia/:id', fotografiasContoller.update) //md_auth.auth
    app.post('/api/upload-fotografia/:id', md_upload, fotografiasContoller.uploadFotografia) //[md_auth.auth, md_upload]
    app.get('/api/get-fotografia/:fotografia/:thumb', fotografiasContoller.getFotografia) //md_auth.auth
    app.get('/api/get-fotografias', fotografiasContoller.getAll) 
    app.get('/api/get-fotografias-admin', fotografiasContoller.getAllAdmin) //md_auth.auth
}