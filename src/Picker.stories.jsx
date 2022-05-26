import {
  OneForm,
  Field,
} from '@oneform/react'
import {
  action,
} from '@storybook/addon-actions'
import {
  expect,
} from '@storybook/jest'
import {
  userEvent,
  waitFor,
  within,
} from '@storybook/testing-library'

import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  PickerProvider,
  SelectionType,
} from './PickerProvider'
import {
  PickerSelector,
} from './PickerSelector'
import {
  usePickerSelection,
} from './usePickerSelection'

export default {
  component: PickerProvider,
  decorators: htmlStyleDecorators,
  title: 'Picker',
}

const ButtonOption = ({
  children,
  isSelected,
  onClick,
}) => (
  <button
    aria-pressed={isSelected}
    onClick={onClick}
  >
    {children}
  </button>
)

const HtmlOption = ({
  children,
  isSelected,
  role,
}) => (
  <span
    aria-checked={isSelected}
    role={role}
  >
    {children}
  </span>
)

export const Standard = (
  pickerProviderProps,
) => (
  <PickerProvider
    {...pickerProviderProps}
  >
    <ul>
      <li>
        <PickerSelector
          value="first"
        >
          <HtmlOption>
            First
          </HtmlOption>
        </PickerSelector>
      </li>

      <li>
        <PickerSelector
          value="second"
        >
          <HtmlOption>
            Second
          </HtmlOption>
        </PickerSelector>
      </li>

      <li>
        <PickerSelector
          value="third"
        >
          <HtmlOption>
            Third
          </HtmlOption>
        </PickerSelector>
      </li>
    </ul>
  </PickerProvider>
)

Standard
.args = {
  onChange: (
    action(
      'onChange'
    )
  ),
  selectionType: (
    SelectionType
    .single
  ),
  value: '',
}

Standard
.argTypes = {
  selectionType: {
    control: {
      type: 'radio',
    },
    options: (
      Object
      .keys(
        SelectionType
      )
    ),
  },
  value: {
    control: {
      type: 'select',
    },
    options: [
      'first',
      'second',
      'third',
    ],
  },
}

Standard
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'First',
          },
        )
      )
      .not
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        0
      )
    })
  )
}

export const SingleSelectionHook = () => {
  const {
    onChange,
    value,
  } = (
    usePickerSelection(
      ''
    )
  )

  return (
    <PickerProvider
      onChange={onChange}
      selectionType={
        SelectionType
        .single
      }
      value={value}
    >
      <ul>
        <li>
          <PickerSelector
            value="first"
          >
            <HtmlOption>
              First
            </HtmlOption>
          </PickerSelector>
        </li>

        <li>
          <PickerSelector
            value="second"
          >
            <HtmlOption>
              Second
            </HtmlOption>
          </PickerSelector>
        </li>

        <li>
          <PickerSelector
            value="third"
          >
            <HtmlOption>
              Third
            </HtmlOption>
          </PickerSelector>
        </li>
      </ul>
    </PickerProvider>
  )
}

SingleSelectionHook
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )
}

const defaultMultipleSelectionHookValue = []

export const MultipleSelectionHook = () => {
  const {
    onChange,
    value,
  } = (
    usePickerSelection(
      defaultMultipleSelectionHookValue
    )
  )

  return (
    <PickerProvider
      onChange={onChange}
      selectionType={
        SelectionType
        .multiple
      }
      value={value}
    >
      <ul>
        <li>
          <PickerSelector
            value="first"
          >
            <HtmlOption>
              First
            </HtmlOption>
          </PickerSelector>
        </li>

        <li>
          <PickerSelector
            value="second"
          >
            <HtmlOption>
              Second
            </HtmlOption>
          </PickerSelector>
        </li>

        <li>
          <PickerSelector
            value="third"
          >
            <HtmlOption>
              Third
            </HtmlOption>
          </PickerSelector>
        </li>
      </ul>
    </PickerProvider>
  )
}

MultipleSelectionHook
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        2
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'Third',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .not
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        2
      )
    })
  )
}

export const SingleSelectionButtonOption = () => {
  const {
    onChange,
    value,
  } = (
    usePickerSelection(
      ''
    )
  )

  return (
    <PickerProvider
      onChange={onChange}
      selectionType={
        SelectionType
        .single
      }
      value={value}
    >
      <ul>
        <li>
          <PickerSelector
            value="first"
          >
            <ButtonOption>
              First
            </ButtonOption>
          </PickerSelector>
        </li>

        <li>
          <PickerSelector
            value="second"
          >
            <ButtonOption>
              Second
            </ButtonOption>
          </PickerSelector>
        </li>

        <li>
          <PickerSelector
            value="third"
          >
            <ButtonOption>
              Third
            </ButtonOption>
          </PickerSelector>
        </li>
      </ul>
    </PickerProvider>
  )
}

SingleSelectionButtonOption
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )
}

const defaultMultipleSelectionButtonValue = []

export const MultipleSelectionButton = () => {
  const {
    onChange,
    value,
  } = (
    usePickerSelection(
      defaultMultipleSelectionButtonValue
    )
  )

  return (
    <PickerProvider
      onChange={onChange}
      selectionType={
        SelectionType
        .multiple
      }
      value={value}
    >
      <ul>
        <li>
          <PickerSelector
            value="first"
          >
            <ButtonOption>
              First
            </ButtonOption>
          </PickerSelector>
        </li>

        <li>
          <PickerSelector
            value="second"
          >
            <ButtonOption>
              Second
            </ButtonOption>
          </PickerSelector>
        </li>

        <li>
          <PickerSelector
            value="third"
          >
            <ButtonOption>
              Third
            </ButtonOption>
          </PickerSelector>
        </li>
      </ul>
    </PickerProvider>
  )
}

MultipleSelectionButton
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        2
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'Third',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .not
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        2
      )
    })
  )
}

export const SingleSelectionOneForm = () => (
  <OneForm>
    <Field>
      <PickerProvider
        name="picker"
        selectionType={
          SelectionType
          .single
        }
      >
        <ul>
          <li>
            <PickerSelector
              value="first"
            >
              <HtmlOption>
                First
              </HtmlOption>
            </PickerSelector>
          </li>

          <li>
            <PickerSelector
              value="second"
            >
              <HtmlOption>
                Second
              </HtmlOption>
            </PickerSelector>
          </li>

          <li>
            <PickerSelector
              value="third"
            >
              <HtmlOption>
                Third
              </HtmlOption>
            </PickerSelector>
          </li>
        </ul>
      </PickerProvider>
    </Field>
  </OneForm>
)

SingleSelectionOneForm
.storyName = (
  'Single Selection OneForm'
)

SingleSelectionOneForm
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'radio',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'radio',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'radio',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )
}

const defaultMultipleSelectionOneFormValues = {
  picker: [],
}

export const MultipleSelectionOneForm = () => (
  <OneForm
    values={defaultMultipleSelectionOneFormValues}
  >
    <Field>
      <PickerProvider
        name="picker"
        selectionType={
          SelectionType
          .multiple
        }
      >
        <ul>
          <li>
            <PickerSelector
              value="first"
            >
              <HtmlOption>
                First
              </HtmlOption>
            </PickerSelector>
          </li>

          <li>
            <PickerSelector
              value="second"
            >
              <HtmlOption>
                Second
              </HtmlOption>
            </PickerSelector>
          </li>

          <li>
            <PickerSelector
              value="third"
            >
              <HtmlOption>
                Third
              </HtmlOption>
            </PickerSelector>
          </li>
        </ul>
      </PickerProvider>
    </Field>
  </OneForm>
)

MultipleSelectionOneForm
.storyName = (
  'Multiple Selection OneForm'
)

MultipleSelectionOneForm
.play = async ({
  canvasElement,
}) => {
  const canvas = (
    within(
      canvasElement
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'Second',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'Second',
          },
        )
      )
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        2
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'Third',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        3
      )
    })
  )

  userEvent
  .click(
    canvas
    .queryByRole(
      'checkbox',
      {
        name: 'First',
      },
    )
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'checkbox',
          {
            name: 'First',
          },
        )
      )
      .not
      .toBeChecked()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'checkbox',
          {
            checked: true,
          },
        )
      )
      .toHaveLength(
        2
      )
    })
  )
}
