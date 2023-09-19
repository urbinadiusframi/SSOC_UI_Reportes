import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ModalComponent } from './modal.component';
import { generateOneEncabezado } from 'src/app/models/mocks/encabezado.mocks';

describe('Suit de test unitarios para el componente ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ModalComponent>>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: generateOneEncabezado() },
      ],
      declarations: [ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<ModalComponent>
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
