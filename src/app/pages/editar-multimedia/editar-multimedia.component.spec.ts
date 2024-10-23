import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMultimediaComponent } from './editar-multimedia.component';

describe('AddVideoComponent', () => {
  let component: EditarMultimediaComponent;
  let fixture: ComponentFixture<EditarMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMultimediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
