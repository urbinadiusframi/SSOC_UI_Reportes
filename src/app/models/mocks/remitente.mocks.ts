import { faker } from '@faker-js/faker';
import { Remitente } from '../modelsSelectService';

function generateOneRemitente(): Remitente {
  return {
    identificacionRemitente: faker.random.alpha(),
    nombreRemitente: faker.random.alpha(),
    identificacionYNombre: faker.random.alpha(),
  };
}

function generateNRemitentes(quantity: number): Remitente[] {
  const remitentes: Remitente[] = [];

  for (let index = 0; index < quantity; index++) {
    remitentes.push({
      identificacionRemitente: faker.random.alpha(),
      nombreRemitente: faker.random.alpha(),
      identificacionYNombre: faker.random.alpha(),
    });
  }

  return remitentes;
}

export { generateNRemitentes, generateOneRemitente };
