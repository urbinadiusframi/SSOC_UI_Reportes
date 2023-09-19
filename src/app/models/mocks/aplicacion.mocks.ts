import { faker } from '@faker-js/faker';
import { Aplicacion } from '../modelsSelectService';

function generateOneAplicacion(): Aplicacion {
  return {
    system: +faker.datatype.uuid(),
    application: faker.datatype.string(10),
  };
}

function generateNAplicaciones(quantity: number): Aplicacion[] {
  const aplicaciones: Aplicacion[] = [];

  for (let index = 0; index < quantity; index++) {
    aplicaciones.push({
      system: +faker.datatype.uuid(),
      application: faker.datatype.string(10),
    });
  }

  return aplicaciones;
}

export { generateOneAplicacion, generateNAplicaciones };
