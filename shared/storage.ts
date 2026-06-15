import { storage } from 'wxt/utils/storage';
import type { Snippet, ModelId } from './types';

const snippetsKey = storage.defineItem<Snippet[]>('local:snippets', { fallback: [] });
const modelKey = storage.defineItem<ModelId>('local:targetModel', { fallback: 'claude' });

export async function getSnippets(): Promise<Snippet[]> {
  return await snippetsKey.getValue();
}

export async function saveSnippets(snippets: Snippet[]): Promise<void> {
  await snippetsKey.setValue(snippets);
}

export async function addSnippet(snippet: Snippet): Promise<void> {
  const current = await getSnippets();
  await snippetsKey.setValue([...current, snippet]);
}

export async function removeSnippet(id: string): Promise<void> {
  const current = await getSnippets();
  await snippetsKey.setValue(current.filter((s) => s.id !== id));
}

export async function getTargetModel(): Promise<ModelId> {
  return await modelKey.getValue();
}

export async function setTargetModel(model: ModelId): Promise<void> {
  await modelKey.setValue(model);
}

export { snippetsKey, modelKey };
