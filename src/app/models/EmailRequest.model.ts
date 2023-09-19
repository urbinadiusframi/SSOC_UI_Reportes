import { Formulario } from './Formulario.model';

export interface EmailRequestDTO {
  buscador: Formulario;
  email: string;
  timestamp: number;
  tipoDeReporte: string;
}
