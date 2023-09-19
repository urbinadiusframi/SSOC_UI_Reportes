import { TestBed } from '@angular/core/testing';
import { ValidatorsFormService } from './validators-form.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { faker } from '@faker-js/faker';

describe('Suit de test del servicio ValidatorFormService', () => {
  let service: ValidatorsFormService;
  let form: FormGroup;

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
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    });
    service = TestBed.inject(ValidatorsFormService);
    const formBuilder = TestBed.inject(FormBuilder);

    form = formBuilder.group({
      fechaRadicacion: [''],
      fechaHasta: [''],
      termino: [''],
      lote: [''],
      ciudad: [''],
      departamento: [''],
      correo: [''],
      anexosFisicos: [''],
      numeroRadicado: [''],
      busquedaAvanzada: [''],
    });
  });

  it('Debio ser creado el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('Test unitarios para el metodo validatorInitialDate', () => {
    it('Debio retornar null porque los campos fechaRadicacion y fechaHasta estan vacios', () => {
      const validatorFunction = service.validatorInitialDate();

      expect(validatorFunction(form)).toBeNull();
    });

    it('Debio retornar null porque las fechas son validas', () => {
      const validatorFunction = service.validatorInitialDate();
      const fechaHasta = '2000-01-05';
      const fechaRadicacion = '2000-01-01';

      form.patchValue({ fechaRadicacion, fechaHasta }, { emitEvent: false });

      expect(form.value.fechaHasta).toEqual(fechaHasta);
      expect(form.value.fechaRadicacion).toEqual(fechaRadicacion);
      expect(validatorFunction(form)).toBeNull();
    });

    it('Debio retornar true porque la fecha inicial es mayor que la fecha final', () => {
      const validatorFunction = service.validatorInitialDate();
      const fechaHasta = '2000-01-05';
      const fechaRadicacion = '2020-01-01';

      form.patchValue({ fechaRadicacion, fechaHasta }, { emitEvent: false });

      expect(form.value.fechaHasta).toEqual(fechaHasta);
      expect(form.value.fechaRadicacion).toEqual(fechaRadicacion);
      expect(validatorFunction(form)?.['DatesInvalid']).toBeTrue();
    });
  });

  describe('Test unitarios para el metodo validatorFieldTermino', () => {
    it('Debio retornar null porque el input termino esta vacio', () => {
      const validatorFunction = service.validatorFieldTermino();

      expect(validatorFunction(form.controls['termino'])).toBeNull();
    });

    it('Debio retornar null porque el input termino es igual a null', () => {
      const validatorFunction = service.validatorFieldTermino();

      form.patchValue(
        {
          termino: null,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['termino'])).toBeNull();
      expect(form.value.termino).toBeNull();
    });

    it('Debio retornar null porque el input termino es valido', () => {
      const validatorFunction = service.validatorFieldTermino();
      const mockValue = faker.random.numeric();

      form.patchValue(
        {
          termino: mockValue,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['termino'])).toBeNull();
      expect(form.value.termino).toEqual(mockValue);
    });

    it('Debio retornar true porque el input termino es invalido', () => {
      const validatorFunction = service.validatorFieldTermino();
      const mockValue = faker.random.alpha();

      form.patchValue(
        {
          termino: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['termino'])?.['lengthTermino']
      ).toBeTrue();
      expect(form.value.termino).toEqual(mockValue);
    });
  });

  describe('Test unitarios para el metodo validatorFieldLote', () => {
    it('Debio retornar null porque el input lote esta vacio', () => {
      const validatorFunction = service.validatorFieldLote();

      expect(validatorFunction(form.controls['lote'])).toBeNull();
    });

    it('Debio retornar null porque el input lote es igual a null', () => {
      const validatorFunction = service.validatorFieldTermino();

      form.patchValue(
        {
          lote: null,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['lote'])).toBeNull();
      expect(form.value.lote).toBeNull();
    });

    it('Debio retornar null porque el input lote es valido', () => {
      const validatorFunction = service.validatorFieldLote();
      const mockValue = 80;

      form.patchValue(
        {
          lote: mockValue,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['lote'])).toBeNull();
      expect(form.value.lote).toEqual(mockValue);
    });

    it('Debio retornar true porque el input lote es invalido', () => {
      const validatorFunction = service.validatorFieldLote();
      const mockValue = 800000;

      form.patchValue(
        {
          lote: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['lote'])?.['lengthLote']
      ).toBeTrue();
      expect(form.value.lote).toEqual(mockValue);
    });
  });

  describe('Test unitarios para el metodo validatorFieldCiudadAndDepartamento', () => {
    it('Debio retornar null porque los input ciudad y departamento estan vacios', () => {
      const validatorFunction = service.validatorFieldCiudadAndDepartamento();

      expect(validatorFunction(form)).toBeNull();
    });

    it('Debio retornar true porque el input ciudad esta vacio y departamento esta lleno', () => {
      const validatorFunction = service.validatorFieldCiudadAndDepartamento();
      const mockValue = faker.address.city();

      form.patchValue(
        {
          departamento: mockValue,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form)?.['ciudadInvalid']).toBeTrue();
      expect(form.value.departamento).toEqual(mockValue);
    });
  });

  describe('Test unitarios para el metodo validatorEmail', () => {
    it('Debio retornar null porque el input correo esta vacio', () => {
      const validatorFunction = service.validatorEmail();

      expect(validatorFunction(form.controls['correo'])).toBeNull();
    });

    it('Debio retornar true porque el valor del input correo no paso la primer validacion del correo', () => {
      const validatorFunction = service.validatorEmail();
      const mockValue = 'daniel@a.c';
      form.patchValue(
        {
          correo: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['correo'])?.['emailInvalid']
      ).toBeTrue();
      expect(form.value.correo).toEqual(mockValue);
    });

    it('Debio retornar true porque el valor del input correo no paso la segunda validacion del correo', () => {
      const validatorFunction = service.validatorEmail();
      const mockValue = 'daniel@a.c';
      form.patchValue(
        {
          correo: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['correo'])?.['emailInvalid']
      ).toBeTrue();
      expect(form.value.correo).toEqual(mockValue);
    });

    it('Debio retornar null porque el valor del input correo paso las validaciones del correo', () => {
      const validatorFunction = service.validatorEmail();
      const mockValue = 'daniel@gmail.com';

      form.patchValue(
        {
          correo: mockValue,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['correo'])).toBeNull();
      expect(form.value.correo).toEqual(mockValue);
    });
  });

  describe('Test unitarios para el metodo validatorNegativeValues', () => {
    it('Debio retornar null porque el input lote esta vacio', () => {
      const validatorFunction = service.validatorNegativeValues();

      expect(validatorFunction(form.controls['lote'])).toBeNull();
    });

    it('Debio retornar true porque el valor del input lote es invalido', () => {
      const validatorFunction = service.validatorNegativeValues();
      const mockValue = -1;
      form.patchValue(
        {
          lote: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['lote'])?.['negativeNumber']
      ).toBeTrue();
      expect(form.value.lote).toEqual(mockValue);
    });

    it('Debio retornar null porque el valor del input lote es valido', () => {
      const validatorFunction = service.validatorNegativeValues();
      const mockValue = 10;
      form.patchValue(
        {
          lote: mockValue,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['lote'])).toBeNull();
      expect(form.value.lote).toEqual(mockValue);
    });
  });

  describe('Test unitarios para el metodo validatorAnexosFisicos', () => {
    it('Debio retornar null porque el input anexosFisicos esta vacio', () => {
      const validatorFunction = service.validatorAnexosFisicos();

      expect(validatorFunction(form.controls['anexosFisicos'])).toBeNull();
    });

    it('Debio retornar null porque el input anexosFisicos cumplio las dos validaciones', () => {
      const validatorFunction = service.validatorAnexosFisicos();
      const mockValue = 'daniel-alfaro.';

      form.patchValue(
        {
          anexosFisicos: mockValue,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['anexosFisicos'])).toBeNull();
      expect(form.value.anexosFisicos).toEqual(mockValue);
    });

    it('Debio retornar true porque el input anexosFisicos cumplio no cumplio la primer validacion', () => {
      const validatorFunction = service.validatorAnexosFisicos();
      const mockValue = 'daniel-alfaro.@';

      form.patchValue(
        {
          anexosFisicos: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['anexosFisicos'])?.[
          'invalidAnexosFisicos'
        ]
      ).toBeTrue();
      expect(form.value.anexosFisicos).toEqual(mockValue);
    });
  });

  describe('Test unitarios para el metodo validatorIsNumeroRadicadoValid', () => {
    it('Debio retornar null porque el input numeroRadicado esta vacio', () => {
      const validatorFunction = service.validatorIsNumeroRadicadoValid();

      expect(validatorFunction(form.controls['numeroRadicado'])).toBeNull();
    });

    it('Debio retornar true porque el input numeroRadicado es invalido ya que el numero de radicado tiene tres guiones', () => {
      const validatorFunction = service.validatorIsNumeroRadicadoValid();
      const mockValue = '2000-01-000000-1';

      form.patchValue(
        {
          numeroRadicado: mockValue,
        },
        { emitEvent: false }
      );

      expect(form.controls['numeroRadicado'].value).toEqual(mockValue);
      expect(
        validatorFunction(form.controls['numeroRadicado'])?.[
          'numeroRadicadoIsNotValid'
        ]
      ).toBeTrue();
    });

    it('Debio retornar true porque el input numeroRadicado es invalido ya que el numero de radicado es igual a "0000-00-000000"', () => {
      const validatorFunction = service.validatorIsNumeroRadicadoValid();
      const mockValue = '0000-00-000000';

      form.patchValue(
        {
          numeroRadicado: mockValue,
        },
        { emitEvent: false }
      );

      expect(form.controls['numeroRadicado'].value).toEqual(mockValue);
      expect(
        validatorFunction(form.controls['numeroRadicado'])?.[
          'numeroRadicadoIsNotValid'
        ]
      ).toBeTrue();
    });

    it('Debio retornar null porque el input numeroRadicado es valido', () => {
      const validatorFunction = service.validatorIsNumeroRadicadoValid();
      const mockValue = '2000-01-000004';

      form.patchValue(
        {
          numeroRadicado: mockValue,
        },
        { emitEvent: false }
      );

      expect(form.controls['numeroRadicado'].value).toEqual(mockValue);
      expect(validatorFunction(form.controls['numeroRadicado'])).toBeNull();
    });

    it('Debio retornar true porque el input numeroRadicado es invalido ya que el año del numero de radicado es igual a 0000', () => {
      const validatorFunction = service.validatorIsNumeroRadicadoValid();
      const mockValue = '0000-01-000001';

      form.patchValue(
        {
          numeroRadicado: mockValue,
        },
        { emitEvent: false }
      );

      expect(form.controls['numeroRadicado'].value).toEqual(mockValue);
      expect(
        validatorFunction(form.controls['numeroRadicado'])?.[
          'numeroRadicadoIsNotValid'
        ]
      ).toBeTrue();
    });

    it('Debio retornar true porque el input numeroRadicado es invalido ya que el mes del numero de radicado es igual a 00', () => {
      const validatorFunction = service.validatorIsNumeroRadicadoValid();
      const mockValue = '2000-00-000001';

      form.patchValue(
        {
          numeroRadicado: mockValue,
        },
        { emitEvent: false }
      );

      expect(form.controls['numeroRadicado'].value).toEqual(mockValue);
      expect(
        validatorFunction(form.controls['numeroRadicado'])?.[
          'numeroRadicadoIsNotValid'
        ]
      ).toBeTrue();
    });

    it('Debio retornar true porque el input numeroRadicado es invalido ya que la ultima parte del numero de radicado es igual a 000000', () => {
      const validatorFunction = service.validatorIsNumeroRadicadoValid();
      const mockValue = '2000-01-00000';

      form.patchValue(
        {
          numeroRadicado: mockValue,
        },
        { emitEvent: false }
      );

      expect(form.controls['numeroRadicado'].value).toEqual(mockValue);
      expect(
        validatorFunction(form.controls['numeroRadicado'])?.[
          'numeroRadicadoIsNotValid'
        ]
      ).toBeTrue();
    });
  });

  describe('Test unitarios para el metodo validatorRange', () => {
    it('Debio retornar null porque el input busquedaAvanzada esta vacio', () => {
      const validatorFunction = service.validatorRange();

      expect(validatorFunction(form.controls['busquedaAvanzada'])).toBeNull();
    });

    it('Debio retornar null porque el input busquedaAvanzada es igual a null', () => {
      const validatorFunction = service.validatorRange();

      form.patchValue(
        {
          busquedaAvanzada: null,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['busquedaAvanzada'])).toBeNull();
      expect(form.controls['busquedaAvanzada'].value).toBeNull();
    });

    it('Debio retornar true porque el input busquedaAvanzada es invalido ya que se envio un solo parametro en el rango', () => {
      const validatorFunction = service.validatorRange();
      const mockValue = '2000-01-000004;';

      form.patchValue(
        {
          busquedaAvanzada: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['busquedaAvanzada'])?.[
          'busquedaAvanzadaUnSoloParametro'
        ]
      ).toBeTrue();
      expect(form.controls['busquedaAvanzada'].value).toEqual(mockValue);
    });

    it('Debio retornar true porque el input busquedaAvanzada es invalido ya que se envio tres parametros en el rango', () => {
      const validatorFunction = service.validatorRange();
      const mockValue = '2000-01-000004;2000-01-000004;2000-01-000004';

      form.patchValue(
        {
          busquedaAvanzada: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['busquedaAvanzada'])?.[
          'busquedaAvanzadaInvalido'
        ]
      ).toBeTrue();
      expect(form.controls['busquedaAvanzada'].value).toEqual(mockValue);
    });

    it('Debio retornar null porque el input busquedaAvanzada es valido ya que el rango paso las validaciones', () => {
      const validatorFunction = service.validatorRange();
      const mockValue = '2000-01-000004;2000-01-000004';

      form.patchValue(
        {
          busquedaAvanzada: mockValue,
        },
        { emitEvent: false }
      );

      expect(validatorFunction(form.controls['busquedaAvanzada'])).toBeNull();
      expect(form.controls['busquedaAvanzada'].value).toEqual(mockValue);
    });

    it('Debio retornar true porque el input busquedaAvanzada es invalido ya que los numeros de radicado del rango no tienen dos guiones', () => {
      const validatorFunction = service.validatorRange();
      const mockValue = '2000-01000004;2000-01000004';

      form.patchValue(
        {
          busquedaAvanzada: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['busquedaAvanzada'])?.[
          'busquedaAvanzadaRadicadosInvalidos'
        ]
      ).toBeTrue();
      expect(form.controls['busquedaAvanzada'].value).toEqual(mockValue);
    });

    it('Debio retornar true porque el input busquedaAvanzada es invalido ya que los numeros de radicado del rango no tienen una nomenclatura valida', () => {
      const validatorFunction = service.validatorRange();
      const mockValue = '0000-00-000000;0000-00-000000';

      form.patchValue(
        {
          busquedaAvanzada: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['busquedaAvanzada'])?.[
          'busquedaAvanzadaRadicadosInvalidos'
        ]
      ).toBeTrue();
      expect(form.controls['busquedaAvanzada'].value).toEqual(mockValue);
    });

    it('Debio retornar true porque el input busquedaAvanzada es invalido ya que el primer numero de radicado es mayor al segundo numero de radicado', () => {
      const validatorFunction = service.validatorRange();
      const mockValue = '2000-01-000004;2000-01-000001';

      form.patchValue(
        {
          busquedaAvanzada: mockValue,
        },
        { emitEvent: false }
      );

      expect(
        validatorFunction(form.controls['busquedaAvanzada'])?.[
          'rangeBusquedaAvanzadaInvalido'
        ]
      ).toBeTrue();
      expect(form.controls['busquedaAvanzada'].value).toEqual(mockValue);
    });
  });
});
