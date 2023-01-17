const { application } = require('express');
var express = require('express');
const servicioProductos = require('./../service/servicioProductos');
const {
  createProductShema,
  getProductShema,
  updateProductShema,
} = require('./../schemas/productos.schemas');
const validacionHandler = require('./../middlewares/handlerValidacion');
const router = express.Router();
const servicio = new servicioProductos();
router.use(express.json());

router.get('/', async (req, res) => {
  const productos = await servicio.buscar();
  res.send(productos);
});

router.get('/filter', (req, res) => {
  res.send('yo soy un filtro');
});

router.get(
  '/:id',
  validacionHandler(getProductShema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const producto = await servicio.buscarUno(id);
      res.status(201).json(producto);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validacionHandler(createProductShema, 'body'),
  async (req, res) => {
    const body = req.body;
    const productoNuevo = await servicio.crear(body);
    res.status(201).json(productoNuevo);
  }
);
router.patch(
  '/:id',
  validacionHandler(getProductShema, 'params'),
  validacionHandler(updateProductShema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const producto = await servicio.actualizar(id, body);
      res.json(producto);
    } catch (error) {
      res.send(error);
    }
  }
);
router.delete(
  '/:id',
  validacionHandler(getProductShema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    try {
      const producto = await servicio.eliminar(id);

      res.json({ mensaje: 'producto eliminado correctamente' });
    } catch (error) {
      res.status(404).json({
        mensaje: error.message,
      });
    }
  }
);
module.exports = router;
