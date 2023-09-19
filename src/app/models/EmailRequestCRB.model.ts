import { Encabezado } from './Encabezado';

export interface EmailRequestCRBDTO {
  registros: Encabezado[];
  email: string;
  timestamp: number;
  tipoDeReporte: string;
}
