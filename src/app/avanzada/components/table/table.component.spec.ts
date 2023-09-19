import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableComponent } from './table.component';
import { ModalComponent } from '../modal/modal.component';
import { faker } from '@faker-js/faker';
import {
  generateNEncabezados,
  generateOneEncabezado,
} from 'src/app/models/mocks/encabezado.mocks';
import { DetailRadicadoComponent } from '../detail-radicado/detail-radicado.component';
import { defaultValueOptionsSelectColumns } from 'src/app/models/optionsSelectColumns';

describe('Suit de test unitarios para el componente TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const matDialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [{ provide: MatDialog, useValue: matDialogSpyObj }],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('Debio ser creado el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Test unitarios para el metodo openDialogViewDocument', () => {
    it('Debería abrir el modal para visualizar el documento', () => {
      const mockTitle = faker.random.alpha();
      const mockUrl = faker.internet.url();

      // Llamar al método openDialog() con el valor de prueba
      component.openDialogViewDocument(mockTitle, mockUrl);

      // Verificar si el método open del servicio MatDialog fue llamado con los argumentos correctos
      expect(matDialogSpy.open).toHaveBeenCalledWith(ModalComponent, {
        width: '95%',
        data: { title: mockTitle, url: mockUrl },
      });
    });
  });

  describe('Test unitarios para el metodo generateURLToPrevisualiceDocument', () => {
    it('Debio retornar true porque la ', () => {
      const mockIdFilenet = faker.random.alpha();

      const mockUrl = `https://cpd-cp4bapre.apps.ssrhv-ops01.supersociedades.local/icn/navigator/bookmark.jsp?desktop=general&repositoryId=OSrepo&repositoryType=p8&docid=${encodeURIComponent(
        mockIdFilenet
      )}`;

      expect(
        component.generateURLToPrevisualiceDocument(mockIdFilenet)
      ).toEqual(mockUrl);
    });
  });

  describe('Test unitarios para el metodo openDialogDetailDocument', () => {
    it('Debería abrir el modal para visualizar el detalle del documento', () => {
      const mockEncabezado = generateOneEncabezado();

      // Llamar al método openDialog() con el valor de prueba
      component.openDialogDetailDocument(mockEncabezado);

      // Verificar si el método open del servicio MatDialog fue llamado con los argumentos correctos
      expect(matDialogSpy.open).toHaveBeenCalledWith(DetailRadicadoComponent, {
        width: '95%',
        data: mockEncabezado,
      });
    });
  });

  describe('Test unitarios para el metodo openDialogDetailDocument', () => {
    it('Debería abrir el modal para visualizar el detalle del documento', () => {
      const mockEncabezado = generateOneEncabezado();

      // Llamar al método openDialog() con el valor de prueba
      component.openDialogDetailDocument(mockEncabezado);

      // Verificar si el método open del servicio MatDialog fue llamado con los argumentos correctos
      expect(matDialogSpy.open).toHaveBeenCalledWith(DetailRadicadoComponent, {
        width: '95%',
        data: mockEncabezado,
      });
    });
  });

  describe('Test unitarios para el metodo onChangeSelect', () => {
    it('Se debio actualizar el valor de la variable hiddenColumnsTable del componente', () => {
      const mockOptions = defaultValueOptionsSelectColumns;

      component.onChangeSelect(mockOptions);

      expect(component.hiddenColumnsTable).toEqual(mockOptions);
    });
  });

  describe('Test unitarios para el metodo ngOnChanges', () => {
    it('debería reorganizar el arreglo columns correctamente', () => {
      const mockEncabezados = generateNEncabezados(10);

      component.tableContent = mockEncabezados;

      expect(component.tableContent).toEqual(mockEncabezados);
      expect(component.pagina).toEqual(0);
      expect(component.cantidadRegistros).toEqual(0);

      component.cantidadRegistros = 50;
      expect(component.cantidadRegistros).toEqual(50);

      component.ngOnChanges({});

      expect(component.dataSource).toBeTruthy();
    });
  });
});
