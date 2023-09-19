import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, retry, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import {
  Tramite,
  TipoCuaderno,
  TipoSeguridad,
  Ciudad,
  Medio,
  Departamento,
  Funcionario,
  Dependencia,
  Aplicacion,
  Proceso,
  Remitente,
  DependenciaDto,
  TramiteDto,
  FuncionarioDto,
  FuncionarioDTO,
} from '../models/modelsSelectService';
import { Modulo } from '../models/modulo.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sociedad } from '../models/Sociedad.model';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  URL = `${this.authenticationService.URLBACKEND}select-controller/api/v1/`;
  URLINSTRUMENTOS = `${environment.urlBackendAdministracionInstrumentosArchivisticos}instrumentos-archivisticos/api/v1/`;
  private tiposSeguridadSource: any = new BehaviorSubject([]);
  tiposSeguridad$: any = this.tiposSeguridadSource.asObservable();
  urlBackendCacheLucene: string = environment.urlBackendCache;

  constructor() {
    this.getSeguridad();
  }

  filtrarByNumeroIdentificacionSociedad(
    busqueda: string
  ): Observable<Sociedad[]> {
    const httpParams: HttpParams = new HttpParams().set(
      'valorBusqueda',
      busqueda
    );

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: environment.autorizacionCache,
      SSOC_INTEGRACIONES: 'consulta-migrados',
    });

    return this.authenticationService
      .getHttpClient()
      .get<Sociedad[]>(
        `${this.urlBackendCacheLucene}personaNJ/api/v1/filterNumerosIdentificacionOrNombreRazonSocialCreate`,
        {
          headers: httpHeaders,
          params: httpParams,
        }
      )
      .pipe(retry(3));
  }

  getTramites(): Observable<Tramite[]> {
    return this.authenticationService
      .getHttpClient()
      .get<Tramite[]>(`${this.URLINSTRUMENTOS}listaTramite`, {
        headers: this.authenticationService.httpHeaders,
      })
      .pipe(retry(3));
  }

  getTramitesPaginated(): Observable<TramiteDto[]> {
    return this.authenticationService.signIn$().pipe(switchMap(resToken =>
      this.authenticationService
        .getHttpClient()
        .post<TramiteDto[]>(`${this.URL}buscarTramites`, {}, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${resToken.token}`,
          }),
        })
    ));
  }

  getRemitenteByQuery(busqueda: string): Observable<Remitente[]> {
    const httpParams: HttpParams = new HttpParams().set('query', busqueda);

    return this.authenticationService
      .getHttpClient()
      .get<Remitente[]>(`${this.URL}listarFuncionarios`, {
        headers: this.authenticationService.httpHeaders,
        params: httpParams,
      })
      .pipe(retry(3));
  }

  getTipoCuaderno(): Observable<TipoCuaderno[]> {
    return this.authenticationService
      .getHttpClient()
      .get<TipoCuaderno[]>(`${this.URL}listaTipoCuaderno`, {
        headers: this.authenticationService.httpHeaders,
      })
      .pipe(retry(3));
  }

  getMediosEnvio(): Observable<Medio[]> {
    return this.authenticationService
      .getHttpClient()
      .get<Medio[]>(`${this.URL}listaMediosEnvio`, {
        headers: this.authenticationService.httpHeaders,
      })
      .pipe(retry(3));
  }

  getSeguridad(): void {
    setTimeout(() => {
      this.authenticationService
        .getHttpClient()
        .get<TipoSeguridad[]>(`${this.URL}listaTipoSeguridad`, {
          headers: this.authenticationService.httpHeaders,
        })
        .pipe(retry(3))
        .subscribe({
          next: (res) => {
            this.tiposSeguridadSource.next(res);
          },
          error: (err) => console.log(err),
        });
    }, 2000);
  }

  getCiudades(idDepartamento: string): Observable<Ciudad[]> {
    return this.authenticationService
      .getHttpClient()
      .get<Ciudad[]>(`${this.URL}listarCiudades/${idDepartamento}`, {
        headers: this.authenticationService.httpHeaders,
      })
      .pipe(retry(3));
  }

  getDepartamentos(): Observable<Departamento[]> {
    return this.authenticationService
      .getHttpClient()
      .get<Departamento[]>(`${this.URL}listarDepartamentos`, {
        headers: this.authenticationService.httpHeaders,
      })
      .pipe(retry(3));
  }

  getFuncionariosAsignados(): Observable<Funcionario[]> {
    return this.authenticationService
      .getHttpClient()
      .get<Funcionario[]>(`${this.URL}listarFuncionarios`, {
        headers: this.authenticationService.httpHeaders,
        params: new HttpParams()
          .set('codigosDependencias', '')
      })
      .pipe(retry(3));
  }

  getFuncionariosAsignadosByDependencias(dependencias: string): Observable<FuncionarioDTO[] | FuncionarioDto[]> {
    let params = new HttpParams()
      .set('codigosDependencias', dependencias);
    return this.authenticationService.signIn$()
      .pipe(
        switchMap(resToken => this.authenticationService
          .getHttpClient()
          .get<FuncionarioDTO[] | FuncionarioDto[]>(`${this.URL}listarFuncionarios`, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${resToken.token}`,
            }),
            params: params
          },
          )))

      .pipe(retry(3));
  }

  getApps(): Observable<Aplicacion[]> {
    return this.authenticationService
      .getHttpClient()
      .get<Aplicacion[]>(`${this.URL}listarApps`, {
        headers: this.authenticationService.httpHeaders,
      })
      .pipe(retry(3));
  }

  getProcesos(): Observable<Proceso[]> {
    return this.authenticationService
      .getHttpClient()
      .get<Proceso[]>(`${this.URL}listarProcesos`, {
        headers: this.authenticationService.httpHeaders,
      })
      .pipe(retry(3));
  }

  getDepedencias(): Observable<DependenciaDto[]> {
    return this.authenticationService.signIn$()
      .pipe(
        switchMap(tokenRes => this.authenticationService
          .getHttpClient()
          .get<DependenciaDto[]>(`${this.URL}listarDependencias`, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${tokenRes.token}`,
            })
          })));

  }

  getModulos(): Observable<Modulo[]> {
    return this.authenticationService
      .getHttpClient()
      .get<Modulo[]>(`${this.URL}listarModulos`, {
        headers: this.authenticationService.httpHeaders,
      })
      .pipe(retry(3));
  }
}
