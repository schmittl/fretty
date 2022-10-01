import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Fretboard } from '@fretty/music';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { FretboardContainerComponent } from './fretboard-container.component';

describe('FretboardContainerComponent', () => {
  let component: FretboardContainerComponent;
  let fixture: ComponentFixture<FretboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardContainerComponent],
      imports: [FormsModule, NgxsModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardContainerComponent);
    component = fixture.componentInstance;
    component.fretboard$ = of(new Fretboard());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
