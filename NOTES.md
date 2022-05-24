- Figure out `onClick` on `<button>` with `Picker`.
  + Buttons eat the onChange event for inputs.
  + We could either capture the event using `{ capture: true }` with `addEventListener` on `<label>` or throw an `onClick` to options.
  + Another option is to have a `ButtonPickerSelector`, but I don't like that if we can do it all in a single component.
  + Lastly, we could throw an `onClick` or `onChange` out that does `new ChangeEvent()` and somehow configures it for `'radio'` or `'checkbox'`.
