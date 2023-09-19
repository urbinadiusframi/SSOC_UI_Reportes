import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHideColumnComponent } from './select-hide-column.component';
import { By } from '@angular/platform-browser';

describe('Suit de test unitarios para el componente SelectHideColumnComponent', () => {
  let component: SelectHideColumnComponent;
  let fixture: ComponentFixture<SelectHideColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectHideColumnComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHideColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debio ser creado el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería actualizar las opciones y emitir el evento correctamente', () => {
    const checkbox = fixture.debugElement
      .queryAll(By.css('input'))
      .find((a) => (a.nativeNode as HTMLFormElement).name === 'anexosFisicos')
      ?.nativeNode as HTMLFormElement;
    const mockEvent = new Event('change', { bubbles: true });

    expect(checkbox.name).toEqual('anexosFisicos');
    expect(checkbox).toBeTruthy();

    checkbox['checked'] = true; // Establece la propiedad 'checked' en 'true' para marcar la casilla, o en 'false' para desmarcarla
    checkbox.dispatchEvent(mockEvent);
    fixture.detectChanges();

    expect(checkbox['checked']).toBeTrue();
    expect(component.options.anexosFisicos).toBeTrue();
  });
});
