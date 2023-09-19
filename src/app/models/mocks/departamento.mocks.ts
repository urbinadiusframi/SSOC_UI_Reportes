import { faker } from '@faker-js/faker';
import { Departamento } from '../modelsSelectService';

function generateOneDepartamentos(): Departamento {
  return {
    idDepartamento: +faker.random.numeric(),
    idPais: +faker.random.numeric(),
    nombreDepartamento: faker.address.city(),
    nombrePais: faker.address.city(),
  };
}

function generateNDepartamentos(quantity: number): Departamento[] {
  const departamentos: Departamento[] = [];

  for (let index = 0; index < quantity; index++) {
    departamentos.push({
      idDepartamento: +faker.random.numeric(),
      idPais: +faker.random.numeric(),
      nombreDepartamento: faker.address.city(),
      nombrePais: faker.address.city(),
    });
  }

  return departamentos;
}

export { generateOneDepartamentos, generateNDepartamentos };
