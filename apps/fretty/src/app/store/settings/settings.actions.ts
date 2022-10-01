import { FretboardConfig } from '@fretty/music';
import { NoteLabels } from './settings.state';

export class UpdateFretboardConfig {
  static readonly type = '[Settings] Update fretboard config';
  constructor(public config: Partial<FretboardConfig>) {}
}

export class UpdateNoteLabels {
  static readonly type = '[Settings] Update note labels';
  constructor(public noteLabels: NoteLabels) {}
}
