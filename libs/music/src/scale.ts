import { Note, ScaleType } from '@tonaljs/tonal';
import { ScaleType as TonalScaleType } from '@tonaljs/scale-type';
import { Scale as TonalScale } from '@tonaljs/scale';

export interface Scale {
  name: string;
  scale: TonalScaleType;
}

const scale = ScaleType.get('aeolian');
export const defaultScale: Scale = { name: scale.name, scale };
export const defaultKey = 'E';

export const defaultScales = ScaleType.all()
  .flatMap((scale) => {
    return [{ name: scale.name, scale }, ...scale.aliases.map((alias) => ({ name: alias, scale }))];
  })
  .sort((a, b) => a.name.localeCompare(b.name));
export const defaultKeys = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];

export const scaleIncludes = (scale: TonalScale, note: string): boolean => {
  if (!scale || scale.empty || !scale.tonic || !note) {
    return false;
  }
  const scaleNotes = transposeScale(scale, scale.tonic);
  return enharmonicIncludes(scaleNotes, note);
};

export const scaleInterval = (scale: TonalScale, note: string): string => {
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
