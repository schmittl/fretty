import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FretboardSettingsComponent } from './fretboard-settings.component';

describe('FretboardSettingsComponent', () => {
  let component: FretboardSettingsComponent;
  let fixture: ComponentFixture<FretboardSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardSettingsComponent],
      imports: [
        FormsModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
