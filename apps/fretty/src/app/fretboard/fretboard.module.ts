import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FretboardContainerComponent } from './fretboard-container/fretboard-container.component';
import { FretboardNoteComponent } from './fretboard-note/fretboard-note.component';
import { FretboardSvgComponent } from './fretboard-svg/fretboard-svg.component';

@NgModule({
  declarations: [FretboardContainerComponent, FretboardNoteComponent, FretboardSvgComponent],
  imports: [CommonModule, FormsModule],
  exports: [FretboardContainerComponent],
})
export class FretboardModule {}
