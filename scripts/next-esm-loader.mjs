// Auth.js beta imports extensionless Next entry points, which bundlers resolve
// but Node's ESM loader does not. Keep the test runtime equivalent to the app.
const entryPoints = new Set([
  "next/server",
  "next/headers",
  "next/navigation",
  "next/link",
  "next/image",
]);

export function resolve(specifier, context, nextResolve) {
  return nextResolve(
    entryPoints.has(specifier) ? `${specifier}.js` : specifier,
    context,
  );
}
