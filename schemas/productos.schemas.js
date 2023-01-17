const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const imagen= Joi.string().uri()
const createProductShema = Joi.object({
  nombre: name.required(),
  precio: price.required(),
  imagen: imagen.required(),
});
const updateProductShema = Joi.object({
  nombre: name,
  precio: price,
  imagen: imagen,
});
const getProductShema = Joi.object({
  id: id.required(),
});
module.exports = {
  createProductShema,
  updateProductShema,
  getProductShema,
};
