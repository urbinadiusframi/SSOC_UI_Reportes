export interface Encabezado {
  id?: number;
  codigoProceso: number;
  nombreProceso: string;
  expediente: number;
  fechaRadicacionPostal: string;
  numeroRadicadoAnterior: string;
  nombreDependenciaAsignada: string;
  identificacionDependenciaAsignada: number;
  codigoTramite: number;
  nombreTramite: string;
  numeroRadicado: string;
  identificacionRemitente: string;
  usuarioRadicador: string;
  tipoRadicacion: string;
  identificacionSociedad: string;
  nombreDependenciaOrigen: string;
  codigoDependenciaOrigen: number;
  nombreSociedad: string;
  identificacionDestinatario: string;
  estado: number;
  nombreRemitente: string;
  funcionarioAsignado: string;
  funcionarioOrigen: string;
  pathFileServer: string;
  idFilenet: string;
  horaRadicacion: string;
  folios: number;
  entradaOSalida: string;
  representanteLegal: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  departamento: string;
  tipoCuaderno: string;
  medioEnvio: string;
  consecutivo: string;
  tipoSeguridad: string;
  referenciaExternaNumero: string;
  termino: number;
  multa: string;
  fechaVence: string;
  aplicacion: string;
  borrador: string;
  linea: number;
  digitalizacion: number;
  digitalizador: string;
  anexosFisicos: string;
  paquete: string;
  nombreDestinatario: string;
  responsableFirma: string;
  correoElectronico: string;
  lote: number;
  postalEstado: string;
  fechaEstadoFinancieros: string;
  modulo: string;
  usuarioQueProyecto: string;
  urlRadicadoYAnexos: string;
}