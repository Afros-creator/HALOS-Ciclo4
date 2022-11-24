import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasCrearComponent } from './ventas-crear.component';

describe('VentasCrearComponent', () => {
  let component: VentasCrearComponent;
  let fixture: ComponentFixture<VentasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
