import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { EMPTY, of } from 'rxjs';

import { ScaleSearchComponent } from './scale-search.component';

describe('ScaleSearchComponent', () => {
  let component: ScaleSearchComponent;
  let fixture: ComponentFixture<ScaleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScaleSearchComponent],
      imports: [
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
        NgxsModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: { afterClosed: () => of(EMPTY) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(ScaleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
