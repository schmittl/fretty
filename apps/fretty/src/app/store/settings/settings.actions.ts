import { FretboardConfig } from '@fretty/music';
import { NoteLabels } from './settings.state';

export class UpdateFretboardConfig {
  static readonly type = '[Settings] Update fretboard config';
  constructor(public config: Partial<FretboardConfig>) {}
}

export class UpdateNoteLabels {
  static readonly type = '[Settings] Update note labels';
  constructor(public noteLabels?: NoteLabels) {}
}

export class ShowFretNumbers {
  static readonly type = '[Settings] Show fret numbers';
  constructor(public showFretNumbers?: boolean) {}
}

export class RestoreSettings {
  static readonly type = '[Settings] Restore defaults';
}

export class ToggleIntervals {
  static readonly type = '[Settings] Toggle intervals';
  constructor(public key: string) {}
}
