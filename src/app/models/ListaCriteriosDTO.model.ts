export interface PageDTO {
  pageSize: number;
  pageNumber: number;
}
export interface CriteriaDTO {
  key: string;
  value: any;
  operation: 'GREATER_THAN' | 'LESS_THAN' | 'GREATER_THAN_EQUAL' | 'LESS_THAN_EQUAL' | 'NOT_EQUAL' | 'EQUAL' | 'EQUAL_IGNORE_CASE' | 'MATCH' |
  'MATCH_END' | 'IS' | 'AND' | 'IN_MANY_TO_MANY' | 'STARTS_WITH'
}

export interface ListaCriteriosDTO {
  page?: PageDTO;
  criteria?: CriteriaDTO[]
}
