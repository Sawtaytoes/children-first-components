import {
  expect,
} from '@storybook/jest'

expect
.extend({
  toBeSelected(
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
            === 'option'
          )
          && (
            [
              null,
              '',
              'option',
            ]
            .includes(
              role
            )
          )
        )
        || (
          role
          === 'option'
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
            'aria-selected'
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

    const getIsSelected = () => (
      (
        element
        .getAttribute(
          'aria-selected',
        )
      )
      === 'true'
    )

    return {
      pass: getIsSelected(),
      message: () => {
        const isText = (
          getIsSelected()
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
              '.toBeSelected'
            ),
            'element',
            '',
          ),
          '',
          `Received element ${isText} selected:`,
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
