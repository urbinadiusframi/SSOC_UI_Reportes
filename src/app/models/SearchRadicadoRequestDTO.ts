
export interface SearchRadicadoRequestDTO {
  id?: number;
  anexosFisicos: string
  aplicaA: AplicaA
  corresponsal: Corresponsal
  dependenciaAsignada: DependenciaAsignada
  documentoPrincipal: string
  documentosAnexos: any[]
  entregaFisica: boolean
  folios: number
  funcionarioAsignado: FuncionarioAsignado
  medioDeEnvio: MedioDeEnvio
  radicacionAnteriorNumero: string
  referenciaExterna: string
  terminoDias: number
  tipo: string
  tipoCuaderno: TipoCuaderno
  tipoDocumental: TipoDocumental
  tipoSeguridad: TipoSeguridad
  tramite: Tramite
  tipoIdentificacionRadicador: string
  numeroIdentificacionRadicador: string
  multa: number
  numero: string
  fecha: string
  estado: string
  terminoFecha: string
  tipoDocumentalConsecutivo: string
  nombreRadicador: string
  documentos: Documento[]
}

export interface AplicaA {
  ciudad: Ciudad
  direccion: string
  email: string
  identificacion: string
  nombre: string
  telefono: string
  tipoIdentificacion: TipoIdentificacion
}

export interface Ciudad {
  nombre: string
}

export interface TipoIdentificacion {
  nombre: string
}

export interface Corresponsal {
  dependencia: Dependencia
  particular: Particular
  tipo: string
}

export interface Dependencia {
  codigo: number
  nombre: string
}

export interface Particular {
  ciudad: Ciudad2
  direccion: string
  email: string
  identificacion: string
  nombre: string
  telefono: string
  tipoIdentificacion: TipoIdentificacion2
}

export interface Ciudad2 {
  codigo: Codigo
  nombre: string
  departamento: string
  pais: string
}

export interface Codigo {
  ciudadCodigo: number
  paisCodigo: number
  departamentoCodigo: number
}

export interface TipoIdentificacion2 {
  nombre: string
}

export interface DependenciaAsignada {
  codigo: number
  nombre: string
}

export interface FuncionarioAsignado {
  cargo: string
  codigo: string
  nemotecnico: string
  nombre: string
  apellido: string
}

export interface MedioDeEnvio {
  codigo: number
  nombre: string
}

export interface TipoCuaderno {
  codigo: number
  nombre: string
}

export interface TipoDocumental {
  codigo: string
  nombre: string
}

export interface TipoSeguridad {
  codigo: string
  nombre: any
}

export interface Tramite {
  codigo: number
  nombre: string
  proceso: Proceso
  termino: Termino
  tipoSeguridad: TipoSeguridad2
}

export interface Proceso {
  codigo: number
  nombre: string
}

export interface Termino {
  dias: number
  esModificable: boolean
}

export interface TipoSeguridad2 {
  SALIDA: Salida
  ENTRADA: Entrada
  INTERNA: Interna
}

export interface Salida {
  codigo: string
  nombre: string
}

export interface Entrada {
  codigo: string
  nombre: string
}

export interface Interna {
  codigo: string
  nombre: string
}

export interface Documento {
  typeDocument: string
  documentId: string
  nameDocument: string
  mimeType: string
  version: string
  dateUpload: string
  uploadBy: string
}
