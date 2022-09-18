import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FretboardContainerComponent } from './fretboard-container/fretboard-container.component';
import { FretboardNoteComponent } from './fretboard-note/fretboard-note.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FretboardContainerComponent, FretboardNoteComponent],
  imports: [CommonModule, FormsModule],
  exports: [FretboardContainerComponent],
})
export class FretboardModule {}
