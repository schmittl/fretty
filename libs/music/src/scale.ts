import { Note, ScaleType } from '@tonaljs/tonal';
import { ScaleType as TonalScaleType } from '@tonaljs/scale-type';
import { Scale as TonalScale } from '@tonaljs/scale';

export interface Scale {
  name: string;
  scale: TonalScaleType;
}

export const defaultScale = ScaleType.get('aeolian');
export const defaultKey = 'E';

export const defaultScales = ScaleType.all().sort((a, b) => a.name.localeCompare(b.name));
export const defaultKeys = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];

export const scaleIncludes = (scale: TonalScale, note: string): boolean => {
  if (!scale || scale.empty || !scale.tonic || !note) {
    return false;
  }
  const scaleNotes = transposeScale(scale, scale.tonic);
  return enharmonicIncludes(scaleNotes, note);
};

export const scaleInterval = (scale: TonalScale, note: string): string | undefined => {
  return scale.intervals[enharmonicIndexOf(scale.notes.map(Note.simplify), note)];
};

const enharmonicIncludes = (notes: string[], note: string): boolean =>
  notes.includes(note) || notes.includes(Note.enharmonic(note));

const enharmonicIndexOf = (notes: string[], note: string): number => {
  const index = notes.indexOf(note);
  if (index == -1) {
    return notes.indexOf(Note.enharmonic(note));
  }
  return index;
};

const transposeScale = (scale: TonalScaleType, key: string): string[] =>
  scale.intervals.map(Note.transposeFrom(key)).map(Note.simplify);
