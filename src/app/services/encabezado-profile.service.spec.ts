import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Encabezado } from '../models/Encabezado';
import { EncabezadoProfileService } from './encabezado-profile.service';
import { generateNEncabezados } from '../models/mocks/encabezado.mocks';
import { ConsultaDocumentos } from '../models/responseConsultaDocumentos';

describe('Suit de test del servicio EncabezadoProfileService', () => {
  let service: EncabezadoProfileService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EncabezadoProfileService],
      teardown: { destroyAfterEach: false },
    });

    httpTestingController = await TestBed.inject(HttpTestingController);
    service = await TestBed.inject(EncabezadoProfileService);
  });

  afterEach(() => httpTestingController.verify());

  it('Debio ser creado el servicio EncabezadoProfileService', () => {
    expect(service).toBeTruthy();
  });

  describe('Test unitarios para el metodo searchOnlyInDB', () => {
    it('Debio retornar una lista de 5 encabezados', (doneFn) => {
      const mockEncabezados: Encabezado[] = generateNEncabezados(5);
      const mockResponse: ConsultaDocumentos = {
        page: 0,
        encabezados: mockEncabezados,
        size: 0,
        total: 0,
        totalResultado: 0,
      };

      service.searchOnlyInDB('').subscribe({
        next: (response) => {
          expect(response.encabezados.length).toEqual(
            mockResponse.encabezados.length
          );
          expect(response).toEqual(mockResponse);

          doneFn();
        },
      });

      // Http config
      const url: string = `${service.getUrl()}consulta/buscador-db`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockResponse);
    });

    it('Debio retornar una lista de 20 encabezados', (doneFn) => {
      const mockEncabezados: Encabezado[] = generateNEncabezados(20);
      const mockResponse: ConsultaDocumentos = {
        page: 0,
        encabezados: mockEncabezados,
        size: 0,
        total: 0,
        totalResultado: 0,
      };

      service.searchOnlyInDB('').subscribe({
        next: (response) => {
          expect(response.encabezados.length).toEqual(
            mockResponse.encabezados.length
          );
          expect(response).toEqual(mockResponse);

          doneFn();
        },
      });

      // Http config
      const url: string = `${service.getUrl()}consulta/buscador-db`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockResponse);
    });
  });

  describe('Test unitarios para el metodo searchOnlyInCRB', () => {
    it('Debio retornar una lista de 5 encabezados', (doneFn) => {
      const mockEncabezados: Encabezado[] = generateNEncabezados(5);

      service.searchOnlyInCRB('').subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockEncabezados.length);
          expect(response).toEqual(mockEncabezados);

          doneFn();
        },
      });

      // Http config
      const url: string = `${service.getUrl()}consulta/buscador-crb`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockEncabezados);
    });

    it('Debio retornar una lista de 20 encabezados', (doneFn) => {
      const mockEncabezados: Encabezado[] = generateNEncabezados(5);

      service.searchOnlyInCRB('').subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockEncabezados.length);
          expect(response).toEqual(mockEncabezados);

          doneFn();
        },
      });

      // Http config
      const url: string = `${service.getUrl()}consulta/buscador-crb`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockEncabezados);
    });
  });

  describe('Test unitarios para el metodo searchInDBAndCRB', () => {
    it('Debio retornar una lista de 5 encabezados', (doneFn) => {
      const mockEncabezados: Encabezado[] = generateNEncabezados(5);

      service.searchInDBAndCRB('').subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockEncabezados.length);
          expect(response).toEqual(mockEncabezados);

          doneFn();
        },
      });

      // Http config
      const url: string = `${service.getUrl()}consulta/buscador-all`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockEncabezados);
    });

    it('Debio retornar una lista de 20 encabezados', (doneFn) => {
      const mockEncabezados: Encabezado[] = generateNEncabezados(5);

      service.searchInDBAndCRB('').subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockEncabezados.length);
          expect(response).toEqual(mockEncabezados);

          doneFn();
        },
      });

      // Http config
      const url: string = `${service.getUrl()}consulta/buscador-all`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockEncabezados);
    });
  });

  describe('Test unitarios para el metodo generateSearchURLDescargaMasiva', () => {
    it('Debio generar la url para la descarga masiva en base a n numeros de radicados', () => {
      const mockNumerosRadicado = generateNEncabezados(3);

      console.log(mockNumerosRadicado.length);

      mockNumerosRadicado[0].numeroRadicado = '2000-01-000004';
      mockNumerosRadicado[1].numeroRadicado = '2000-01-000008';
      mockNumerosRadicado[2].numeroRadicado = '2000-01-000014';

      const mockResultUrl =
        'https://cpd-cp4bapre.apps.ssrhv-ops01.supersociedades.local/icn/navigator/bookmark.jsp?desktop=general&repositoryId=OSrepo&repositoryType=p8&docid=StoredSearch%2C%7B3C399DAA-C880-4316-A194-958F1190E282%7D%2C%7BE01E5189-0000-CD1F-852C-95E96FF73222%7D&mimeType=application%2Fx-filenet-searchtemplate&template_name=StoredSearch&version=released&vsId=%7B6072C487-0000-CD10-8F01-E5B6D0311CB5%7D&searchCriteria=[{"property":"Num_Rad","value":["2000-01-000004","A2000-01-000004","2000-01-000008","A2000-01-000008","2000-01-000014", "A2000-01-000014"]}]&autoRunSearch=true';

      expect(
        service.generateSearchURLDescargaMasiva(mockNumerosRadicado)
      ).toEqual(mockResultUrl);
    });
  });

  describe('Test unitarios para el metodo generateUrlRadicadosYAnexos', () => {
    it('Debio retornar los encabezados con su respectiva url para visualizar el radicado principal con sus anexos', () => {
      const mockEncabezados = generateNEncabezados(3);

      mockEncabezados[0].numeroRadicado = '2000-01-000004';
      mockEncabezados[1].numeroRadicado = '2000-01-000008';
      mockEncabezados[2].numeroRadicado = '2000-01-000014';

      const baseUrl =
        'https://cpd-cp4bapre.apps.ssrhv-ops01.supersociedades.local/icn/navigator/bookmark.jsp?desktop=general&repositoryId=OSrepo&repositoryType=p8&docid=StoredSearch%2C%7B3C399DAA-C880-4316-A194-958F1190E282%7D%2C%7B50EE9A87-0000-CC17-BA8A-5B12F26B9472%7D&mimeType=application%2Fx-filenet-searchtemplate&template_name=StoredSearch&version=released&vsId=%7B50EE9A87-0000-C21E-82CD-A17BB47A1C8A%7D&searchCriteria=[';

      const result = service.generateUrlRadicadosYAnexos(mockEncabezados);

      result.forEach((a) => {
        const numRadicadoToArray = a.numeroRadicado.split('-');
        const json = encodeURIComponent(
          `{"property":"Num_Rad","value":["${a.numeroRadicado}", "A${a.numeroRadicado}", "${numRadicadoToArray[0]}-${numRadicadoToArray[1]}-A${numRadicadoToArray[2]}"]}`
        );

        expect(a.urlRadicadoYAnexos).toEqual(
          `${baseUrl}${json}]&autoRunSearch=true`
        );
      });
    });

    it('Debio retornar los encabezados con su respectiva url para visualizar el radicado principal con sus anexos', () => {
      const mockEncabezados = generateNEncabezados(3);

      mockEncabezados[0].numeroRadicado = '2000-01-000024';
      mockEncabezados[1].numeroRadicado = '2000-01-000048';
      mockEncabezados[2].numeroRadicado = '2000-01-000054';

      const baseUrl =
        'https://cpd-cp4bapre.apps.ssrhv-ops01.supersociedades.local/icn/navigator/bookmark.jsp?desktop=general&repositoryId=OSrepo&repositoryType=p8&docid=StoredSearch%2C%7B3C399DAA-C880-4316-A194-958F1190E282%7D%2C%7B50EE9A87-0000-CC17-BA8A-5B12F26B9472%7D&mimeType=application%2Fx-filenet-searchtemplate&template_name=StoredSearch&version=released&vsId=%7B50EE9A87-0000-C21E-82CD-A17BB47A1C8A%7D&searchCriteria=[';

      const result = service.generateUrlRadicadosYAnexos(mockEncabezados);

      result.forEach((a) => {
        const numRadicadoToArray = a.numeroRadicado.split('-');
        const json = encodeURIComponent(
          `{"property":"Num_Rad","value":["${a.numeroRadicado}", "A${a.numeroRadicado}", "${numRadicadoToArray[0]}-${numRadicadoToArray[1]}-A${numRadicadoToArray[2]}"]}`
        );

        expect(a.urlRadicadoYAnexos).toEqual(
          `${baseUrl}${json}]&autoRunSearch=true`
        );
      });
    });
  });
});
