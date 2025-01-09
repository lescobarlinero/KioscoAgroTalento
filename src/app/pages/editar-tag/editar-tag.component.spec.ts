import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTagComponent } from './editar-tag.component';

describe('EditarTagComponent', () => {
  let component: EditarTagComponent;
  let fixture: ComponentFixture<EditarTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
