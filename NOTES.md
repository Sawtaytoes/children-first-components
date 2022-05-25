- Figure out `onClick` on `<button>` with `Picker`.
  + Buttons eat the onChange event for inputs.
  + We could either capture the event using `{ capture: true }` with `addEventListener` on `<label>` or throw an `onClick` to options.
  + Another option is to have a `ButtonPickerSelector`, but I don't like that if we can do it all in a single component.
  + Lastly, we could throw an `onClick` or `onChange` out that does `new ChangeEvent()` and somehow configures it for `'radio'` or `'checkbox'`.

- Move create key function into hook because of memoization and fallback. This allows people to use it more easily.
- Use the hook in useVisibility and pass the key into the shared context instead of creating it there.
- Return useScopedAtom from the shared context hook creator instead of the object that's currently there.
- The fallback context key should be in useVisibility instead of the shared context.

- PickerSelector should pass onClick and take eventName instead of relying on label. Most apps are going to pass a button, not a span, because buttons are clickable.
- Button needs any sets of ARIA for `selected`, `pressed`, `checked`, `switched`.
- Test when when using input instead of button.
- Test when using input with a type of button.
- Potentially remove <label> if we're using aria-label.
