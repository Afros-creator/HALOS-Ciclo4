import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolGerenteComponent } from './rol-gerente.component';

describe('RolGerenteComponent', () => {
  let component: RolGerenteComponent;
  let fixture: ComponentFixture<RolGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
