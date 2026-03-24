export function safeCallback(fn?: () => void): () => void {
  return fn ?? (() => {});
}