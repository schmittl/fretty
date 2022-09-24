import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FretboardContainerComponent } from './fretboard-container/fretboard-container.component';
import { FretboardNoteComponent } from './fretboard-note/fretboard-note.component';
import { FretboardSvgComponent } from './fretboard-svg/fretboard-svg.component';
import { FretboardBackgroundComponent } from './fretboard-background/fretboard-background.component';
import { FretboardNotesComponent } from './fretboard-notes/fretboard-notes.component';

@NgModule({
  declarations: [
    FretboardBackgroundComponent,
    FretboardContainerComponent,
    FretboardNoteComponent,
    FretboardNotesComponent,
    FretboardSvgComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [FretboardContainerComponent],
})
export class FretboardModule {}
