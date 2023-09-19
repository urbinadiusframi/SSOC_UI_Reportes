import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { environment } from 'src/environments/environment';

describe('Suit de test unitarios para el componente HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debio ser creado el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debio ser creado el componente con las urls de produccion', () => {
    environment.production = true;

    expect(environment.production).toBeTrue();

    component = fixture.componentInstance;

    expect(component).toBeTruthy();

    expect(component.url).toBeTruthy();
  });

  it('Debio ser creado el componente con las urls de desarrollo', () => {
    environment.production = false;

    expect(environment.production).toBeFalse();

    component = fixture.componentInstance;

    expect(component).toBeTruthy();

    expect(component.url).toBeTruthy();
  });
});
