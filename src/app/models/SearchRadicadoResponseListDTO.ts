import { SearchRadicadoRequestDTO } from "./SearchRadicadoRequestDTO";

export interface SearchRadicadoResposeListDTO {
  radicados: SearchRadicadoRequestDTO[];
  total: number
}
