import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() title: string = '';
  private domsanitize: DomSanitizer = inject(DomSanitizer);
  url: SafeResourceUrl = environment.production
    ? this.domsanitize.bypassSecurityTrustResourceUrl(
        '/ConsultaMigrados/assets/logo_super.webp'
      )
    : this.domsanitize.bypassSecurityTrustResourceUrl(
        'https://res.cloudinary.com/dwnvlpcas/image/upload/v1681142031/logo_super_yif6nz.webp'
      );
}
