import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FretboardContainerComponent } from './fretboard-container/fretboard-container.component';
import { FretboardNoteComponent } from './fretboard-note/fretboard-note.component';
import { FretboardSvgComponent } from './fretboard-svg/fretboard-svg.component';
import { FretboardBackgroundComponent } from './fretboard-background/fretboard-background.component';
import { FretboardNotesComponent } from './fretboard-notes/fretboard-notes.component';
import { FretboardSettingsComponent } from './fretboard-settings/fretboard-settings.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FretboardBackgroundComponent,
    FretboardContainerComponent,
    FretboardNoteComponent,
    FretboardNotesComponent,
    FretboardSettingsComponent,
    FretboardSvgComponent,
  ],
  imports: [CommonModule, FormsModule, MatSelectModule],
  exports: [FretboardContainerComponent],
})
export class FretboardModule {}
