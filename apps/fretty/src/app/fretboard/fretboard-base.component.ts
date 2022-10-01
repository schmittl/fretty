export abstract class FretboardBaseComponent {
  noteSize = 40;

  notePadding = this.noteSize / 4;
  noteSpacing = (this.noteSize + this.notePadding) * 2;

  transformY(index: number): string {
    return `translate(0 ${index * this.noteSpacing})`;
  }

  transformX(index: number): string {
    return `translate(${index * this.noteSpacing})`;
  }
}
