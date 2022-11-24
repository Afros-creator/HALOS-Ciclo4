import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAtraccionComponent } from './modificar-atraccion.component';

describe('ModificarAtraccionComponent', () => {
  let component: ModificarAtraccionComponent;
  let fixture: ComponentFixture<ModificarAtraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAtraccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
