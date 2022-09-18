import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FretboardContainerComponent } from './fretboard-container/fretboard-container.component';
import { FretboardNoteComponent } from './fretboard-note/fretboard-note.component';

@NgModule({
  declarations: [FretboardContainerComponent, FretboardNoteComponent],
  imports: [CommonModule],
  exports: [FretboardContainerComponent],
})
export class FretboardModule {}
