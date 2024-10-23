import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMultimediaComponent } from './gestion-multimedia.component';

describe('GestionVideosComponent', () => {
  let component: GestionMultimediaComponent;
  let fixture: ComponentFixture<GestionMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMultimediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
