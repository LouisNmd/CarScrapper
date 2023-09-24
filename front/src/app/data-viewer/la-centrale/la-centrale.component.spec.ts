import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaCentraleComponent } from './la-centrale.component';

describe('LaCentraleComponent', () => {
  let component: LaCentraleComponent;
  let fixture: ComponentFixture<LaCentraleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaCentraleComponent]
    });
    fixture = TestBed.createComponent(LaCentraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
