import { Note } from '@tonaljs/tonal';

export interface FretboardConfig {
  readonly tuning: string[];
  readonly frets: number;
  readonly accidentals: 'flats' | 'sharps';
  readonly stringOrder: 'high-first' | 'low-first';
}

export const defaultConfig: FretboardConfig = {
  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
  frets: 5,
  accidentals: 'sharps',
  stringOrder: 'high-first',
};

export type FretboardNotes = readonly (readonly string[])[];

export class Fretboard {
  private readonly _config: FretboardConfig;
  private readonly _notes: FretboardNotes;

  constructor(fretboardConfig: Partial<FretboardConfig> = {}) {
    this._config = Object.freeze({ ...defaultConfig, ...fretboardConfig });
    this._notes = Object.freeze(this.notesOnFretboard());
  }

  get config(): FretboardConfig {
    return this._config;
  }

  get notes(): FretboardNotes {
    return this._notes;
  }

  private notesOnFretboard(): string[][] {
    const notesOnFretboard: string[][] = [];
    const notesOfTuning =
      this.config.stringOrder === 'high-first' ? this.config.tuning.slice().reverse() : this.config.tuning;

    for (const startNote of notesOfTuning) {
      notesOnFretboard.push(this.notesOnString(startNote));
    }

    return notesOnFretboard;
  }

  private notesOnString(startNote: string): string[] {
    const notesOnString = [startNote];
    const frets = this.config.frets;

    for (let i = 1, currentNote = startNote; i < frets; i++) {
      const nextNote = this.nextNoteOnString(currentNote);
      notesOnString.push(nextNote);
      currentNote = nextNote;
    }

    return notesOnString;
  }

  private nextNoteOnString(currentNote: string): string {
    const nextNote = Note.simplify(transposeBySemitone(currentNote));
    return this.config.accidentals === 'flats' ? nextNote : Note.enharmonic(nextNote);
  }
}

const transposeBySemitone = Note.transposeBy('2m');
