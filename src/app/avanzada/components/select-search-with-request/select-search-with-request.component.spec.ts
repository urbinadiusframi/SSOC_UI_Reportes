import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSearchWithRequestComponent } from './select-search-with-request.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { SelectService } from 'src/app/services/select.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

describe('Suit de test unitarios para el componente SelectSearchWithRequestComponent', () => {
  let component: SelectSearchWithRequestComponent;
  let fixture: ComponentFixture<SelectSearchWithRequestComponent>;

  beforeAll(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
      { teardown: { destroyAfterEach: false } }
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SelectSearchWithRequestComponent],
      providers: [SelectService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectSearchWithRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debio ser creado el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Test unitarios al metodo onSelectOption', () => {
    it('Se debio actualizar el valor del input con el valor de la opcion seleccionada en la opcion', () => {
      const mockValue = faker.random.alpha();

      component.onSelectOption(mockValue);

      expect(component.buttonText).toEqual(mockValue);
      expect(component.control.value).toEqual(mockValue);
      expect(component.sinResultados).toBeFalse();
    });
  });

  describe('Test unitarios al metodo onClickButtonDelete', () => {
    it('Se debio limpiar el valor del input y el la variable buttonText debe ser igual a "Seleccione un remitente"', () => {
      component.isSelectForListarRemitente = true;
      component.onClickButtonDelete();

      expect(component.buttonText).toEqual('Seleccione un remitente');
      expect(component.control.value).toBeFalsy();
      expect(component.sinResultados).toBeFalse();
    });

    it('Se debio limpiar el valor del input y el la variable buttonText debe ser igual a "Seleccione una sociedad"', () => {
      component.isSelectForListarRemitente = false;
      component.onClickButtonDelete();

      expect(component.buttonText).toEqual('Seleccione una sociedad');
      expect(component.control.value).toBeFalsy();
      expect(component.sinResultados).toBeFalse();
    });
  });

  describe('Test unitarios al metodo ngOnChanges', () => {
    it('debería actualizar buttonText y control cuando limpiarFormulario cambie', () => {
      // Simulamos el cambio de limpiarFormulario a true
      const changes: SimpleChanges = {
        limpiarFormulario: {
          currentValue: true,
          firstChange: false,
          previousValue: false,
          isFirstChange: () => false,
        },
      };

      // Asegurarnos de que isSelectForListarRemitente sea true para probar ese caso
      component.isSelectForListarRemitente = true;

      // Llamar a ngOnChanges con los cambios simulados
      component.ngOnChanges(changes);

      // Verificar que buttonText y control se hayan actualizado correctamente
      expect(component.buttonText).toBe('Seleccione un remitente');
      expect(component.control.value).toBe('');
    });

    it('debería actualizar buttonText y control cuando limpiarFormulario cambie (caso isSelectForListarRemitente=false)', () => {
      // Simulamos el cambio de limpiarFormulario a true
      const changes: SimpleChanges = {
        limpiarFormulario: {
          currentValue: true,
          firstChange: false,
          previousValue: false,
          isFirstChange: () => false,
        },
      };

      // Asegurarnos de que isSelectForListarRemitente sea false para probar ese caso
      component.isSelectForListarRemitente = false;

      // Llamar a ngOnChanges con los cambios simulados
      component.ngOnChanges(changes);

      // Verificar que buttonText y control se hayan actualizado correctamente
      expect(component.buttonText).toBe('Seleccione una sociedad');
      expect(component.control.value).toBe('');
    });
  });
});
