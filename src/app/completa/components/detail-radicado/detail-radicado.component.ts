import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Encabezado } from 'src/app/models/Encabezado';

@Component({
  selector: 'app-detail-radicado',
  templateUrl: './detail-radicado.component.html',
  styleUrls: ['./detail-radicado.component.scss'],
})
export class DetailRadicadoComponent {
  document: Encabezado;

  constructor(
    @Inject(MAT_DIALOG_DATA) document: Encabezado,
    public dialogRef: MatDialogRef<DetailRadicadoComponent>
  ) {
    this.document = document;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
