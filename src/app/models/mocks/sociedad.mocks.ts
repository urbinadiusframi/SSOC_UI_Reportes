import { faker } from '@faker-js/faker';
import { Sociedad } from '../Sociedad.model';

function generateOneSociedad(): Sociedad {
  return {
    nombreRz: faker.random.alpha(),
    numeroId: faker.random.alpha(),
    tipoDocumento: +faker.random.numeric(),
  };
}

function generateNSociedades(quantity: number): Sociedad[] {
  const sociedades: Sociedad[] = [];

  for (let index = 0; index < quantity; index++) {
    sociedades.push({
      nombreRz: faker.random.alpha(),
      numeroId: faker.random.alpha(),
      tipoDocumento: +faker.random.numeric(),
    });
  }

  return sociedades;
}

export { generateNSociedades, generateOneSociedad };
