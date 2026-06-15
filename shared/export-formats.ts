import type { Snippet, ExportConfig } from './types';

export function exportSnippets(snippets: Snippet[], config: ExportConfig): string {
  switch (config.format) {
    case 'markdown':
      return toMarkdown(snippets, config);
    case 'prompt':
      return toPrompt(snippets, config);
    case 'json':
      return toJson(snippets, config);
  }
}

function toMarkdown(snippets: Snippet[], config: ExportConfig): string {
  return snippets
    .map((s) => {
      let block = `## [${s.tag}] ${s.sourceTitle}\n\n${s.content}`;
      if (config.includeAttribution) block += `\n\n> Source: ${s.sourceUrl}`;
      if (config.includeTimestamps) block += `\n> Captured: ${new Date(s.timestamp).toISOString()}`;
      return block;
    })
    .join('\n\n---\n\n');
}

function toPrompt(snippets: Snippet[], config: ExportConfig): string {
  const context = snippets
    .map((s) => {
      let entry = `<${s.tag}>\n${s.content}\n</${s.tag}>`;
      if (config.includeAttribution) entry += `\nSource: ${s.sourceUrl}`;
      return entry;
    })
    .join('\n\n');
  return `<context>\n${context}\n</context>`;
}

function toJson(snippets: Snippet[], config: ExportConfig): string {
  const data = snippets.map((s) => ({
    tag: s.tag,
    content: s.content,
    ...(config.includeAttribution && { source: s.sourceUrl, title: s.sourceTitle }),
    ...(config.includeTimestamps && { timestamp: s.timestamp }),
  }));
  return JSON.stringify(data, null, 2);
}
