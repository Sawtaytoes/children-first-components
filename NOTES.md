- Rename `VisibilityControlProvider` to `SingleVisibilityProvider`.
- Rewrite `VisibilityControlProvider` as `OnlyOneSelectionProvider` with `OnlyOneSelector` as a Picker-style component with state. Or just use a stateful Picker.
  + Difference between Picker and OnlyOne is Picker requires a state manager like other inputs whereas OnlyOne includes its own. This is for UI components like modals and tabs rather than form components.
  + Find a better name than "OnlyOne".
- Move create key function into hook because of memoization and fallback. This allows people to use it more easily.
- Use the hook in useVisibility and pass the key into the shared context instead of creating it there.
- Return useScopedAtom from the shared context hook creator instead of the object that's currently there.
- The fallback context key should be in useVisibility instead of the shared context.
