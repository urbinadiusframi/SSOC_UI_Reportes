import { faker } from '@faker-js/faker';
import { Modulo } from '../modulo.model';

function generateOneModulo(): Modulo {
  return {
    id: +faker.random.numeric(),
    descripcion: faker.random.alphaNumeric(),
  };
}

function generateNModulo(quantity: number): Modulo[] {
  const modulos: Modulo[] = [];

  for (let index = 0; index < quantity; index++) {
    modulos.push({
      id: +faker.random.numeric(),
      descripcion: faker.random.alphaNumeric(),
    });
  }

  return modulos;
}

export { generateOneModulo, generateNModulo };
