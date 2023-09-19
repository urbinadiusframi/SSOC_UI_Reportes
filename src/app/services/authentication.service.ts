import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, retry, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  URLBACKEND: string = environment.urlBackend;
  urlAuthenticationLogin: string = `${this.URLBACKEND}auth/api/v1/signin`;
  token: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.taskSignIn();
  }

  public signIn(): void {
    this.httpClient
      .post<any>(this.urlAuthenticationLogin, {
        username: environment.username,
        password: environment.password,
      })
      .pipe(retry(3))
      .subscribe({
        next: (res) => {
          this.token = res.token;
          this.httpHeaders = new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
          });
        },
        error: (error) => console.log(error),
      });
  }

  public signIn$(): Observable<any> {
    return this.httpClient
      .post<any>(this.urlAuthenticationLogin, {
        username: environment.username,
        password: environment.password,
      });
  }

  /**
   * Funcion para generar el token de autenticacion cada 3 horas
   */
  public taskSignIn(): void {
    timer(0, 10800000)
      .pipe(switchMap(async () => this.signIn()))
      .subscribe();
  }

  public getHttpClient(): HttpClient {
    return this.httpClient;
  }
}
