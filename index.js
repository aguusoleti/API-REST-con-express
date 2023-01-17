var express = require('express');
const cors = require('cors');
var routerApi = require('./routes');
const faker = require('faker');
const {
  errorHandler,
  logErrores,
  boomErrorHandler,
} = require('./middlewares/error.handler');
var app = express();

const list = ['http://localhost:8080', 'https://myapp.com'];
const opcion = {
  origen: (origen, callback) => {
    if (list.includes(origen)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors());
app.get('/', (req, res) => {
  res.send('Este es el inicio');
});

routerApi(app);

// esto se coloca siempre debajo de routerapi

app.use(logErrores);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(3001, function () {
  console.log('Estoy escuchando en el puerto 3001, Hola');
});
