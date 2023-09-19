import { faker } from '@faker-js/faker';
import { TipoCuaderno } from '../modelsSelectService';

function generateOneTipoCuaderno(): TipoCuaderno {
  return {
    codigo: faker.datatype.uuid(),
    descripcion: faker.datatype.string(10),
  };
}

function generateNTiposDeCuaderno(quantity: number): TipoCuaderno[] {
  const tiposCuaderno: TipoCuaderno[] = [];

  for (let index = 0; index < quantity; index++) {
    tiposCuaderno.push({
      codigo: faker.datatype.uuid(),
      descripcion: faker.datatype.string(10),
    });
  }

  return tiposCuaderno;
}

export { generateNTiposDeCuaderno, generateOneTipoCuaderno };
