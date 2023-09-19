import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AbstractControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { EncabezadoProfileService } from 'src/app/services/encabezado-profile.service';
import { SelectService } from 'src/app/services/select.service';

import { ValidatorsFormService } from 'src/app/services/validators-form.service';
import { CustomModalService } from 'src/app/services/custom-modal.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  Aplicacion,
  Ciudad,
  Departamento,
  Dependencia,
  Funcionario,
  Medio,
  Proceso,
  TipoCuaderno,
  Tramite,
} from 'src/app/models/modelsSelectService';
import { generateNCiudades } from 'src/app/models/mocks/ciudad.mocks';
import { of } from 'rxjs';
import { generateNAplicaciones } from 'src/app/models/mocks/aplicacion.mocks';
import { generateNFuncionarios } from 'src/app/models/mocks/funcionarios.mocks';
import { generateNTramites } from 'src/app/models/mocks/tramite.mock';
import { generateNTiposDeCuaderno } from 'src/app/models/mocks/tipoCuaderno.mock';
import { Modulo } from 'src/app/models/modulo.model';
import { generateNModulo } from 'src/app/models/mocks/modulo.mocks';
import { generateNMediosDeEnvio } from 'src/app/models/mocks/medio.mocks';
import { generateNDepartamentos } from 'src/app/models/mocks/departamento.mocks';
import { generateNProcesos } from 'src/app/models/mocks/proceso.mocks';
import { generateNDependencias } from 'src/app/models/mocks/dependencia.mocks';
import { Formulario } from 'src/app/models/Formulario.model';
import { faker } from '@faker-js/faker';
// import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TrimPipe } from 'src/app/pipes/trim-pipe.pipe';
import { environment } from 'src/environments/environment';
import { HomeComponent } from 'src/app/basica/pages/home/home.component';

describe('Suit de test unitarios para el componente HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let selectService: SelectService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeAll(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
      { teardown: { destroyAfterEach: false } }
    );
  });

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        UntypedFormBuilder,
        SelectService,
        EncabezadoProfileService,
        ValidatorsFormService,
        CustomModalService,
        { provide: MatDialog, useValue: spy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent, TrimPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    selectService = TestBed.inject(SelectService);
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('Debio crearse el componente HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debio crearse el componente HomeComponent con las urls de desarrollo', () => {
    environment.production = false;

    expect(environment.production).toBeFalse();

    component = TestBed.createComponent(HomeComponent).componentInstance;

    expect(component).toBeTruthy();
    expect(component.logos.email).toEqual(
      'https://res.cloudinary.com/dwnvlpcas/image/upload/v1689786479/outlook_1_npdhlr.webp'
    );
    expect(component.logos.excel).toEqual(
      'https://res.cloudinary.com/dwnvlpcas/image/upload/v1681143295/sobresalir_lypsqa.webp'
    );
    expect(component.logos.pdf).toEqual(
      'https://res.cloudinary.com/dwnvlpcas/image/upload/v1681143295/pdf_1_smfqlf.webp'
    );
  });

  it('Debio crearse el componente HomeComponent con las urls de produccion', () => {
    environment.production = true;

    expect(environment.production).toBeTrue();

    component = TestBed.createComponent(HomeComponent).componentInstance;

    expect(component).toBeTruthy();
    expect(component.logos.email).toEqual(
      '/ConsultaMigrados/assets/logo_outlook.webp'
    );
    expect(component.logos.excel).toEqual(
      '/ConsultaMigrados/assets/logo_excel.webp'
    );
    expect(component.logos.pdf).toEqual(
      '/ConsultaMigrados/assets/logo_pdf.webp'
    );
  });

  describe('Test unitarios al metodo getPage', () => {
    it('Debio retornar el número actual de pagina', () => {
      const paginaActual: number =
        component.formularioBusquedad.get('page')?.value;
      const resultado: number = component.getPage();

      expect(resultado).toEqual(paginaActual);
    });
  });

  describe('Test unitarios al metodo antes', () => {
    it('Debio retornar el número actual de pagina menos -1', () => {
      const paginaActual: number =
        component.formularioBusquedad.get('page')?.value - 1;

      component.antes();

      const resultado: number =
        component.formularioBusquedad.get('page')?.value;

      expect(resultado).toEqual(paginaActual);
    });
  });

  describe('Test unitarios al metodo despues', () => {
    it('Debio retornar el número actual de pagina mas 1', () => {
      const paginaActual: number =
        component.formularioBusquedad.get('page')?.value + 1;

      component.despues();

      const resultado: number =
        component.formularioBusquedad.get('page')?.value;

      expect(resultado).toEqual(paginaActual);
    });
  });

  describe('Test unitarios al metodo onChangeCuantityRegisters', () => {
    it('Debio retornar la cantidad de registros, despues de ejecutar el metodo onChangeCuantityRegisters', () => {
      let cantidadRegistros: number | string =
        component.formularioBusquedad.get('cantidadRegistros')?.value;
      const input: HTMLInputElement = document.createElement('input');
      input.setAttribute('value', '20');

      expect(cantidadRegistros).toEqual(50);
      expect(input.value).toEqual('20');

      input.addEventListener('click', (e) =>
        component.onChangeCuantityRegisters(e)
      );

      input.click();

      cantidadRegistros =
        component.formularioBusquedad.get('cantidadRegistros')?.value;

      expect(cantidadRegistros).toEqual('20');
    });
  });

  describe('Test unitarios al formulario formularioBusquedad', () => {
    it('Debio retornar true, porque el campo numeroRadicado es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputNRadicado: AbstractControl = form.controls['numeroRadicado'];

      inputNRadicado.setValue('sssssssssssssssssssssssssssss');

      expect(form.get('numeroRadicado')?.value).toEqual(
        'sssssssssssssssssssssssssssss'
      );

      expect(form.get('numeroRadicado')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo expediente es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputExpedienteSS: AbstractControl = form.controls['expediente'];

      inputExpedienteSS.setValue('s'.repeat(21));

      expect(form.get('expediente')?.value).toEqual('s'.repeat(21));

      expect(form.get('expediente')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo numeroRadicadoAnterior es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputNRadicadoAnterior: AbstractControl =
        form.controls['numeroRadicadoAnterior'];

      inputNRadicadoAnterior.setValue('sssssssssssssssssssssssssssss');

      expect(form.get('numeroRadicadoAnterior')?.value).toEqual(
        'sssssssssssssssssssssssssssss'
      );

      expect(form.get('numeroRadicadoAnterior')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo identificacionDestinatario es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputIdentificacionSociedad: AbstractControl =
        form.controls['identificacionDestinatario'];

      inputIdentificacionSociedad.setValue('s'.repeat(21));

      expect(form.get('identificacionDestinatario')?.value).toEqual(
        's'.repeat(21)
      );

      expect(form.get('identificacionDestinatario')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo direccion es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputDireccion: AbstractControl = form.controls['direccion'];

      inputDireccion.setValue('s'.repeat(101));

      expect(form.get('direccion')?.value).toEqual('s'.repeat(101));

      expect(form.get('direccion')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo telefono es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputTelefono: AbstractControl = form.controls['telefono'];

      inputTelefono.setValue('s'.repeat(13));

      expect(form.get('telefono')?.value).toEqual('s'.repeat(13));

      expect(form.get('telefono')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo consecutivo es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputConsecutivo: AbstractControl = form.controls['consecutivo'];

      inputConsecutivo.setValue('s'.repeat(26));

      expect(form.get('consecutivo')?.value).toEqual('s'.repeat(26));

      expect(form.get('consecutivo')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo refExternaNumero es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputRefExternaNumero: AbstractControl =
        form.controls['referenciaExternaNumero'];

      inputRefExternaNumero.setValue('s'.repeat(61));

      expect(form.get('referenciaExternaNumero')?.value).toEqual(
        's'.repeat(61)
      );

      expect(form.get('referenciaExternaNumero')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo termino es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputTermino: AbstractControl = form.controls['termino'];

      inputTermino.setValue(+'9'.repeat(91));

      expect(form.get('termino')?.value).toEqual(+'9'.repeat(91));

      expect(form.get('termino')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo termino es invalido ya que se ingresaron numeros negativos', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputTermino: AbstractControl = form.controls['termino'];

      inputTermino.setValue(-1);

      expect(form.get('termino')?.value).toEqual(-1);

      expect(form.get('termino')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo usuarioRadico es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputUsuarioRadico: AbstractControl =
        form.controls['usuarioRadicador'];

      inputUsuarioRadico.setValue('s'.repeat(81));

      expect(form.get('usuarioRadicador')?.value).toEqual('s'.repeat(81));

      expect(form.get('usuarioRadicador')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo multa es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputMulta: AbstractControl = form.controls['multa'];

      inputMulta.setValue(999999999);

      expect(form.get('multa')?.value).toEqual(999999999);

      expect(form.get('multa')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo borrador es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputBorrador: AbstractControl = form.controls['borrador'];

      inputBorrador.setValue('s'.repeat(21));

      expect(form.get('borrador')?.value).toEqual('s'.repeat(21));

      expect(form.get('borrador')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo lote es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputLote: AbstractControl = form.controls['lote'];

      inputLote.setValue('s'.repeat(101));

      expect(form.get('lote')?.value).toEqual('s'.repeat(101));

      expect(form.get('lote')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo folios es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputFolio: AbstractControl = form.controls['folios'];

      inputFolio.setValue(+'4'.repeat(5));

      expect(form.get('folios')?.value).toEqual(+'4'.repeat(5));

      expect(form.get('folios')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo busquedaPorContenido es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputBusquedaTexto: AbstractControl =
        form.controls['busquedaPorContenido'];

      inputBusquedaTexto.setValue('s'.repeat(501));

      expect(form.get('busquedaPorContenido')?.value).toEqual('s'.repeat(501));

      expect(form.get('busquedaPorContenido')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });

    it('Debio retornar true, porque el campo nombreDestinatario es invalido ya que no cumplio con el maximo de caracteres', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputNombreDestino: AbstractControl =
        form.controls['nombreDestinatario'];

      inputNombreDestino.setValue('s'.repeat(289));

      expect(form.get('nombreDestinatario')?.value).toEqual('s'.repeat(289));

      expect(form.get('nombreDestinatario')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
    });
  });

  describe('Test unitarios al metodo limpiarFormulario', () => {
    it('Deberia retornar true ya que el formulario se limpio exitosamente', () => {
      const form: FormGroup = component.formularioBusquedad;
      const inputFechaRadicacion: AbstractControl =
        form.controls['fechaRadicacion'];
      const inputFechaHasta: AbstractControl = form.controls['fechaHasta'];

      inputFechaRadicacion.setValue('2022-01-20');
      inputFechaHasta.setValue('2022-03-20');

      expect(inputFechaRadicacion.value).toEqual('2022-01-20');
      expect(inputFechaHasta.value).toEqual('2022-03-20');

      component.limpiarFormulario();

      expect(inputFechaRadicacion.value).toEqual('');
      expect(inputFechaHasta.value).toEqual('');
      expect(form.valid).toBeTrue();
    });
  });

  /*describe('Test unitarios para el metodo consultar', () => {
    it('Deberia retornar true y se deberia mostrar el componente de loading porque se realizo la consulta', () => {
      expect(component.loading).toBeFalse();

      component.consultar();

      fixture.detectChanges();

      expect(component.loading).toBeTrue();

      const componentLoader = fixture.debugElement.queryAll(
        By.directive(MatProgressBar)
      );

      expect(component.loading).toBeTrue();
      expect(componentLoader).toBeTruthy();
    });

    it('Deberia retornar true porque se realizo la consulta', () => {
      component.consultar();

      expect(component.loading).toBeTrue();
    });
  });*/

  describe('Test unitarios para el metodo getCiudades', () => {
    it('Debio retornar un listado de 10 ciudades', fakeAsync(() => {
      const mockCiudades: Ciudad[] = generateNCiudades(10);

      spyOn(selectService, 'getCiudades').and.returnValue(of(mockCiudades));

      component.getCiudades('123');

      tick();

      expect(component.ciudades).toEqual(mockCiudades);
      expect(component.ciudades.length).toEqual(mockCiudades.length);
    }));

    it('Debio retornar un listado de 20 ciudades', fakeAsync(() => {
      const mockCiudades: Ciudad[] = generateNCiudades(20);

      spyOn(selectService, 'getCiudades').and.returnValue(of(mockCiudades));

      component.getCiudades('123');

      tick();

      expect(component.ciudades).toEqual(mockCiudades);
      expect(component.ciudades.length).toEqual(mockCiudades.length);
    }));
  });

  describe('Test unitarios para el metodo getApps', () => {
    it('Debio retornar un listado de 10 apps', fakeAsync(() => {
      const mockApps: Aplicacion[] = generateNAplicaciones(10);

      spyOn(selectService, 'getApps').and.returnValue(of(mockApps));

      component.getApps();

      tick(1500);

      expect(component.apps).toEqual(mockApps);
      expect(component.apps.length).toEqual(mockApps.length);
    }));

    it('Debio retornar un listado de 20 apps', fakeAsync(() => {
      const mockApps: Aplicacion[] = generateNAplicaciones(20);

      spyOn(selectService, 'getApps').and.returnValue(of(mockApps));

      component.getApps();

      tick(1500);

      expect(component.apps).toEqual(mockApps);
      expect(component.apps.length).toEqual(mockApps.length);
    }));
  });

  describe('Test unitarios para el metodo getFuncionarioAsignados', () => {
    it('Debio retornar un listado de 10 funcionarios', fakeAsync(() => {
      const mockFuncionarios: Funcionario[] = generateNFuncionarios(10);
      const mockResponse: string[] = mockFuncionarios.map((a) =>
        `${a.idUsuario} - ${a.nombre}`.toUpperCase().trim()
      );

      spyOn(selectService, 'getFuncionariosAsignados').and.returnValue(
        of(mockFuncionarios)
      );

      component.getFuncionarioAsignados();

      tick(1500);

      expect(component.funcionarios).toEqual(mockResponse);
      expect(component.funcionarios.length).toEqual(mockResponse.length);
    }));

    it('Debio retornar un listado de 20 funcionarios', fakeAsync(() => {
      const mockFuncionarios: Funcionario[] = generateNFuncionarios(20);
      const mockResponse: string[] = mockFuncionarios.map((a) =>
        `${a.idUsuario} - ${a.nombre}`.toUpperCase().trim()
      );

      spyOn(selectService, 'getFuncionariosAsignados').and.returnValue(
        of(mockFuncionarios)
      );

      component.getFuncionarioAsignados();

      tick(1500);

      expect(component.funcionarios).toEqual(mockResponse);
      expect(component.funcionarios.length).toEqual(mockResponse.length);
    }));
  });

  describe('Test unitarios para el metodo getTramite', () => {
    it('Debio retornar un listado de 10 tramites', fakeAsync(() => {
      const mockTramites: Tramite[] = generateNTramites(10);
      const mockResponse: string[] = mockTramites.map(
        (a) => a.unionCodigoNombreTramite
      );

      spyOn(selectService, 'getTramites').and.returnValue(of(mockTramites));

      component.getTramite();

      tick(1500);

      expect(component.tramites).toEqual(mockResponse);
      expect(component.tramites.length).toEqual(mockResponse.length);
    }));

    it('Debio retornar un listado de 20 tramites', fakeAsync(() => {
      const mockTramites: Tramite[] = generateNTramites(20);
      const mockResponse: string[] = mockTramites.map(
        (a) => a.unionCodigoNombreTramite
      );

      spyOn(selectService, 'getTramites').and.returnValue(of(mockTramites));

      component.getTramite();

      tick(1500);

      expect(component.tramites).toEqual(mockResponse);
      expect(component.tramites.length).toEqual(mockResponse.length);
    }));
  });

  describe('Test unitarios para el metodo getTipoCuaderno', () => {
    it('Debio retornar un listado de 10 tipos de cuaderno', fakeAsync(() => {
      const mockTipoCuaderno: TipoCuaderno[] = generateNTiposDeCuaderno(10);

      spyOn(selectService, 'getTipoCuaderno').and.returnValue(
        of(mockTipoCuaderno)
      );

      component.getTipoCuaderno();

      tick(1500);

      expect(component.tipoCuaderno).toEqual(mockTipoCuaderno);
      expect(component.tipoCuaderno.length).toEqual(mockTipoCuaderno.length);
    }));

    it('Debio retornar un listado de 20 tipos de cuaderno', fakeAsync(() => {
      const mockTipoCuaderno: TipoCuaderno[] = generateNTiposDeCuaderno(20);

      spyOn(selectService, 'getTipoCuaderno').and.returnValue(
        of(mockTipoCuaderno)
      );

      component.getTipoCuaderno();

      tick(1500);

      expect(component.tipoCuaderno).toEqual(mockTipoCuaderno);
      expect(component.tipoCuaderno.length).toEqual(mockTipoCuaderno.length);
    }));
  });

  describe('Test unitarios para el metodo getModulos', () => {
    it('Debio retornar un listado de 10 modulos', fakeAsync(() => {
      const mockModulos: Modulo[] = generateNModulo(10);

      spyOn(selectService, 'getModulos').and.returnValue(of(mockModulos));

      component.getModulos();

      tick(1500);

      expect(component.modulo).toEqual(mockModulos);
      expect(component.modulo.length).toEqual(mockModulos.length);
    }));

    it('Debio retornar un listado de 20 modulos', fakeAsync(() => {
      const mockModulos: Modulo[] = generateNModulo(20);

      spyOn(selectService, 'getModulos').and.returnValue(of(mockModulos));

      component.getModulos();

      tick(1500);

      expect(component.modulo).toEqual(mockModulos);
      expect(component.modulo.length).toEqual(mockModulos.length);
    }));
  });

  describe('Test unitarios para el metodo getMediosEnvio', () => {
    it('Debio retornar un listado de 10 medios de envio', fakeAsync(() => {
      const mockMedioEnvio: Medio[] = generateNMediosDeEnvio(10);

      spyOn(selectService, 'getMediosEnvio').and.returnValue(
        of(mockMedioEnvio)
      );

      component.getMediosEnvio();

      tick(1500);

      expect(component.MEDIO).toEqual(mockMedioEnvio);
      expect(component.MEDIO.length).toEqual(mockMedioEnvio.length);
    }));

    it('Debio retornar un listado de 20 medios de envio', fakeAsync(() => {
      const mockMedioEnvio: Medio[] = generateNMediosDeEnvio(10);

      spyOn(selectService, 'getMediosEnvio').and.returnValue(
        of(mockMedioEnvio)
      );

      component.getMediosEnvio();

      tick(1500);

      expect(component.MEDIO).toEqual(mockMedioEnvio);
      expect(component.MEDIO.length).toEqual(mockMedioEnvio.length);
    }));
  });

  describe('Test unitarios para el metodo getDepartamentos', () => {
    it('Debio retornar un listado de 10 departamentos', fakeAsync(() => {
      const mockDepartamentos: Departamento[] = generateNDepartamentos(10);

      spyOn(selectService, 'getDepartamentos').and.returnValue(
        of(mockDepartamentos)
      );

      component.getDepartamentos();

      tick(1500);

      expect(component.departamentos).toEqual(mockDepartamentos);
      expect(component.departamentos.length).toEqual(mockDepartamentos.length);
    }));

    it('Debio retornar un listado de 20 departamentos', fakeAsync(() => {
      const mockDepartamentos: Departamento[] = generateNDepartamentos(10);

      spyOn(selectService, 'getDepartamentos').and.returnValue(
        of(mockDepartamentos)
      );

      component.getDepartamentos();

      tick(1500);

      expect(component.departamentos).toEqual(mockDepartamentos);
      expect(component.departamentos.length).toEqual(mockDepartamentos.length);
    }));
  });

  describe('Test unitarios para el metodo getProceso', () => {
    it('Debio retornar un listado de 10 procesos', fakeAsync(() => {
      const mockProcesos: Proceso[] = generateNProcesos(10);
      const mockResponse: string[] = mockProcesos.map((a) =>
        `${a.codigo} - ${a.nombreProceso}`.toUpperCase().trim()
      );

      spyOn(selectService, 'getProcesos').and.returnValue(of(mockProcesos));

      component.getProceso();

      tick(1500);

      expect(component.procesos).toEqual(mockResponse);
      expect(component.procesos.length).toEqual(mockResponse.length);
    }));

    it('Debio retornar un listado de 20 procesos', fakeAsync(() => {
      const mockProcesos: Proceso[] = generateNProcesos(20);
      const mockResponse: string[] = mockProcesos.map((a) =>
        `${a.codigo} - ${a.nombreProceso}`.toUpperCase().trim()
      );

      spyOn(selectService, 'getProcesos').and.returnValue(of(mockProcesos));

      component.getProceso();

      tick(1500);

      expect(component.procesos).toEqual(mockResponse);
      expect(component.procesos.length).toEqual(mockResponse.length);
    }));
  });

  describe('Test unitarios para el metodo getDependencia', () => {
    it('Debio retornar un listado de 10 dependencias', fakeAsync(() => {
      const mockDependencias: Dependencia[] = generateNDependencias(10);
      const mockResponse: string[] = mockDependencias.map((a) =>
        `${a.id} - ${a.descripcion}`.toUpperCase().trim()
      );

      spyOn(selectService, 'getDepedencias').and.returnValue(
        of({
          body: mockDependencias,
        })
      );

      component.getDependencia();

      tick(1500);

      expect(component.dependencias).toEqual(mockResponse);
      expect(component.dependencias.length).toEqual(mockResponse.length);
    }));

    it('Debio retornar un listado de 20 dependencias', fakeAsync(() => {
      const mockDependencias: Dependencia[] = generateNDependencias(20);
      const mockResponse: string[] = mockDependencias.map((a) =>
        `${a.id} - ${a.descripcion}`.toUpperCase().trim()
      );

      spyOn(selectService, 'getDepedencias').and.returnValue(
        of({
          body: mockDependencias,
        })
      );

      component.getDependencia();

      tick(1500);

      expect(component.dependencias).toEqual(mockResponse);
      expect(component.dependencias.length).toEqual(mockResponse.length);
    }));
  });

  describe('Test unitarios para el metodo onChangesInInputDepartamento', () => {
    it('Se debio llamar al metodo onChangesInInputDepartamento', () => {
      const mockIdDepartamento: string = '1245';

      spyOn(component, 'getCiudades').and.callFake(() => {});

      component.onChangesInInputDepartamento(mockIdDepartamento);

      expect(component.getCiudades).toHaveBeenCalled();
    });
  });

  describe('Test unitarios para el metodo isEmptyBusquedaPorContenido', () => {
    it('Debio retornar true porque el campo busquedaPorContenido del formulario esta vacio, pero el resto de campos estan llenos o al menos uno', () => {
      const mockFormulario: Formulario = {
        numeroRadicado: '2000-01-000000',
        expediente: '',
        representanteLegal: '',
        entrada: '',
        salida: '',
        fechaRadicacion: '',
        fechaHasta: '',
        horaRadicacion: '',
        numeroRadicadoAnterior: '',
        codigoProceso: '',
        codigoTramite: '',
        identificacionDependenciaAsignada: '',
        funcionarioAsignado: '',
        funcionarioOrigen: '',
        identificacionDestinatario: '',
        direccion: '',
        telefono: '',
        tipoCuaderno: '',
        medioEnvio: '',
        consecutivo: '',
        tipoSeguridad: '',
        referenciaExternaNumero: '',
        termino: '',
        usuarioRadicador: '',
        multa: '',
        responsableFirma: '',
        fechaVence: '',
        modulo: '',
        aplicacion: '',
        fechaEstadosFinancieros: '',
        estado: '',
        usuario: '',
        anexosFisicos: '',
        borrador: '',
        lote: '',
        linea: '',
        digitalizacion: '',
        digitalizador: '',
        correoElectronico: '',
        folios: '',
        ciudad: '',
        codigoDependenciaOrigen: '',
        page: 0,
        cantidadRegistros: 0,
        identificacionSociedad: '',
        nombreSociedad: '',
        paquete: '',
        nombreDestinatario: '',
        identificacionRemitente: '',
        nombreRemitente: '',
        enviadoADependencia: '',
        firmadoDigitalmente: '',
        postalEstado: '',
        busquedaAvanzadaRadicacion: '',
        usuarioQueProyecto: '',
        busquedaPorContenido: '',
      };
      const resultOfMethodisEmptyBusquedaPorContenido =
        component.isEmptyBusquedaPorContenido(mockFormulario);

      expect(resultOfMethodisEmptyBusquedaPorContenido).toBeTrue();
    });

    it('Debio retornar false porque el campo busquedaPorContenido del formulario no esta vacio', () => {
      const mockFormulario: Formulario = {
        numeroRadicado: '',
        expediente: '',
        representanteLegal: '',
        entrada: '',
        salida: '',
        fechaRadicacion: '',
        fechaHasta: '',
        horaRadicacion: '',
        numeroRadicadoAnterior: '',
        codigoProceso: '',
        codigoTramite: '',
        identificacionDependenciaAsignada: '',
        funcionarioAsignado: '',
        funcionarioOrigen: '',
        identificacionDestinatario: '',
        direccion: '',
        telefono: '',
        tipoCuaderno: '',
        medioEnvio: '',
        consecutivo: '',
        tipoSeguridad: '',
        referenciaExternaNumero: '',
        termino: '',
        usuarioRadicador: '',
        multa: '',
        responsableFirma: '',
        fechaVence: '',
        modulo: '',
        aplicacion: '',
        fechaEstadosFinancieros: '',
        estado: '',
        usuario: '',
        anexosFisicos: '',
        borrador: '',
        lote: '',
        linea: '',
        digitalizacion: '',
        digitalizador: '',
        correoElectronico: '',
        folios: '',
        ciudad: '',
        codigoDependenciaOrigen: '',
        page: 0,
        cantidadRegistros: 0,
        identificacionSociedad: '',
        nombreSociedad: '',
        paquete: '',
        nombreDestinatario: '',
        identificacionRemitente: '',
        nombreRemitente: '',
        enviadoADependencia: '',
        firmadoDigitalmente: '',
        postalEstado: '',
        busquedaAvanzadaRadicacion: '',
        usuarioQueProyecto: '',
        busquedaPorContenido: 'safdsdgfhgkjhgfd',
      };
      const resultOfMethodisEmptyBusquedaPorContenido =
        component.isEmptyBusquedaPorContenido(mockFormulario);

      expect(resultOfMethodisEmptyBusquedaPorContenido).toBeFalse();
    });
  });

  describe('Test unitarios para el metodo isFillOnlyBusquedaPorContenido', () => {
    it('Debio retornar true porque el usuario solo lleno el input BusquedaPorContenido', () => {
      const mockValue = faker.random.alpha();

      component.formularioBusquedad.patchValue(
        { busquedaPorContenido: mockValue },
        { emitEvent: false }
      );

      expect(
        component.formularioBusquedad.get('busquedaPorContenido')?.value
      ).toEqual(mockValue);

      const result = component.isFillOnlyBusquedaPorContenido(
        component.formularioBusquedad.value
      );

      expect(result).toBeTrue();
    });

    it('Debio retornar false porque el usuario no lleno el input BusquedaPorContenido, pero si otro campo del formulario', () => {
      const mockValue = faker.random.alpha();

      component.formularioBusquedad.patchValue(
        { tipoCuaderno: mockValue },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.get('tipoCuaderno')?.value).toEqual(
        mockValue
      );

      const result = component.isFillOnlyBusquedaPorContenido(
        component.formularioBusquedad.value
      );

      expect(result).toBeFalse();
    });
  });

  describe('Test unitarios para el metodo onSelectSociedadORemitente', () => {
    it('Se debio actualizar el valor del input, cuando el usuario selecciona una opcion del componente SelectSearchWithRequestComponent', () => {
      const valor: string = faker.random.alpha();
      const propiedad: string = 'identificacionRemitente';

      expect(component.formularioBusquedad.value[propiedad]).toBeFalsy();

      component.onSelectSociedadORemitente({ propiedad, valor });

      expect(component.formularioBusquedad.value[propiedad]).toEqual(valor);
    });
  });

  describe('Test unitarios para el metodo limpiarDatosBusquedaAvanzadaRadicacion', () => {
    it('Se debio limpiar la cadena de simbolos extraños y solo debe conservar numeros, guiones, comas y puntos y comas', () => {
      const valor: string = '@dassfgs312564,;';
      const valorEsperado = '312564,;';

      expect(component.limpiarDatosBusquedaAvanzadaRadicacion(valor)).toEqual(
        valorEsperado
      );
    });
  });

  describe('Test unitarios para el metodo onEventKeydownInputDate', () => {
    it('debería prevenir el comportamiento predeterminado del evento', () => {
      const event = document.createEvent('Event');
      event.initEvent('keydown', true, true);

      // Llamar a onEventKeydownInputDate con el evento simulado
      component.onEventKeydownInputDate(event);

      // Verificar que event.preventDefault() haya sido llamado
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('Test unitarios para el metodo onClickSpecificQuantityRegisters', () => {
    it('Debería actualizar solo el valor de la cantidad de registros a mostrar en la pagina cuando la cantidad es distinta a la cantidad actual y esta en la primera pagina', () => {
      const nuevaCantidad = 100;

      component.onClickSpecificQuantityRegisters(nuevaCantidad);

      expect(component.formularioBusquedad.value.page).toEqual(0);
      expect(component.formularioBusquedad.value.cantidadRegistros).toEqual(
        nuevaCantidad
      );
    });

    it('Debería actualizar el valor de la cantidad de registros a mostrar en la pagina y debe volver a la primera pagina porque el usuario no esta en la primera pagina', () => {
      const nuevaCantidad = 100;

      component.formularioBusquedad.patchValue(
        {
          page: 2,
        },
        { emitEvent: false }
      );

      component.onClickSpecificQuantityRegisters(nuevaCantidad);

      expect(component.formularioBusquedad.value.page).toEqual(0);
      expect(component.formularioBusquedad.value.cantidadRegistros).toEqual(
        nuevaCantidad
      );
    });
  });

  describe('Test unitarios para el metodo validateForm', () => {
    it('Debio retornar true porque el usuario lleno algun campo del formulario', () => {
      const value = faker.random.alpha();

      component.formularioBusquedad.patchValue(
        {
          busquedaPorContenido: value,
        },
        { emitEvent: false }
      );

      expect(
        component.formularioBusquedad.get('busquedaPorContenido')?.value
      ).toEqual(value);

      const result = component.validateForm();

      expect(result).toBeTrue();
    });

    it('Debio retornar true porque el usuario selecciono una Ciudad', () => {
      const value = faker.address.city();

      component.formularioBusquedad.patchValue(
        {
          ciudad: value,
        },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.get('ciudad')?.value).toEqual(value);

      const result = component.validateForm();

      expect(result).toBeTrue();
    });
  });

  // describe('Test unitarios para el metodo openDialogDescargaMasiva', () => {
  //   it('debería abrir el cuadro de diálogo con los datos proporcionados', () => {
  //     const title = 'Título del cuadro de diálogo';
  //     const url = faker.internet.url();

  //     component.openDialogDescargaMasiva(title, url);

  //     // Verificar que el método open() del MatDialog haya sido llamado con los datos correctos
  //     expect(matDialogSpy.open).toHaveBeenCalledOnceWith(ModalComponent, {
  //       width: '95%',
  //       data: { url, title },
  //     });
  //   });
  // });

  describe('Test unitarios para el metodo prepararFormulario', () => {
    it('La propiedad entrada debe ser igual a "1" porque el input entrada es igual a true', () => {
      component.formularioBusquedad.patchValue(
        {
          entrada: true,
        },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.entrada).toBeTrue();
      expect(component.prepararFormulario().entrada).toEqual('1');
    });

    it('La propiedad entrada debe estar vacia porque el input entrada es igual a false', () => {
      component.formularioBusquedad.patchValue(
        {
          entrada: false,
        },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.entrada).toBeFalse();
      expect(component.prepararFormulario().entrada).toBeFalsy();
    });

    it('La propiedad salida debe ser igual a "1" porque el input salida es igual a true', () => {
      component.formularioBusquedad.patchValue(
        {
          salida: true,
        },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.salida).toBeTrue();
      expect(component.prepararFormulario().salida).toEqual('0');
    });

    it('La propiedad salida debe estar vacia porque el input salida es igual a false', () => {
      component.formularioBusquedad.patchValue(
        {
          salida: false,
        },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.salida).toBeFalse();
      expect(component.prepararFormulario().salida).toBeFalsy();
    });

    it('Debio actualizarse el valor de codigoTramite con solo el identificador', () => {
      const mockId = faker.random.numeric();
      const mockDescription = faker.random.alpha();
      const mockValue = `${mockId} - ${mockDescription}`;

      component.formularioBusquedad.patchValue(
        { codigoONombreTramite: mockValue },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.codigoONombreTramite).toEqual(
        mockValue
      );
      expect(component.prepararFormulario().codigoTramite).toEqual(mockId);
    });

    it('Debio actualizarse el valor de codigoProceso con solo el identificador', () => {
      const mockId = faker.random.numeric();
      const mockDescription = faker.random.alpha();
      const mockValue = `${mockId} - ${mockDescription}`;

      component.formularioBusquedad.patchValue(
        { codigoONombreProceso: mockValue },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.codigoONombreProceso).toEqual(
        mockValue
      );
      expect(component.prepararFormulario().codigoProceso).toEqual(mockId);
    });

    it('Debio actualizarse el valor de dependenciaAsignada con solo el identificador', () => {
      const mockId = faker.random.numeric();
      const mockDescription = faker.random.alpha();
      const mockValue = `${mockId} - ${mockDescription}`;

      component.formularioBusquedad.patchValue(
        { dependenciaAsignada: mockValue },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.dependenciaAsignada).toEqual(
        mockValue
      );
      expect(
        component.prepararFormulario().identificacionDependenciaAsignada
      ).toEqual(mockId);
    });

    it('Debio actualizarse el valor de codigoDependenciaOrigen  con solo el identificador', () => {
      const mockId = faker.random.numeric();
      const mockDescription = faker.random.alpha();
      const mockValue = `${mockId} - ${mockDescription}`;

      component.formularioBusquedad.patchValue(
        { codigoOdependenciaOrigen: mockValue },
        { emitEvent: false }
      );

      expect(
        component.formularioBusquedad.value.codigoOdependenciaOrigen
      ).toEqual(mockValue);
      expect(component.prepararFormulario().codigoDependenciaOrigen).toEqual(
        mockId
      );
    });

    it('Debio actualizarse el valor de funcionarioAsignado  con solo el identificador', () => {
      const mockId = faker.random.numeric();
      const mockDescription = faker.random.alpha();
      const mockValue = `${mockId} - ${mockDescription}`;

      component.formularioBusquedad.patchValue(
        { funcionarioAsignado: mockValue },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.funcionarioAsignado).toEqual(
        mockValue
      );
      expect(component.prepararFormulario().funcionarioAsignado).toEqual(
        mockId
      );
    });

    it('Debio actualizarse el valor de funcionarioOrigen  con solo el identificador', () => {
      const mockId = faker.random.numeric();
      const mockDescription = faker.random.alpha();
      const mockValue = `${mockId} - ${mockDescription}`;

      component.formularioBusquedad.patchValue(
        { funcionarioOrigen: mockValue },
        { emitEvent: false }
      );

      expect(component.formularioBusquedad.value.funcionarioOrigen).toEqual(
        mockValue
      );
      expect(component.prepararFormulario().funcionarioOrigen).toEqual(mockId);
    });

    it('Debio actualizarse el valor de identificacionRemitente  con solo el identificador', () => {
      const mockId = faker.random.numeric();
      const mockDescription = faker.random.alpha();
      const mockValue = `${mockId} - ${mockDescription}`;

      component.formularioBusquedad.patchValue(
        { identificacionRemitente: mockValue },
        { emitEvent: false }
      );

      expect(
        component.formularioBusquedad.value.identificacionRemitente
      ).toEqual(mockValue);
      expect(component.prepararFormulario().identificacionRemitente).toEqual(
        mockId
      );
    });

    it('Debio actualizarse el valor de identificacionSociedad  con solo el identificador', () => {
      const mockId = faker.random.numeric();
      const mockDescription = faker.random.alpha();
      const mockValue = `${mockId} - ${mockDescription}`;

      component.formularioBusquedad.patchValue(
        { identificacionSociedad: mockValue },
        { emitEvent: false }
      );

      expect(
        component.formularioBusquedad.value.identificacionSociedad
      ).toEqual(mockValue);
      expect(component.prepararFormulario().identificacionSociedad).toEqual(
        mockId
      );
    });

    it('Debio limpiarse el valor de busquedaAvanzadaRadicacion', () => {
      const mockValue = 'hola adsfds@ .][]';

      component.formularioBusquedad.patchValue(
        { busquedaAvanzadaRadicacion: mockValue },
        { emitEvent: false }
      );

      expect(
        component.formularioBusquedad.value.busquedaAvanzadaRadicacion
      ).toEqual(mockValue);
      expect(component.prepararFormulario().busquedaAvanzadaRadicacion).toEqual(
        ''
      );
    });
  });
});
