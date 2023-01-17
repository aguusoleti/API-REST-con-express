const rutaProductos = require('./rutaProductos')
const rutaUsuarios = require('./rutaUsuarios')
const rutaCategorias = require('./rutaCategorias')
var express = require('express');
const router = express.Router();

 function routerApi(app){
    const router =express.Router()
    app.use('/api/v1',router)
    router.use('/productos', rutaProductos)
    router.use('/usuarios', rutaUsuarios)
    router.use('/categorias', rutaCategorias)
}
module.exports= routerApi;