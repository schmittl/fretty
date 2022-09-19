import { Note, Scale } from '@tonaljs/tonal';
import { Note as INote } from '@tonaljs/core';
import { Scale as IScale } from '@tonaljs/scale';
import { defaultScale, defaultKey } from './scale';

export interface FretboardConfig {
  readonly tuning: string[];
  readonly frets: number;
  readonly accidentals: 'flats' | 'sharps';
  readonly stringOrder: 'high-first' | 'low-first';
  readonly scale: string;
  readonly key: string;
}

export const defaultConfig: FretboardConfig = {
  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
  frets: 5,
  accidentals: 'sharps',
  stringOrder: 'high-first',
  scale: defaultScale.name,
  key: defaultKey,
};

export type FretboardNotes = readonly (readonly INote[])[];
export type FretboardScale = Readonly<IScale>;

export class Fretboard {
  private readonly _config: FretboardConfig;
  private readonly _notes: FretboardNotes;
  private readonly _scale: IScale;

  constructor(fretboardConfig: Partial<FretboardConfig> = {}) {
    this._config = Object.freeze({ ...defaultConfig, ...fretboardConfig });
    this._scale = Object.freeze(Scale.get([this._config.key, this._config.scale]));
    this._notes = Object.freeze(this.notesOnFretboard());
  }

  get config(): FretboardConfig {
    return this._config;
  }

  get notes(): FretboardNotes {
    return this._notes;
  }

  isTonic(note: INote): boolean {
    return this._scale.tonic === note.pc;
  }

  private notesOnFretboard(): INote[][] {
    const notesOnFretboard: INote[][] = [];
    const notesOfTuning =
      this.config.stringOrder === 'high-first' ? this.config.tuning.slice().reverse() : this.config.tuning;

    for (const startNote of notesOfTuning) {
      notesOnFretboard.push(this.notesOnString(startNote));
    }

    return notesOnFretboard;
  }

  private notesOnString(startNote: string): INote[] {
    const notesOnString = [startNote];
    const frets = this.config.frets;

    for (let i = 1, currentNote = startNote; i < frets; i++) {
      const nextNote = this.nextNoteOnString(currentNote);
      notesOnString.push(nextNote);
      currentNote = nextNote;
    }

    return notesOnString.map((note) => Note.get(note) as INote);
  }

  private nextNoteOnString(currentNote: string): string {
    const nextNote = Note.simplify(transposeBySemitone(currentNote));
    return this.config.accidentals === 'flats' ? nextNote : Note.enharmonic(nextNote);
  }
}

const transposeBySemitone = Note.transposeBy('2m');
