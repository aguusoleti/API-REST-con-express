const faker = require('faker');
const { resolveConfig } = require('prettier');
const boom = require('@hapi/boom');
const Faker = require('faker/lib');
class servicioProductos {
  constructor() {
    this.productos = [];
    this.generar();
  }
  async generar() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.productos.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.productName(),
        precio: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock : faker.datatype.boolean()

      });
    }
  }
  async crear(data) {
    const productoNuevo = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.productos.push(productoNuevo);
    return productoNuevo;
  }
  async buscar() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.productos);
      }, 5000);
    });
  }
  async buscarUno(id) {
    const producto = this.productos.find((element) => element.id === id);
    if (!producto) {
      throw boom.notFound('producto inexistente');
    } 
    if(producto.isBlock){
      throw boom.conflict('producto bloqueado');

    }
      return producto;
    
  }
  async actualizar(id, cambio) {
    const index = this.productos.findIndex((element) => element.id === id);

    if (index === -1) {
      throw boom.notFound('producto inexistente');
    } else {
      const producto = this.productos[index];
      this.productos[index] = {
        ...producto,
        ...cambio,
      };
      return this.productos[index];
    }
  }
  async eliminar(id) {
    const index = this.productos.findIndex((element) => element.id === id);

    if (index === -1) {
      throw boom.notFound('producto inexistente');
    } else {
      this.productos.splice(index, 1);
      return { mensaje: 'todo salio bien', id };
    }
  }
}

module.exports = servicioProductos;
