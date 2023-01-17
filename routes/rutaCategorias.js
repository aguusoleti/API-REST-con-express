var express = require('express');
const faker = require('faker');


const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    ceramica: 'CERAMICA',
    plastico: 'PLASTICO',
    tresD: 'IMPRESION 3D',
    madera: 'MADERA',
    sublimacion: 'SUBLIMACION',
  });
});

router.get('/:categoriaId/producto/:productoId', (req, res) => {
  const { categoriaId, productoId } = req.params;
  res.json({
    categoriaId,
    productoId,
  });
});

module.exports = router;
