import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortVideosComponent } from './sort-videos.component';

describe('SortVideosComponent', () => {
  let component: SortVideosComponent;
  let fixture: ComponentFixture<SortVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
