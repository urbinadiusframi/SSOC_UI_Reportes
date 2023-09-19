import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  Tramite,
  TipoCuaderno,
  Medio,
  TipoSeguridad,
  Aplicacion,
  Proceso,
} from '../models/modelsSelectService';
import { SelectService } from './select.service';
import {
  generateNTramites,
  generateOneTramite,
} from '../models/mocks/tramite.mock';
import {
  generateNTiposDeCuaderno,
  generateOneTipoCuaderno,
} from '../models/mocks/tipoCuaderno.mock';
import {
  generateOneMedioEnvio,
  generateNMediosDeEnvio,
} from '../models/mocks/medio.mocks';
import {
  generateOneTipoSeguridad,
  generateNTipoSeguridad,
} from '../models/mocks/seguridad.mocks';

import {
  generateOneCiudad,
  generateNCiudades,
} from '../models/mocks/ciudad.mocks';

import {
  generateOneFuncionario,
  generateNFuncionarios,
} from '../models/mocks/funcionarios.mocks';

import {
  generateOneAplicacion,
  generateNAplicaciones,
} from '../models/mocks/aplicacion.mocks';

import {
  generateOneProceso,
  generateNProcesos,
} from '../models/mocks/proceso.mocks';

import {
  generateOneDependenciaDto,
  generateNDependencias,
  generateNDependenciasDto,
} from '../models/mocks/dependencia.mocks';
import {
  generateNModulo,
  generateOneModulo,
} from '../models/mocks/modulo.mocks';
import { Modulo } from '../models/modulo.model';
import {
  generateNDepartamentos,
  generateOneDepartamentos,
} from '../models/mocks/departamento.mocks';
import {
  generateNRemitentes,
  generateOneRemitente,
} from '../models/mocks/remitente.mocks';
import {
  generateNSociedades,
  generateOneSociedad,
} from '../models/mocks/sociedad.mocks';

describe('Suit de test del servicio SelectService', () => {
  let service: SelectService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SelectService],
      teardown: { destroyAfterEach: false },
    });

    httpTestingController = await TestBed.inject(HttpTestingController);
    service = await TestBed.inject(SelectService);
  });

  afterEach(() => httpTestingController.verify());

  it('Debio ser creado el servicio SelectService', () => {
    expect(service).toBeTruthy();
  });

  describe('Test unitarios para el metodo getTramites', () => {
    it('Deberia retornar un tramite', (doneFn) => {
      const mockTramite: Tramite[] = [generateOneTramite()];

      service.getTramites().subscribe({
        next: (response) => {
          expect(response).toEqual(mockTramite);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaTramite`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockTramite);
    });

    it('Deberia retornar una lista de 5 tramites', (doneFn) => {
      const mockTramites: Tramite[] = generateNTramites(5);

      service.getTramites().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockTramites.length);
          expect(response).toEqual(mockTramites);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaTramite`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockTramites);
    });

    it('Deberia retornar una lista de 20 tramites', (doneFn) => {
      const mockTramites: Tramite[] = generateNTramites(20);

      service.getTramites().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockTramites.length);
          expect(response).toEqual(mockTramites);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaTramite`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockTramites);
    });
  });

  describe('Test unitarios para el metodo getTipoCuaderno', () => {
    it('Deberia retornar un tipo cuaderno', (doneFn) => {
      const mockTipoCuaderno: TipoCuaderno[] = [generateOneTipoCuaderno()];

      service.getTipoCuaderno().subscribe({
        next: (response) => {
          expect(response).toEqual(mockTipoCuaderno);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaTipoCuaderno`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockTipoCuaderno);
    });

    it('Deberia retornar una lista de 5 tipos de cuaderno', (doneFn) => {
      const mockTiposCuadernos: TipoCuaderno[] = generateNTiposDeCuaderno(5);

      service.getTipoCuaderno().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockTiposCuadernos.length);
          expect(response).toEqual(mockTiposCuadernos);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaTipoCuaderno`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockTiposCuadernos);
    });

    it('Deberia retornar una lista de 20 tipos de cuaderno', (doneFn) => {
      const mockTiposCuadernos: TipoCuaderno[] = generateNTiposDeCuaderno(20);

      service.getTipoCuaderno().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockTiposCuadernos.length);
          expect(response).toEqual(mockTiposCuadernos);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaTipoCuaderno`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockTiposCuadernos);
    });
  });

  describe('Test unitarios para el metodo getMediosEnvio', () => {
    it('Deberia retornar un medio de envío', (doneFn) => {
      const mockMedioEnvio: Medio[] = [generateOneMedioEnvio()];

      service.getMediosEnvio().subscribe({
        next: (response) => {
          expect(response).toEqual(mockMedioEnvio);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaMediosEnvio`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockMedioEnvio);
    });

    it('Deberia retornar una lista de 5 medios de envío', (doneFn) => {
      const mockMediosEnvio: Medio[] = generateNMediosDeEnvio(5);

      service.getMediosEnvio().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockMediosEnvio.length);
          expect(response).toEqual(mockMediosEnvio);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaMediosEnvio`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockMediosEnvio);
    });

    it('Deberia retornar una lista de 20 medios de envío', (doneFn) => {
      const mockMediosEnvio: Medio[] = generateNMediosDeEnvio(20);

      service.getMediosEnvio().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockMediosEnvio.length);
          expect(response).toEqual(mockMediosEnvio);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listaMediosEnvio`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockMediosEnvio);
    });
  });

  describe('Test unitarios para el metodo getSeguridad', () => {
    it('Deberia retornar una lista de 5 tipos de seguridad', fakeAsync(() => {
      const mockTiposSeguridad: TipoSeguridad[] = generateNTipoSeguridad(5);

      service.getSeguridad();

      tick(2000);

      // Avanzar el tiempo una vez más para asegurar que se resuelva la suscripción
      tick();

      let receivedResponse: TipoSeguridad[] = [];
      service.tiposSeguridad$.subscribe({
        next: (response: TipoSeguridad[]) => {
          receivedResponse = response;
        },
      });

      // Http config
      const url: string = `${service.URL}listaTipoSeguridad`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockTiposSeguridad);

      // Verificar que los datos se hayan asignado correctamente al BehaviorSubject
      expect(receivedResponse.length).toEqual(mockTiposSeguridad.length);
      expect(receivedResponse).toEqual(mockTiposSeguridad);
    }));
  });

  describe('Test unitarios para el metodo getCiudades', () => {
    it('Deberia retornar una ciudad', (doneFn) => {
      const mockCiudad = [generateOneCiudad()];
      const mockIdCiudad = '1';

      service.getCiudades(mockIdCiudad).subscribe({
        next: (response) => {
          expect(response).toEqual(mockCiudad);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarCiudades/${mockIdCiudad}`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockCiudad);
    });

    it('Deberia retornar una lista de 5 ciudades', (doneFn) => {
      const mockCiudades = generateNCiudades(5);
      const mockIdCiudad = '1';

      service.getCiudades(mockIdCiudad).subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockCiudades.length);
          expect(response).toEqual(mockCiudades);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarCiudades/${mockIdCiudad}`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockCiudades);
    });

    it('Deberia retornar una lista de 20 ciudades', (doneFn) => {
      const mockCiudades = generateNCiudades(20);
      const mockIdCiudad = '1';

      service.getCiudades(mockIdCiudad).subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockCiudades.length);
          expect(response).toEqual(mockCiudades);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarCiudades/${mockIdCiudad}`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockCiudades);
    });
  });

  describe('Test unitarios para el metodo getDepartamentos', () => {
    it('Deberia retornar una departamento', (doneFn) => {
      const mockDepartamento = [generateOneDepartamentos()];

      service.getDepartamentos().subscribe({
        next: (response) => {
          expect(response).toEqual(mockDepartamento);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarDepartamentos`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockDepartamento);
    });

    it('Deberia retornar una lista de 5 departamentos', (doneFn) => {
      const mockDepartamentos = generateNDepartamentos(5);

      service.getDepartamentos().subscribe({
        next: (response) => {
          expect(response).toEqual(mockDepartamentos);
          expect(response.length).toEqual(mockDepartamentos.length);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarDepartamentos`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockDepartamentos);
    });

    it('Deberia retornar una lista de 20 departamentos', (doneFn) => {
      const mockDepartamentos = generateNDepartamentos(20);

      service.getDepartamentos().subscribe({
        next: (response) => {
          expect(response).toEqual(mockDepartamentos);
          expect(response.length).toEqual(mockDepartamentos.length);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarDepartamentos`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockDepartamentos);
    });
  });

  describe('Test unitarios para el metodo getFuncionariosAsignados', () => {
    it('Deberia retornar un funcionario', (doneFn) => {
      const mockFuncionario = [generateOneFuncionario()];
      service.getFuncionariosAsignados().subscribe({
        next: (response) => {
          expect(response).toEqual(mockFuncionario);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarFuncionarios`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockFuncionario);
    });

    it('Deberia retornar una lista de 5 funcionarios', (doneFn) => {
      const mockFuncionarios = generateNFuncionarios(5);
      service.getFuncionariosAsignados().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockFuncionarios.length);
          expect(response).toEqual(mockFuncionarios);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarFuncionarios`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockFuncionarios);
    });

    it('Deberia retornar una lista de 20 funcionarios', (doneFn) => {
      const mockFuncionarios = generateNFuncionarios(20);
      service.getFuncionariosAsignados().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockFuncionarios.length);
          expect(response).toEqual(mockFuncionarios);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarFuncionarios`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockFuncionarios);
    });
  });

  describe('Test unitarios para el metodo getApps', () => {
    it('Deberia retornar una aplicacion', (doneFn) => {
      const mockAplicacion: Aplicacion[] = [generateOneAplicacion()];

      service.getApps().subscribe({
        next: (response) => {
          expect(response).toEqual(mockAplicacion);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarApps`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockAplicacion);
    });

    it('Deberia retornar una lista de 5 aplicaciones', (doneFn) => {
      const mockAplicaciones: Aplicacion[] = generateNAplicaciones(5);

      service.getApps().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockAplicaciones.length);
          expect(response).toEqual(mockAplicaciones);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarApps`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockAplicaciones);
    });

    it('Deberia retornar una lista de 20 aplicaciones', (doneFn) => {
      const mockAplicaciones: Aplicacion[] = generateNAplicaciones(20);

      service.getApps().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockAplicaciones.length);
          expect(response).toEqual(mockAplicaciones);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarApps`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockAplicaciones);
    });
  });

  describe('Test unitarios para el metodo getProcesos', () => {
    it('Deberia retornar un proceso', (doneFn) => {
      const mockProceso: Proceso[] = [generateOneProceso()];

      service.getProcesos().subscribe({
        next: (response) => {
          expect(response).toEqual(mockProceso);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarProcesos`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockProceso);
    });

    it('Deberia retornar una lista de 5 procesos', (doneFn) => {
      const procesos: Proceso[] = generateNProcesos(5);

      service.getProcesos().subscribe({
        next: (response) => {
          expect(response.length).toEqual(procesos.length);
          expect(response).toEqual(procesos);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarProcesos`;
      const request = httpTestingController.expectOne(url);

      request.flush(procesos);
    });

    it('Deberia retornar una lista de 20 aplicaciones', (doneFn) => {
      const procesos: Proceso[] = generateNProcesos(20);

      service.getProcesos().subscribe({
        next: (response) => {
          expect(response.length).toEqual(procesos.length);
          expect(response).toEqual(procesos);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarProcesos`;
      const request = httpTestingController.expectOne(url);

      request.flush(procesos);
    });
  });

  describe('Test unitarios para el metodo getDepedencias', () => {
    it('Deberia retornar una dependencia', (doneFn) => {
      const mockDependencia = {
        body: [generateOneDependenciaDto()],
      };

      service.getDepedencias().subscribe({
        next: (response) => {
          expect(response).toEqual(mockDependencia.body);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarDepedencias`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockDependencia);
    });

    it('Deberia retornar una lista de 5 dependencias', (doneFn) => {
      const dependencias = {
        body: generateNDependenciasDto(5),
      };

      service.getDepedencias().subscribe({
        next: (response) => {
          expect(response.length).toEqual(dependencias.body.length);
          expect(response).toEqual(dependencias.body);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarDepedencias`;
      const request = httpTestingController.expectOne(url);

      request.flush(dependencias);
    });

    it('Deberia retornar una lista de 20 dependencias', (doneFn) => {
      const dependencias = {
        body: generateNDependenciasDto(20),
      };

      service.getDepedencias().subscribe({
        next: (response) => {
          expect(response.length).toEqual(dependencias.body.length);
          expect(response).toEqual(dependencias.body);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarDepedencias`;
      const request = httpTestingController.expectOne(url);

      request.flush(dependencias);
    });
  });

  describe('Test unitarios para el metodo getModulos', () => {
    it('Deberia retornar un modulo', (doneFn) => {
      const mockModulos = [generateOneModulo()];

      service.getModulos().subscribe({
        next: (response) => {
          expect(response).toEqual(mockModulos);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarModulos`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockModulos);
    });

    it('Deberia retornar una lista de 5 modulos', (doneFn) => {
      const mockModulos: Modulo[] = generateNModulo(5);

      service.getModulos().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockModulos.length);
          expect(response).toEqual(mockModulos);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarModulos`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockModulos);
    });

    it('Deberia retornar una lista de 20 modulos', (doneFn) => {
      const mockModulos: Modulo[] = generateNModulo(20);

      service.getModulos().subscribe({
        next: (response) => {
          expect(response.length).toEqual(mockModulos.length);
          expect(response).toEqual(mockModulos);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}listarModulos`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockModulos);
    });
  });

  describe('Test unitarios para el metodo getRemitenteByQuery', () => {
    it('Deberia retornar un remitente', (doneFn) => {
      const mockRemitentes = [generateOneRemitente()];
      const mockValorBusqueda = 'a';

      service.getRemitenteByQuery(mockValorBusqueda).subscribe({
        next: (response) => {
          expect(response).toEqual(mockRemitentes);
          expect(response.length).toEqual(mockRemitentes.length);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}findRemitente?query=${mockValorBusqueda}`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockRemitentes);
    });

    it('Deberia retornar 20 remitentes', (doneFn) => {
      const mockRemitentes = generateNRemitentes(20);
      const mockValorBusqueda = 'a';

      service.getRemitenteByQuery(mockValorBusqueda).subscribe({
        next: (response) => {
          expect(response).toEqual(mockRemitentes);
          expect(response.length).toEqual(mockRemitentes.length);
          doneFn();
        },
      });

      // Http config
      const url: string = `${service.URL}findRemitente?query=${mockValorBusqueda}`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockRemitentes);
    });
  });

  describe('Test unitarios para el metodo filtrarByNumeroIdentificacionSociedad', () => {
    it('Deberia retornar una sociedad', (doneFn) => {
      const mockSociedades = [generateOneSociedad()];
      const mockValorBusqueda = 'a';

      service
        .filtrarByNumeroIdentificacionSociedad(mockValorBusqueda)
        .subscribe({
          next: (response) => {
            expect(response).toEqual(mockSociedades);
            expect(response.length).toEqual(mockSociedades.length);
            doneFn();
          },
        });

      // Http config
      const url: string = `${service.urlBackendCacheLucene}personaNJ/api/v1/filterNumerosIdentificacionOrNombreRazonSocialCreate?valorBusqueda=${mockValorBusqueda}`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockSociedades);
    });

    it('Deberia retornar 20 sociedades', (doneFn) => {
      const mockSociedades = generateNSociedades(20);
      const mockValorBusqueda = 'a';

      service
        .filtrarByNumeroIdentificacionSociedad(mockValorBusqueda)
        .subscribe({
          next: (response) => {
            expect(response).toEqual(mockSociedades);
            expect(response.length).toEqual(mockSociedades.length);
            doneFn();
          },
        });

      // Http config
      const url: string = `${service.urlBackendCacheLucene}personaNJ/api/v1/filterNumerosIdentificacionOrNombreRazonSocialCreate?valorBusqueda=${mockValorBusqueda}`;
      const request = httpTestingController.expectOne(url);

      request.flush(mockSociedades);
    });
  });
});
