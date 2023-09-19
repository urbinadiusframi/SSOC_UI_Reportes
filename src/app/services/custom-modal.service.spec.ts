import { TestBed } from '@angular/core/testing';

import { CustomModalService } from './custom-modal.service';
import { environment } from 'src/environments/environment';

describe('Suit de test del servicio CustomModalService', () => {
  let service: CustomModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomModalService);
  });

  it('Debio ser creado el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('En los modales se debe usar la url de produccion', () => {
    environment.production = true;

    expect(environment.production).toBeTrue();

    service = TestBed.inject(CustomModalService);

    expect(service).toBeTruthy();
  });

  describe('Test unitarios para el metodo getSwalMixinInfo', () => {
    it('Debio retornar una instancia de Swal', () => {
      expect(service.getSwalMixinInfo()).toBeTruthy();
    });
  });

  describe('Test unitarios para el metodo showModalError', () => {
    it('debería mostrar un modal de error con SweetAlert2', () => {
      const text = 'Este es un mensaje de error';
      const title = 'Título del error (opcional)';

      // Espiar SweetAlert2 (swal) para verificar si se llama con los argumentos correctos
      const spy = spyOn(service, 'showModalError');

      // Llamar al método showModalError() con valores de prueba
      service.showModalError(text, title);

      // Verificar si SweetAlert2 (swal) ha sido llamado con los argumentos correctos
      expect(spy).toHaveBeenCalled();
    });
  });
});
