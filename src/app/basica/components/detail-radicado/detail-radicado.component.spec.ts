import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRadicadoComponent } from './detail-radicado.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { generateOneEncabezado } from 'src/app/models/mocks/encabezado.mocks';

describe('Suit de test unitarios para el componente DetailRadicadoComponent', () => {
  let component: DetailRadicadoComponent;
  let fixture: ComponentFixture<DetailRadicadoComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DetailRadicadoComponent>>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: generateOneEncabezado() },
      ],
      declarations: [DetailRadicadoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRadicadoComponent);
    component = fixture.componentInstance;

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<DetailRadicadoComponent>
    >;
    fixture.detectChanges();
  });

  it('Debio ser creado el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Test unitarios para el metodo onClose', () => {
    it('debería cerrar el cuadro de diálogo', () => {
      // Llamar al método onClose()
      component.onClose();

      // Verificar que el método close() del MatDialogRef haya sido llamado
      expect(dialogRefSpy.close).toHaveBeenCalled();
    });
  });
});
