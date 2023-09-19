import { faker } from '@faker-js/faker';
import { Dependencia, DependenciaDto } from '../modelsSelectService';

function generateOneDependencia(): Dependencia {
  return {
    id: +faker.datatype.uuid(),
    descripcion: faker.address.city(),
  };
}
function generateOneDependenciaDto(): DependenciaDto {
  return {
    codigo: faker.datatype.uuid(),
    nombre: faker.address.city(),
  };
}

function generateNDependencias(quantity: number): Dependencia[] {
  const Dependenciaes: Dependencia[] = [];

  for (let index = 0; index < quantity; index++) {
    Dependenciaes.push({
      id: +faker.datatype.uuid(),
      descripcion: faker.address.city(),
    });
  }

  return Dependenciaes;
}
function generateNDependenciasDto(quantity: number): DependenciaDto[] {
  const Dependenciaes: DependenciaDto[] = [];

  for (let index = 0; index < quantity; index++) {
    Dependenciaes.push({
      codigo: faker.datatype.uuid(),
      nombre: faker.address.city(),
    });
  }

  return Dependenciaes;
}

export { 
  generateOneDependencia, 
  generateOneDependenciaDto,
  generateNDependencias,
  generateNDependenciasDto,
 };
