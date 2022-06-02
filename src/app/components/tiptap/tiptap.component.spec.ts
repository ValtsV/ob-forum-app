import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiptapComponent } from './tiptap.component';

describe('TiptapComponent', () => {
  let component: TiptapComponent;
  let fixture: ComponentFixture<TiptapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiptapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiptapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
