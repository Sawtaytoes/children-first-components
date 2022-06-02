import {
  expect,
} from '@storybook/jest'

expect
.extend({
  toBePressed(
    element,
  ) {
    // Format copied from https://github.com/testing-library/jest-dom/blob/main/src/to-be-checked.js
    const role = (
      element
      .getAttribute(
        'role'
      )
    )

    const isValidButton = () => (
      (
        (
          (
            (
              element
              .tagName
              .toLowerCase()
            )
            === 'button'
          )
          && (
            [
              null,
              '',
              'button',
            ]
            .includes(
              role
            )
          )
        )
        || (
          (
            (
              element
              .tagName
              .toLowerCase()
            )
            === 'input'
          )
          && (
            (
              element
              .type
              .toLowerCase()
            )
            === 'button'
          )
          && (
            [
              null,
              '',
              'button',
            ]
            .includes(
              role
            )
          )
        )
        || (
          role
          === 'button'
        )
      )
      && (
        [
          'true',
          'false',
        ]
        .includes(
          element
          .getAttribute(
            'aria-pressed'
          )
        )
      )
    )

    if (
      !(
        isValidButton()
      )
    ) {
      return {
        pass: false,
        message: () =>
          `only buttons or elements with role button and a valid aria-pressed attribute can be used with .toBePressed().`,
      }
    }

    const getIsPressed = () => (
      (
        element
        .getAttribute(
          'aria-pressed',
        )
      )
      === 'true'
    )

    return {
      pass: getIsPressed(),
      message: () => {
        const isText = (
          getIsPressed()
          ? 'is'
          : 'is not'
        )

        return [
          this
          .utils
          .matcherHint(
            (
              (
                this
                .isNot
              )
              ? '.not'
              : ''
            )
            .concat(
              '.toBePressed'
            ),
            'element',
            '',
          ),
          '',
          `Received element ${isText} pressed:`,
          (
            '  '
            .concat(
              this
              .utils
              .printReceived(
                element
                .cloneNode(
                  false
                )
              )
            )
          ),
        ]
        .join(
          '\n'
        )
      },
    }
  },
})
