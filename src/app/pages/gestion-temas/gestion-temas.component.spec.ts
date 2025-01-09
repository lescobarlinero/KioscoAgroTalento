import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTemasComponent } from './gestion-temas.component';

describe('GestionTemasComponent', () => {
  let component: GestionTemasComponent;
  let fixture: ComponentFixture<GestionTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
