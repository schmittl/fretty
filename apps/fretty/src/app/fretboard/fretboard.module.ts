import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FretboardContainerComponent } from './fretboard-container/fretboard-container.component';
import { FretboardNoteComponent } from './fretboard-note/fretboard-note.component';
import { FretboardBackgroundComponent } from './fretboard-background/fretboard-background.component';
import { FretboardNotesComponent } from './fretboard-notes/fretboard-notes.component';
import { FretboardSettingsComponent } from './fretboard-settings/fretboard-settings.component';
import { MatSelectModule } from '@angular/material/select';
import { FretboardScaleComponent } from './fretboard-scale/fretboard-scale.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    FretboardBackgroundComponent,
    FretboardContainerComponent,
    FretboardNoteComponent,
    FretboardNotesComponent,
    FretboardScaleComponent,
    FretboardSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [FretboardContainerComponent],
})
export class FretboardModule {}
