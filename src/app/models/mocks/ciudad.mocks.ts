import { faker } from '@faker-js/faker';
import { Ciudad } from '../modelsSelectService';

function generateOneCiudad(): Ciudad {
  return {
    idCiudad: +faker.random.numeric(),
    idDepartamento: +faker.random.numeric(),
    idPais: +faker.random.numeric(),
    nombreCiudad: faker.random.alphaNumeric(),
    nombrePais: faker.random.alphaNumeric(),
    nombreDepartamento: faker.random.alphaNumeric(),
  };
}

function generateNCiudades(quantity: number): Ciudad[] {
  const ciudades: Ciudad[] = [];

  for (let index = 0; index < quantity; index++) {
    ciudades.push({
      idCiudad: +faker.random.numeric(),
      idDepartamento: +faker.random.numeric(),
      idPais: +faker.random.numeric(),
      nombreCiudad: faker.random.alphaNumeric(),
      nombrePais: faker.random.alphaNumeric(),
      nombreDepartamento: faker.random.alphaNumeric(),
    });
  }

  return ciudades;
}

export { generateOneCiudad, generateNCiudades };
