import { Note, ScaleType } from '@tonaljs/tonal';
import { ScaleType as Scale } from '@tonaljs/scale-type';
import { Scale as TonalScale } from '@tonaljs/scale';

export const defaultScale = ScaleType.get('chromatic');
export const defaultKey = 'C';

export const defaultScales = ScaleType.all().sort((a, b) => a.name.localeCompare(b.name));

const transposeScale = (scale: Scale, key: string): string[] =>
  scale.intervals.map(Note.transposeFrom(key)).map(Note.simplify);

export const defaultKeys = transposeScale(defaultScale, defaultKey).map((note) => Note.enharmonic(note));

export const scaleIncludes = (scale: TonalScale, note: string): boolean => {
  if (!scale || scale.empty || !scale.tonic || !note) {
    return false;
  }
  const scaleNotes = transposeScale(scale, scale.tonic);
  return enharmonicIncludes(scaleNotes, note);
};

export const scaleInterval = (scale: TonalScale, note: string): string => {
  return scale.intervals[enharmonicIndexOf(scale.notes, note)];
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
