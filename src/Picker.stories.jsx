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
  PickerSelection,
} from './PickerSelection'
import {
  usePickerField,
} from './usePickerField'
import './toBePressed.expect'

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

const InputOption = ({
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
    <fieldset role="radiogroup">
      <PickerSelection
        value="first"
      >
        <InputOption>
          First
        </InputOption>
      </PickerSelection>

      <PickerSelection
        value="second"
      >
        <InputOption>
          Second
        </InputOption>
      </PickerSelection>

      <PickerSelection
        value="third"
      >
        <InputOption>
          Third
        </InputOption>
      </PickerSelection>
    </fieldset>
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
    usePickerField(
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
      <fieldset>
        <PickerSelection
          value="first"
        >
          <InputOption>
            First
          </InputOption>
        </PickerSelection>

        <PickerSelection
          value="second"
        >
          <InputOption>
            Second
          </InputOption>
        </PickerSelection>

        <PickerSelection
          value="third"
        >
          <InputOption>
            Third
          </InputOption>
        </PickerSelection>
      </fieldset>
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
    usePickerField(
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
      <fieldset>
        <PickerSelection
          value="first"
        >
          <InputOption>
            First
          </InputOption>
        </PickerSelection>

        <PickerSelection
          value="second"
        >
          <InputOption>
            Second
          </InputOption>
        </PickerSelection>

        <PickerSelection
          value="third"
        >
          <InputOption>
            Third
          </InputOption>
        </PickerSelection>
      </fieldset>
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

export const SingleSelectionButton = () => {
  const {
    onChange,
    value,
  } = (
    usePickerField(
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
      <fieldset>
        <PickerSelection
          value="first"
        >
          <ButtonOption>
            First
          </ButtonOption>
        </PickerSelection>

        <PickerSelection
          value="second"
        >
          <ButtonOption>
            Second
          </ButtonOption>
        </PickerSelection>

        <PickerSelection
          value="third"
        >
          <ButtonOption>
            Third
          </ButtonOption>
        </PickerSelection>
      </fieldset>
    </PickerProvider>
  )
}

SingleSelectionButton
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
          'button',
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
      'button',
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
          'button',
          {
            name: 'First',
          },
        )
      )
      .toBePressed()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'button',
          {
            pressed: true,
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
      'button',
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
          'button',
          {
            name: 'Second',
          },
        )
      )
      .toBePressed()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'button',
          {
            pressed: true,
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
      'button',
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
          'button',
          {
            name: 'Second',
          },
        )
      )
      .toBePressed()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'button',
          {
            pressed: true,
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
    usePickerField(
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
      <fieldset>
        <PickerSelection
          value="first"
        >
          <ButtonOption>
            First
          </ButtonOption>
        </PickerSelection>

        <PickerSelection
          value="second"
        >
          <ButtonOption>
            Second
          </ButtonOption>
        </PickerSelection>

        <PickerSelection
          value="third"
        >
          <ButtonOption>
            Third
          </ButtonOption>
        </PickerSelection>
      </fieldset>
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
          'button',
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
      'button',
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
          'button',
          {
            name: 'First',
          },
        )
      )
      .toBePressed()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'button',
          {
            pressed: true,
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
      'button',
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
          'button',
          {
            name: 'First',
          },
        )
      )
      .toBePressed()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'button',
          {
            name: 'Second',
          },
        )
      )
      .toBePressed()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'button',
          {
            pressed: true,
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
      'button',
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
          'button',
          {
            pressed: true,
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
      'button',
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
          'button',
          {
            name: 'First',
          },
        )
      )
      .not
      .toBePressed()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'button',
          {
            pressed: true,
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
        <fieldset>
          <PickerSelection
            value="first"
          >
            <InputOption>
              First
            </InputOption>
          </PickerSelection>

          <PickerSelection
            value="second"
          >
            <InputOption>
              Second
            </InputOption>
          </PickerSelection>

          <PickerSelection
            value="third"
          >
            <InputOption>
              Third
            </InputOption>
          </PickerSelection>
        </fieldset>
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
        <fieldset>
          <PickerSelection
            value="first"
          >
            <InputOption>
              First
            </InputOption>
          </PickerSelection>

          <PickerSelection
            value="second"
          >
            <InputOption>
              Second
            </InputOption>
          </PickerSelection>

          <PickerSelection
            value="third"
          >
            <InputOption>
              Third
            </InputOption>
          </PickerSelection>
        </fieldset>
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