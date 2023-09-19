import { Encabezado } from './Encabezado';

export interface ConsultaDocumentos {
  encabezados: Encabezado[];
  page: number;
  size: number;
  total: number;
  totalResultado: number;
}
