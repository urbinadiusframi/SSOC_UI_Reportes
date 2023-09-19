import { faker } from '@faker-js/faker';
import { Medio } from '../modelsSelectService';

function generateOneMedioEnvio(): Medio {
  return {
    codigo: faker.datatype.uuid(),
    descripcion: faker.datatype.string(10),
  };
}

function generateNMediosDeEnvio(quantity: number): Medio[] {
  const tiposDocumento: Medio[] = [];

  for (let index = 0; index < quantity; index++) {
    tiposDocumento.push({
      codigo: faker.datatype.uuid(),
      descripcion: faker.datatype.string(10),
    });
  }

  return tiposDocumento;
}

export { generateOneMedioEnvio, generateNMediosDeEnvio };
