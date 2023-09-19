import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSearchComponent } from './dropdown-search.component';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { faker } from '@faker-js/faker';

describe('Suit de test unitarios para el componente DropdownSearchComponent', () => {
  let component: DropdownSearchComponent;
  let fixture: ComponentFixture<DropdownSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownSearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debio ser creado el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Test unitarios para el metodo onClickDropDown', () => {
    it('Se debio marcar el input como si lo hubieran tocado', () => {
      component.onClickDropDown();

      expect(component.formControlConsultaMigrados.touched).toBeTrue();
    });
  });

  describe('Test unitarios para el metodo onSelectOption', () => {
    it('Se debio haber actualizado el valor del input cuando el usuario selecciona una opcion', () => {
      const mockValue = faker.random.alpha();
      component.onSelectOption(mockValue);

      expect(component.formControlConsultaMigrados.value).toEqual(mockValue);
      expect(component.control.value).toEqual(mockValue);
      expect(component.buttonText).toEqual(mockValue);
    });
  });

  describe('Test unitarios para el metodo onClickButtonDelete', () => {
    it('Se debio haber limpiado el valor del input cuando el usuario da clic en el icono de limpiar', () => {
      component.onClickButtonDelete();

      expect(component.formControlConsultaMigrados.value).toBeFalsy();
      expect(component.control.value).toBeFalsy();
      expect(component.buttonText).toEqual('Seleccione una opcion');
    });
  });

  describe('Test unitarios para el metodo ngOnChanges', () => {
    it('debería actualizar filteredValues con el nuevo valor de datos', () => {
      const newDatosValue = ['Nuevo valor de datos'];
      const changes: SimpleChanges = {
        datos: {
          currentValue: newDatosValue,
          firstChange: true,
          previousValue: undefined,
          isFirstChange: () => true,
        },
      };

      component.datos = newDatosValue;

      component.ngOnChanges(changes);

      expect(component.datos.length).toEqual(newDatosValue.length);
    });

    it('debería limpiar el formulario cuando limpiarFormulario es true', () => {
      const changes: SimpleChanges = {
        limpiarFormulario: {
          currentValue: true,
          firstChange: true,
          previousValue: undefined,
          isFirstChange: () => true,
        },
      };

      component.limpiarFormulario = true;

      component.ngOnChanges(changes);

      expect(component.buttonText).toEqual('Seleccione una opcion');
      expect(component.formControlConsultaMigrados.value).toEqual('');
      expect(component.control.value).toEqual('');
    });
  });

  describe('Test unitarios para el metodo filter', () => {
    it('debería filtrar los datos correctamente y actualizar filteredValues y sinResultados', () => {
      // Datos de prueba y valor de prueba
      const datos: string[] = ['manzana', 'naranja', 'plátano', 'uva'];
      component.datos = datos;
      const value = 'na';

      // Llamar al método filter() con el valor de prueba
      component.filter(value);

      // Verificar si sinResultados se establece correctamente
      expect(component.sinResultados).toBe(false);

      // Llamar a filter() con un valor que no devuelve resultados
      component.filter('xyz');

      // Verificar si sinResultados se establece correctamente
      expect(component.sinResultados).toBe(true);
    });
  });
});
