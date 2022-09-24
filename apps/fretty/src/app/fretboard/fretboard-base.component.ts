import { Fretboard } from '@fretty/music';

export abstract class FretboardBaseComponent {
  abstract fretboard: Fretboard;

  noteSize = 40;

  notePadding = this.noteSize / 4;
  noteSpacing = (this.noteSize + this.notePadding) * 2;

  viewBox(): string {
    return `0 0 ${this.noteSpacing * (this.fretboard.config.frets + 1)} ${
      this.noteSize * 4 * this.fretboard.config.tuning.length
    }`;
  }

  transformY(index: number): string {
    return `translate(0 ${index * this.noteSpacing})`;
  }

  transformX(index: number): string {
    return `translate(${index * this.noteSpacing})`;
  }
}
