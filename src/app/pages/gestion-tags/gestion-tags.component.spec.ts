import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTagsComponent } from './gestion-tags.component';

describe('GestionTagsComponent', () => {
  let component: GestionTagsComponent;
  let fixture: ComponentFixture<GestionTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
