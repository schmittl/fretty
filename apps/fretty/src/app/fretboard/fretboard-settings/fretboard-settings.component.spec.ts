import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FretboardSettingsComponent } from './fretboard-settings.component';

describe('FretboardSettingsComponent', () => {
  let component: FretboardSettingsComponent;
  let fixture: ComponentFixture<FretboardSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardSettingsComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
