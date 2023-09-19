import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { searchFields } from '../models/Busqueda.model';
import { Formulario } from '../models/Formulario.model';
import { CriteriaDTO, ListaCriteriosDTO, PageDTO } from '../models/ListaCriteriosDTO.model';
import { SearchRadicadoResposeListDTO } from '../models/SearchRadicadoResponseListDTO';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ConsultasReporteService {
  private authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  private URL: string = `${this.authenticationService.URLBACKEND}`;

  searchOnlyInDB$(buscador: ListaCriteriosDTO, token: any): Observable<SearchRadicadoResposeListDTO> {
    return this.authenticationService
      .getHttpClient()
      .post<any>(this.URL + 'reportes-radicados/api/v1/listarRadicados', buscador, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token.token}`,
        }),
      });
  }

  searchOnlyInDB(buscador: any): Observable<SearchRadicadoResposeListDTO> {
    return this.authenticationService.signIn$()
      .pipe(
        switchMap(tokenRes => this.searchOnlyInDB$(buscador, tokenRes)));
  }

}
