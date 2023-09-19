import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  private swalMixinError = Swal.mixin({
    customClass: {
      container: 'container-modal container-modal-error',
      title: 'container-modal__title',
      image: 'mt-0',
    },
    imageUrl: environment.production
      ? '/ConsultaMigrados/assets/modal_error.webp'
      : 'https://res.cloudinary.com/dwnvlpcas/image/upload/v1690488901/error_uxgl89.webp',
    imageWidth: '100%',
    imageHeight: '90px',
    confirmButtonText: 'Aceptar',
  });

  private swalMixinSuccess = Swal.mixin({
    customClass: {
      container: 'container-modal container-modal-success',
      title: 'container-modal__title',
      image: 'mt-0',
    },
    imageUrl: environment.production
      ? '/ConsultaMigrados/assets/modal_success.webp'
      : 'https://res.cloudinary.com/dwnvlpcas/image/upload/v1690488901/success_yqfb8t.webp',
    imageWidth: '100%',
    imageHeight: '90px',
  });

  private swalMixinInfo = Swal.mixin({
    customClass: {
      container: 'container-modal container-modal-info',
      title: 'container-modal__title',
      image: 'mt-0',
    },
    imageUrl: environment.production
      ? '/ConsultaMigrados/assets/modal_info.webp'
      : 'https://res.cloudinary.com/dwnvlpcas/image/upload/v1690488901/alert_sjwuku.webp',
    imageWidth: '100%',
    imageHeight: '90px',
  });

  getSwalMixinInfo(): any {
    return this.swalMixinInfo;
  }

  showModalError(text: string, title?: string): void {
    this.swalMixinError.fire({ text, title });
  }

  showModalInfo(text: string, title?: string): void {
    this.swalMixinInfo.fire({
      text,
      title,

      confirmButtonText: 'Cerrar',
    });
  }

  showModalSuccess(text: string, title?: string): void {
    this.swalMixinSuccess.fire({
      text,
      title,
      confirmButtonText: 'Confirmar',
    });
  }
}
