import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Encabezado } from 'src/app/models/Encabezado';
import {
  OptionsSelectColumns,
  defaultValueOptionsSelectColumns,
} from 'src/app/models/optionsSelectColumns';
import { ModalComponent } from '../modal/modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DetailRadicadoComponent } from '../detail-radicado/detail-radicado.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input({ required: true }) tableContent: Encabezado[] = [];
  @Input({ required: true }) pagina: number = 0;
  @Input({ required: true }) cantidadRegistros: number = 0;
  dataSource: MatTableDataSource<Encabezado> = new MatTableDataSource(
    this.tableContent
  );
  @ViewChild(MatSort) sort: MatSort;
  hiddenColumnsTable: OptionsSelectColumns = defaultValueOptionsSelectColumns;
  columns: string[] = Object.keys(this.hiddenColumnsTable);
  widthTable: number = this.columns.length * 180;
  URL_PREVISUALIZACION_DOCUMENTO =
    environment.urlPrevisualizacionDocumentoPrincipal;

  constructor(
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    let count: number = this.pagina * this.cantidadRegistros;
    count += 1;

    this.dataSource = new MatTableDataSource(
      this.tableContent.map((a) => {
        const encabezado: Encabezado = {
          ...a,
          id: count,
        };

        count++;

        return encabezado;
      })
    );
    this.dataSource.sort = this.sort;
  }

  openDialogViewDocument(title: string, url: string): void {
    this.dialog.open(ModalComponent, {
      width: '95%',
      data: {
        url,
        title,
      },
    });
  }

  generateURLToPrevisualiceDocument(idFilenet: string): string {
    return `${this.URL_PREVISUALIZACION_DOCUMENTO}${encodeURIComponent(
      idFilenet
    )}`;
  }

  onChangeSelect(options: any): void {
    this.hiddenColumnsTable = options;

    this.updateColumns(options);
  }

  updateColumns(options: OptionsSelectColumns): void {
    this.columns = [];

    for (let [key, value] of Object.entries(options)) {
      if (value === false && key !== '') {
        this.columns.push(key);
      }
    }
  }

  openDialogDetailDocument(document: Encabezado) {
    this.dialog.open(DetailRadicadoComponent, {
      width: '95%',
      data: document,
    });
  }

  dropColumn(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
