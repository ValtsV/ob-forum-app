import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscusionesComponent } from './discusiones.component';

describe('DiscusionesComponent', () => {
  let component: DiscusionesComponent;
  let fixture: ComponentFixture<DiscusionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscusionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscusionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
