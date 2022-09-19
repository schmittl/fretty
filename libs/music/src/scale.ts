import { Note, ScaleType } from '@tonaljs/tonal';
import { ScaleType as Scale } from '@tonaljs/scale-type';

export const defaultScale = ScaleType.get('chromatic');
export const defaultKey = 'C';

export const defaultScales = ScaleType.all().sort((a, b) => a.name.localeCompare(b.name));

const transposeScale = (scale: Scale, key: string): string[] =>
  scale.intervals.map(Note.transposeFrom(key)).map(Note.simplify);

export const defaultKeys = transposeScale(defaultScale, defaultKey).map((note) => Note.enharmonic(note));

export const scaleIncludes = (scale: Scale, key: string, note: string): boolean => {
  if (!scale || scale.empty || !key || !note) {
    return false;
  }
  const scaleNotes = transposeScale(scale, key);
  return scaleNotes.includes(note) || scaleNotes.includes(Note.enharmonic(note));
};
