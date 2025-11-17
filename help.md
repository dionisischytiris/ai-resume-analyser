I split the store into a maintainable file structure and created the files for you in a single code document named
Puter-store-split (you can see it in the canvas).

What I created

Files (all under src/lib/puter/):

types.ts — global window.puter augmentation and all TypeScript types (PuterUser, FSItem, AIResponse, PuterStore, etc.).

getPuter.ts — small helper that safely returns window.puter or null.

utils/error.ts — small helper setStoreError to centralise error handling.

creators/

base.ts — initial flags, initializePuter and lifecycle helpers.

theme.ts — theme functions: applyTheme, toggleTheme, initializeThemeFromSystem. (No localStorage.)

auth.ts — auth section with descriptive names: verifyAuthenticationStatus, performSignIn, performSignOut,
refreshAuthenticatedUser, getCurrentUser.

fs.ts — filesystem functions with descriptive names: writeFile, readFile, listDirectory, uploadFiles, deleteFile.

ai.ts — AI helpers: sendChat, sendFeedback, imageToText.

kv.ts — key/value: getKey, setKey, deleteKey, listKeys, flushKeys.

index.ts — composes all sections and exports the usePuterStore hook (no middleware).

Naming decisions

I renamed functions to be descriptive (e.g. signIn → performSignIn, checkAuthStatus → verifyAuthenticationStatus,
write → writeFile, etc.) — they’re reflected in the PuterStore type so your IDE will show the clearer names.

The creators return Partial<PuterStore> and are merged in index.ts into a full store object. This pattern keeps each
feature in its own file while still giving you a single usePuterStore hook.

Why this approach

Splitting into creators keeps each concern isolated and testable, and keeps index.ts simple — it only composes the
sections.

No zustand middleware or localStorage code included (per your request).

Avoided importing StateCreator (type-only import issues) — creators are plain functions returning Partial<PuterStore> so
TypeScript stays happy and simple.

Integration notes

You do not need to change root.tsx for the CSS import — keep importing your single main.css (which itself imports the
split CSS parts).

Replace any old store usage in your codebase to match the new descriptive names (e.g. usePuterStore.getState()
.auth.performSignIn() instead of signIn()), or create tiny adapter helpers if you prefer backward compatibility. If you
want, I can add a small adapter layer that re-exports the previous short names.