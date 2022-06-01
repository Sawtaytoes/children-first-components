- Move create key function into hook because of memoization and fallback. This allows people to use it more easily.
- Use the hook in useVisibility and pass the key into the shared context instead of creating it there.
- Return useScopedAtom from the shared context hook creator instead of the object that's currently there.
- The fallback context key should be in useVisibility instead of the shared context.

- PickerSelector should pass onClick and take eventName instead of relying on label. Most apps are going to pass a button, not a span, because buttons are clickable.
- Button needs any sets of ARIA for `selected`, `pressed`, `checked`, `switched`.
- Test when using input with a type of button.
