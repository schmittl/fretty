import { FretboardConfig } from '@fretty/music';

export class UpdateFretboardConfig {
  static readonly type = '[Settings] Update Fretboard config';
  constructor(public config: Partial<FretboardConfig>) {}
}
