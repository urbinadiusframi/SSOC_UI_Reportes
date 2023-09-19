interface Codigo {
  codigo: string;
}

interface Descripcion {
  descripcion: string;
}

interface Nombre {
  nombre: string;
}

interface Tramite extends Codigo {
  nombreTramite: string;
  unionCodigoNombreTramite: string;
}
interface TramiteDto extends Codigo {
  nombre: string;
}

interface TipoCuaderno extends Codigo, Descripcion {}

interface Medio extends Codigo, Descripcion {}

interface TipoSeguridad extends Codigo, Descripcion {}

interface TipoSeguridadDto extends Codigo, Nombre {}

interface Ciudad {
  idCiudad: number;
  idDepartamento: number;
  idPais: number;
  nombreCiudad: string;
  nombrePais: string;
  nombreDepartamento: string;
}

interface Departamento {
  idDepartamento: number;
  idPais: number;
  nombreDepartamento: string;
  nombrePais: string;
}

interface Funcionario {
  documento: number;
  nombre: string;
  usuario: string;
  codigoDependencia: number;
  nombreDependencia: string;
  idUsuario: string;
}

interface FuncionarioDTO {
  numeroDocumento: number;
  nombre: string;
  username: string;
}

interface FuncionarioDto {
  nombreEmpleado: number;
  apellidoEmpleado: string;
  coDep: string;
  funcionario: number;
}

interface Aplicacion {
  system: number;
  application: string;
}

interface Proceso extends Codigo {
  nombreProceso: string;
}

interface Dependencia extends Descripcion {
  id: number;
}
interface DependenciaDto extends Codigo {
  nombre: string;
}

interface Remitente {
  identificacionRemitente: string;
  nombreRemitente: string;
  identificacionYNombre: string;
}

export {
  Remitente,
  Tramite,
  TramiteDto,
  Aplicacion,
  Ciudad,
  Dependencia,
  DependenciaDto,
  Funcionario,
  FuncionarioDto,
  FuncionarioDTO,
  Medio,
  Proceso,
  TipoCuaderno,
  Departamento,
  TipoSeguridad,
  TipoSeguridadDto,
};
