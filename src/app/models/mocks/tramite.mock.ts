import { faker } from '@faker-js/faker';
import { Tramite } from '../modelsSelectService';

function generateOneTramite(): Tramite {
  return {
    codigo: faker.datatype.uuid(),
    nombreTramite: faker.datatype.string(10),
    unionCodigoNombreTramite: faker.datatype.string(10),
  };
}

function generateNTramites(quantity: number): Tramite[] {
  const tramites: Tramite[] = [];

  for (let index = 0; index < quantity; index++) {
    tramites.push({
      codigo: faker.datatype.uuid(),
      nombreTramite: faker.datatype.string(10),
      unionCodigoNombreTramite: faker.datatype.string(10),
    });
  }

  return tramites;
}

export { generateNTramites, generateOneTramite };
