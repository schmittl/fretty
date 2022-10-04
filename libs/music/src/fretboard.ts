import { Note, Scale } from '@tonaljs/tonal';
import { Note as TonalNote } from '@tonaljs/core';
import { Scale as TonalScale } from '@tonaljs/scale';
import { defaultScale, defaultKey, scaleInterval } from './scale';

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
  readonly pitchclass: string;
  readonly interval?: string;
  readonly isTonic: boolean;
  readonly scalePitchclass?: string;
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

  get intervals(): string[] {
    return this._scale.intervals;
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

    for (let i = 1, currentNote = startNote; i <= frets; i++) {
      const nextNote = this.nextNoteOnString(currentNote);
      notesOnString.push(nextNote);
      currentNote = nextNote;
    }

    return notesOnString.map((note) => this.toFretboardNote(note));
  }

  private nextNoteOnString(currentNote: string): string {
    const nextNote = Note.simplify(transposeBySemitone(currentNote));
    return this.config.accidentals === 'flats' ? nextNote : Note.enharmonic(nextNote);
  }

  private toFretboardNote(note: string): FretboardNote {
    const tonalNote = Note.get(note) as TonalNote;
    return {
      pitchclass: tonalNote.pc,
      interval: this.getInterval(tonalNote.pc),
      isTonic: this.isTonic(tonalNote.pc),
      scalePitchclass: this.getScalePitchclass(tonalNote.pc),
    };
  }

  private getScalePitchclass(note: string): string | undefined {
    const interval = this.getInterval(note) ?? '';
    const index = this._scale.intervals.indexOf(interval);
    return index === -1 ? undefined : this._scale.notes[index];
  }

  private getInterval(note: string): string | undefined {
    return scaleInterval(this._scale, note);
  }

  private isTonic(note: string): boolean {
    return this._scale.tonic === note;
  }
}

const transposeBySemitone = Note.transposeBy('2m');
