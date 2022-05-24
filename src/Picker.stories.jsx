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

const HtmlOption = ({
  children,
  isSelected = false,
  role = '',
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
    <PickerSelector
      value="first"
    >
      <HtmlOption>
        First
      </HtmlOption>
    </PickerSelector>

    <PickerSelector
      value="second"
    >
      <HtmlOption>
        Second
      </HtmlOption>
    </PickerSelector>

    <PickerSelector
      value="third"
    >
      <HtmlOption>
        Third
      </HtmlOption>
    </PickerSelector>
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
      <PickerSelector
        value="first"
      >
        <HtmlOption>
          First
        </HtmlOption>
      </PickerSelector>

      <PickerSelector
        value="second"
      >
        <HtmlOption>
          Second
        </HtmlOption>
      </PickerSelector>

      <PickerSelector
        value="third"
      >
        <HtmlOption>
          Third
        </HtmlOption>
      </PickerSelector>
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
      <PickerSelector
        value="first"
      >
        <HtmlOption>
          First
        </HtmlOption>
      </PickerSelector>

      <PickerSelector
        value="second"
      >
        <HtmlOption>
          Second
        </HtmlOption>
      </PickerSelector>

      <PickerSelector
        value="third"
      >
        <HtmlOption>
          Third
        </HtmlOption>
      </PickerSelector>
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
        <PickerSelector
          value="first"
        >
          <HtmlOption>
            First
          </HtmlOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <HtmlOption>
            Second
          </HtmlOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <HtmlOption>
            Third
          </HtmlOption>
        </PickerSelector>
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
        <PickerSelector
          value="first"
        >
          <HtmlOption>
            First
          </HtmlOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <HtmlOption>
            Second
          </HtmlOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <HtmlOption>
            Third
          </HtmlOption>
        </PickerSelector>
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
