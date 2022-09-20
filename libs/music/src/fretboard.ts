import { Note, Scale } from '@tonaljs/tonal';
import { Note as TonalNote } from '@tonaljs/core';
import { Scale as TonalScale } from '@tonaljs/scale';
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

export interface FretboardNote {
  readonly pc: string;
}

export type FretboardNotes = readonly (readonly FretboardNote[])[];
export type FretboardScale = Readonly<TonalScale>;

export class Fretboard {
  private readonly _config: FretboardConfig;
  private readonly _notes: FretboardNotes;
  private readonly _scale: TonalScale;

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

  isTonic(note: FretboardNote): boolean {
    return this._scale.tonic === note.pc;
  }

  private notesOnFretboard(): FretboardNote[][] {
    const notesOnFretboard: FretboardNote[][] = [];
    const notesOfTuning =
      this.config.stringOrder === 'high-first' ? this.config.tuning.slice().reverse() : this.config.tuning;

    for (const startNote of notesOfTuning) {
      notesOnFretboard.push(this.notesOnString(startNote));
    }

    return notesOnFretboard;
  }

  private notesOnString(startNote: string): FretboardNote[] {
    const notesOnString = [startNote];
    const frets = this.config.frets;

    for (let i = 1, currentNote = startNote; i < frets; i++) {
      const nextNote = this.nextNoteOnString(currentNote);
      notesOnString.push(nextNote);
      currentNote = nextNote;
    }

    return notesOnString.map(toFretboardNote);
  }

  private nextNoteOnString(currentNote: string): string {
    const nextNote = Note.simplify(transposeBySemitone(currentNote));
    return this.config.accidentals === 'flats' ? nextNote : Note.enharmonic(nextNote);
  }
}

const transposeBySemitone = Note.transposeBy('2m');

const toFretboardNote = (note: string): FretboardNote => {
  const tonalNote = Note.get(note) as TonalNote;
  return {
    pc: tonalNote.pc,
  };
};
