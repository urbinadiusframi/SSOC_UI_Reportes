import { faker } from '@faker-js/faker';
import { Proceso } from '../modelsSelectService';

function generateOneProceso(): Proceso {
  return {
    codigo: faker.datatype.uuid(),
    nombreProceso: faker.datatype.string(10),
  };
}

function generateNProcesos(quantity: number): Proceso[] {
  const procesos: Proceso[] = [];

  for (let index = 0; index < quantity; index++) {
    procesos.push({
      codigo: faker.datatype.uuid(),
      nombreProceso: faker.datatype.string(10),
    });
  }

  return procesos;
}

export { generateOneProceso, generateNProcesos };
