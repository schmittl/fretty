import { Scale } from '@tonaljs/tonal';
import { defaultKeys, scaleIncludes, scaleInterval } from './scale';

describe('scale', () => {
  it('defaultKeys', () => {
    expect(defaultKeys.length).toBe(12);
  });

  it('scaleIncludes', () => {
    expect(scaleIncludes(Scale.get('E aeolian'), 'E')).toBe(true);
    expect(scaleIncludes(Scale.get('E aeolian'), 'F#')).toBe(true);
    expect(scaleIncludes(Scale.get('E aeolian'), 'Gb')).toBe(true);

    expect(scaleIncludes(Scale.get('E aeolian'), 'F')).toBe(false);
    expect(scaleIncludes(Scale.get('x'), 'E')).toBe(false);
    expect(scaleIncludes(Scale.get('E aeolian'), 'x')).toBe(false);
  });

  it('scaleInterval', () => {
    const scale = Scale.get('E aeolian');
    expect(scaleInterval(scale, 'E')).toBe('1P');
    expect(scaleInterval(scale, 'F#')).toBe('2M');
    expect(scaleInterval(scale, 'Gb')).toBe('2M');
    expect(scaleInterval(scale, 'G')).toBe('3m');
    expect(scaleInterval(scale, 'A')).toBe('4P');

    expect(scaleInterval(scale, 'F')).toBe(undefined);
    expect(scaleInterval(scale, 'x')).toBe(undefined);
  });
});
