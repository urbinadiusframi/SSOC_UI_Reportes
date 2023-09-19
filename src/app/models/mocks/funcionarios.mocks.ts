import { faker } from '@faker-js/faker';
import { Funcionario } from '../modelsSelectService';

function generateOneFuncionario(): Funcionario {
  return {
    documento: +faker.random.numeric(),
    nombre: faker.name.firstName(),
    usuario: faker.datatype.uuid(),
    codigoDependencia: +faker.random.numeric(),
    nombreDependencia: faker.name.firstName(),
    idUsuario: faker.datatype.uuid(),
  };
}

function generateNFuncionarios(quantity: number): Funcionario[] {
  const Funcionarios: Funcionario[] = [];

  for (let index = 0; index < quantity; index++) {
    Funcionarios.push({
      documento: +faker.random.numeric(),
      nombre: faker.name.firstName(),
      usuario: faker.datatype.uuid(),
      codigoDependencia: +faker.random.numeric(),
      nombreDependencia: faker.name.firstName(),
      idUsuario: faker.datatype.uuid(),
    });
  }

  return Funcionarios;
}

export { generateOneFuncionario, generateNFuncionarios };
