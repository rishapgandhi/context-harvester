import { describe, it, expect } from 'vitest';
import { exportSnippets } from '../shared/export-formats';
import type { Snippet } from '../shared/types';

const mockSnippet: Snippet = {
  id: '1', content: 'test content', sourceUrl: 'https://example.com',
  sourceTitle: 'Example', timestamp: 1700000000000, tag: 'docs', tokenCount: 5, order: 0,
};

describe('exportSnippets', () => {
  it('exports markdown with attribution', () => {
    const result = exportSnippets([mockSnippet], { format: 'markdown', includeAttribution: true, includeTimestamps: false });
    expect(result).toContain('## [docs] Example');
    expect(result).toContain('Source: https://example.com');
  });

  it('exports prompt format', () => {
    const result = exportSnippets([mockSnippet], { format: 'prompt', includeAttribution: false, includeTimestamps: false });
    expect(result).toContain('<context>');
    expect(result).toContain('<docs>');
  });

  it('exports valid JSON', () => {
    const result = exportSnippets([mockSnippet], { format: 'json', includeAttribution: true, includeTimestamps: false });
    const parsed = JSON.parse(result);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].content).toBe('test content');
  });
});
