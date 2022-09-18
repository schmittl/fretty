import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretboardContainerComponent } from './fretboard-container.component';

describe('FretboardContainerComponent', () => {
  let component: FretboardContainerComponent;
  let fixture: ComponentFixture<FretboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
