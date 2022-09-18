import { Note, ScaleType } from '@tonaljs/tonal';

export const scales = ScaleType.all().sort((a, b) => a.name.localeCompare(b.name));

export const keys = ScaleType.get('chromatic')
  .intervals.map(Note.transposeFrom('C'))
  .map((note) => Note.enharmonic(note));
