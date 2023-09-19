import { inject, Injectable } from '@angular/core';
import { map, Observable, retry, switchMap, tap } from 'rxjs';
import { format } from 'date-fns';
import { AuthenticationService } from './authentication.service';
import { ConsultaDocumentos } from '../models/responseConsultaDocumentos';
import { Encabezado } from '../models/Encabezado';
import { EmailRequestDTO } from '../models/EmailRequest.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { EmailRequestCRBDTO } from '../models/EmailRequestCRB.model';
import { environment } from 'src/environments/environment';
import { SearchRadicadoRequestDTO } from '../models/SearchRadicadoRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class EncabezadoProfileService {
  private authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  private URL: string = `${this.authenticationService.URLBACKEND}`;
  private URL_DESCARGA_MASIVA: string = environment.urlDescargaMasiva;
  private URL_ANEXOS_Y_RADICADO: string = `${environment.urlRadicadosYAnexos}&searchCriteria=[`;

  generateSearchURLDescargaMasiva(encabezados: Encabezado[]): string {
    let resultado = `${this.URL_DESCARGA_MASIVA}&searchCriteria=[`;
    let urlToEncoding = '{"property":"Num_Rad","value":[';

    encabezados.slice(0, encabezados.length - 1).forEach((e) => {
      if (e.numeroRadicado) {
        urlToEncoding += `"${e.numeroRadicado}","A${e.numeroRadicado}",`;
      }
    });

    urlToEncoding += `"${encabezados.at(-1)?.numeroRadicado}", "A${encabezados.at(-1)?.numeroRadicado
      }"]}`;

    return `${resultado}${urlToEncoding}]&autoRunSearch=true`;
  }

  generateUrlRadicadosYAnexos(encabezados: SearchRadicadoRequestDTO[]) {
    const resultado = encabezados.map((a) => {
      if (!a.numero) {
        return a;
      }

      let urlToEncoding = '{"property":"Num_Rad","value":[';
      const numRadicadoToArray = a.numero.split('-');

      urlToEncoding += `"${a.numero}", "A${a.numero}", "${numRadicadoToArray[0]}-${numRadicadoToArray[1]}-A${numRadicadoToArray[2]}"]}`;

      return {
        ...a,
        urlRadicadoYAnexos: `${this.URL_ANEXOS_Y_RADICADO}${encodeURIComponent(
          urlToEncoding
        )}]&autoRunSearch=true`,
      };
    });

    return resultado;
  }

  searchOnlyInDBLegacy(buscador: any): Observable<ConsultaDocumentos> {
    return this.authenticationService
      .getHttpClient()
      .post<any>(this.URL + 'consulta/buscador-db', buscador, {
        headers: this.authenticationService.httpHeaders,
      });
  }

  searchOnlyInDB$(buscador: any, token: any): Observable<ConsultaDocumentos> {
    return this.authenticationService
      .getHttpClient()
      .post<any>(this.URL + 'consulta/buscador-db', buscador, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token.token}`,
        }),
      });
  }

  searchOnlyInDB(buscador: any): Observable<ConsultaDocumentos> {
    return this.authenticationService.signIn$()
      .pipe(
        switchMap(tokenRes => this.searchOnlyInDB$(buscador, tokenRes)));
  }

  searchOnlyInCRB(busquedaPorContenido: any): Observable<Encabezado[]> {
    return this.authenticationService
      .getHttpClient()
      .post<any>(
        this.URL + 'consulta/buscador-crb',
        new HttpParams().set('busquedaPorContenido', busquedaPorContenido),
        {
          headers: this.authenticationService.httpHeaders,
        }
      );
  }

  searchInDBAndCRB(buscador: any): Observable<Encabezado[]> {
    return this.authenticationService
      .getHttpClient()
      .post<any>(this.URL + 'consulta/buscador-all', buscador, {
        headers: this.authenticationService.httpHeaders,
      });
  }

  sendReportToEmail(emailRequestDTO: EmailRequestDTO) {
    return this.authenticationService
      .getHttpClient()
      .post<any>(`${this.URL}consulta/send-email`, emailRequestDTO, {
        headers: this.authenticationService.httpHeaders,
      });
  }

  sendReportToEmailWithCRB(emailRequestDTO: EmailRequestCRBDTO) {
    return this.authenticationService
      .getHttpClient()
      .post<any>(`${this.URL}consulta/send-email-crb`, emailRequestDTO, {
        headers: this.authenticationService.httpHeaders,
      });
  }

  generateReportPdf(buscador: any) {
    return this.authenticationService
      .getHttpClient()
      .post<any>(`${this.URL}consulta/report-pdf`, buscador, {
        headers: this.authenticationService.httpHeaders,
        responseType: 'arraybuffer' as 'json',
      })
      .pipe(
        tap((response) => this.generateLinkDownload(response, false)),
        map(() => true)
      );
  }

  generateReportExcel(buscador: any) {
    return this.authenticationService
      .getHttpClient()
      .post<any>(`${this.URL}reportes-radicados/api/v1/report-excel`, buscador, {
        headers: this.authenticationService.httpHeaders,
        responseType: 'arraybuffer' as 'json',
      })
      .pipe(
        tap((response) => this.generateLinkDownload(response)),
        map(() => true)
      );
  }

  generateReportPdfWithCRB(encabezados: Encabezado[]) {
    return this.authenticationService
      .getHttpClient()
      .post<any>(`${this.URL}consulta/report-pdf-crb`, encabezados, {
        headers: this.authenticationService.httpHeaders,
        responseType: 'arraybuffer' as 'json',
      })
      .pipe(
        tap((response) => this.generateLinkDownload(response, false)),
        map(() => true)
      );
  }

  generateReportExcelWithCRB(encabezados: Encabezado[]) {
    return this.authenticationService
      .getHttpClient()
      .post<any>(`${this.URL}consulta/report-excel-crb`, encabezados, {
        headers: this.authenticationService.httpHeaders,
        responseType: 'arraybuffer' as 'json',
      })
      .pipe(
        tap((response) => this.generateLinkDownload(response)),
        map(() => true)
      );
  }

  generateLinkDownload(response: any, isExcel: boolean = true) {
    let reporte = null;

    if (isExcel) {
      reporte = new Blob([response], { type: 'text/xlsx' });
    } else {
      reporte = new Blob([response], { type: 'application/pdf' });
    }

    const link = document.createElement('a');
    link.href = URL.createObjectURL(reporte);
    link.download = `Reporte radicación ${format(new Date(), 'dd-MM-yyyy')}${isExcel ? '.xlsx' : '.pdf'
      }`;
    link.click();
    link.remove();
  }

  getUrl(): string {
    return this.URL;
  }
}
