import { describe, it, expect } from 'vitest';
import { countTokens } from '../shared/token-counter';

describe('countTokens', () => {
  it('returns a positive number for non-empty text', () => {
    expect(countTokens('Hello world')).toBeGreaterThan(0);
  });
  it('returns 0 for empty string', () => {
    expect(countTokens('')).toBe(0);
  });
  it('returns more tokens for longer text', () => {
    const short = countTokens('hi');
    const long = countTokens('This is a much longer sentence with many more tokens in it.');
    expect(long).toBeGreaterThan(short);
  });
});
