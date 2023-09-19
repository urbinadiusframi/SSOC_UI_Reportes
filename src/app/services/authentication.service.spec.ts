import { HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { faker } from '@faker-js/faker';
import { AuthenticationService } from './authentication.service';

describe('Suit de test del servicio AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeAll(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
      { teardown: { destroyAfterEach: false } }
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticationService);
  });

  it('Debio ser creado el servicio AuthenticationService', () => {
    expect(service).toBeTruthy();
  });

  describe('Test unitarios al metodo signIn', () => {
    it('Se debio haber llamado a la funcion signIn', () => {
      const mockToken: string = faker.random.alphaNumeric();
      const spy = spyOn(service, 'signIn').and.callFake(() => {
        service.token = mockToken;
        service.httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${mockToken}`,
        });
      });

      service.signIn();

      expect(spy).toHaveBeenCalled();
      expect(service.token).toEqual(mockToken);
      expect(service.httpHeaders.has('Authorization')).toBeTrue();
    });
  });
});
