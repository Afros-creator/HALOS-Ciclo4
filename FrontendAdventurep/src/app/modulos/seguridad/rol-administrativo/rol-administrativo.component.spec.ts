import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolAdministrativoComponent } from './rol-administrativo.component';

describe('RolAdministrativoComponent', () => {
  let component: RolAdministrativoComponent;
  let fixture: ComponentFixture<RolAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolAdministrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
