import { defaultConfig, Fretboard } from './fretboard';

describe('Fretboard', () => {
  describe('Notes', () => {
    it('Returns default fretboard notes', () => {
      const fretboard = new Fretboard();
      expect(notes(fretboard)).toEqual([
        ['E', 'F', 'F#', 'G', 'G#'],
        ['B', 'C', 'C#', 'D', 'D#'],
        ['G', 'G#', 'A', 'A#', 'B'],
        ['D', 'D#', 'E', 'F', 'F#'],
        ['A', 'A#', 'B', 'C', 'C#'],
        ['E', 'F', 'F#', 'G', 'G#'],
      ]);
    });

    it('Returns no fretboard notes for empty tuning', () => {
      const fretboard = new Fretboard({
        tuning: [],
      });
      expect(notes(fretboard)).toEqual([]);
    });

    it('Returns fretboard notes for zero frets', () => {
      const fretboard = new Fretboard({
        tuning: ['E'],
        frets: 0,
      });
      expect(notes(fretboard)).toEqual([['E']]);
    });

    it('Returns fretboard notes for one string', () => {
      const fretboard = new Fretboard({
        tuning: ['E'],
      });
      expect(notes(fretboard)).toEqual([['E', 'F', 'F#', 'G', 'G#']]);
    });

    it('Returns fretboard notes for two strings', () => {
      const fretboard = new Fretboard({
        tuning: ['E', 'A'],
      });
      expect(notes(fretboard)).toEqual([
        ['A', 'A#', 'B', 'C', 'C#'],
        ['E', 'F', 'F#', 'G', 'G#'],
      ]);
    });

    it('Returns fretboard string order from low to high for two strings', () => {
      const fretboard = new Fretboard({
        tuning: ['E', 'A'],
        stringOrder: 'low-first',
      });
      expect(notes(fretboard)).toEqual([
        ['E', 'F', 'F#', 'G', 'G#'],
        ['A', 'A#', 'B', 'C', 'C#'],
      ]);
    });

    it('Changes accidentals to flats', () => {
      const fretboard = new Fretboard({
        tuning: ['E'],
        accidentals: 'flats',
      });
      expect(notes(fretboard)).toEqual([['E', 'F', 'Gb', 'G', 'Ab']]);
    });
  });

  describe('config', () => {
    it('Returns default config for empty constructor', () => {
      const fretboard = new Fretboard();
      expect(fretboard.config).toEqual(defaultConfig);
    });
  });
});

const notes = (fretboard: Fretboard): string[][] => {
  return fretboard.notes.map((string) => string.map((note) => note.pc));
};
