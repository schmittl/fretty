import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FretboardContainerComponent } from './fretboard-container/fretboard-container.component';

@NgModule({
  declarations: [FretboardContainerComponent],
  imports: [CommonModule],
  exports: [FretboardContainerComponent],
})
export class FretboardModule {}
