import { faker } from '@faker-js/faker';
import { TipoSeguridad } from '../modelsSelectService';

function generateOneTipoSeguridad(): TipoSeguridad {
  return {
    codigo: faker.datatype.uuid(),
    descripcion: faker.datatype.string(10),
  };
}

function generateNTipoSeguridad(quantity: number): TipoSeguridad[] {
  const TiposSeguridad: TipoSeguridad[] = [];

  for (let index = 0; index < quantity; index++) {
    TiposSeguridad.push({
      codigo: faker.datatype.uuid(),
      descripcion: faker.datatype.string(10),
    });
  }

  return TiposSeguridad;
}

export { generateOneTipoSeguridad, generateNTipoSeguridad };
