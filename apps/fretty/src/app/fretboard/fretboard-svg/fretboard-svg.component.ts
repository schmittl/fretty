import { Component, Input } from '@angular/core';
import { Fretboard } from '@fretty/music';

@Component({
  selector: 'fretty-fretboard-svg',
  templateUrl: './fretboard-svg.component.html',
  styleUrls: ['./fretboard-svg.component.scss'],
})
export class FretboardSvgComponent {
  @Input()
  fretboard!: Fretboard;

  noteSize = 40;

  notePadding = this.noteSize / 4;
  noteSpace = (this.noteSize + this.notePadding) * 2;

  viewBox(): string {
    return `0 0 ${this.noteSpace * this.fretboard.config.frets} ${
      this.noteSize * 4 * this.fretboard.config.tuning.length
    }`;
  }

  transformY(index: number): string {
    return `translate(0 ${index * this.noteSpace})`;
  }

  transformX(index: number): string {
    return `translate(${index * this.noteSpace})`;
  }
}
