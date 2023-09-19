import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Modal } from 'src/app/models/Modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  title: string = '';
  url: SafeResourceUrl = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Modal,
    public dialogRef: MatDialogRef<ModalComponent>,
    private domSanitizer: DomSanitizer
  ) {
    this.title = data.title;
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
