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
  Fragment,
} from 'react'

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
  usePickerField,
} from './usePickerField'
import './toBePressed.expect'
import './toBeSelected.expect'

export default {
  component: PickerProvider,
  decorators: htmlStyleDecorators,
  title: 'Picker',
}

const ButtonOption = ({
  children,
  isSelected,
  name,
  onClick,
  value,
}) => (
  <button
    aria-pressed={isSelected}
    name={name}
    onClick={onClick}
    type="button"
    value={value}
  >
    {children}
  </button>
)

const InputOption = ({
  children,
  isSelected,
  name,
  onClick,
  role,
  value,
}) => (
  <label>
    <input
      checked={isSelected}
      name={name}
      onClick={onClick}
      type={role}
      value={value}
    />

    {children}
  </label>
)

const InputRoleOption = ({
  children,
  isSelected,
  onClick,
  role,
}) => (
  <span
    aria-checked={isSelected}
    aria-label={children}
    onClick={onClick}
    role={role}
    tabIndex="0"
  >
    {children}
  </span>
)

const SelectOption = ({
  children,
  isSelected,
  onClick,
  role,
}) => (
  <span
    aria-label={children}
    aria-selected={isSelected}
    onClick={onClick}
    role="option"
    tabIndex="0"
  >
    {children}
  </span>
)

const SelectOptionList = ({
  children,
}) => (
  <div
    aria-orientation="vertical"
    data-vertical
    role="listbox"
  >
    {children}
  </div>
)

export const Standard = (
  pickerProviderProps,
) => (
  <PickerProvider
    {...pickerProviderProps}
  >
    <fieldset data-horizontal>
      <PickerSelector
        value="first"
      >
        <InputRoleOption>
          First
        </InputRoleOption>
      </PickerSelector>

      <PickerSelector
        value="second"
      >
        <InputRoleOption>
          Second
        </InputRoleOption>
      </PickerSelector>

      <PickerSelector
        value="third"
      >
        <InputRoleOption>
          Third
        </InputRoleOption>
      </PickerSelector>
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

export const SingleSelectionInput = () => {
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
      <fieldset data-vertical>
        <PickerSelector
          value="first"
        >
          <InputOption>
            First
          </InputOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <InputOption>
            Second
          </InputOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <InputOption>
            Third
          </InputOption>
        </PickerSelector>
      </fieldset>
    </PickerProvider>
  )
}

SingleSelectionInput
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

const defaultMultipleSelectionInputValue = []

export const MultipleSelectionInput = () => {
  const {
    onChange,
    value,
  } = (
    usePickerField(
      defaultMultipleSelectionInputValue
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
      <fieldset data-vertical>
        <PickerSelector
          value="first"
        >
          <InputOption>
            First
          </InputOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <InputOption>
            Second
          </InputOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <InputOption>
            Third
          </InputOption>
        </PickerSelector>
      </fieldset>
    </PickerProvider>
  )
}

MultipleSelectionInput
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

export const SingleSelectionInputRole = () => {
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
      <fieldset data-horizontal>
        <PickerSelector
          value="first"
        >
          <InputRoleOption>
            First
          </InputRoleOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <InputRoleOption>
            Second
          </InputRoleOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <InputRoleOption>
            Third
          </InputRoleOption>
        </PickerSelector>
      </fieldset>
    </PickerProvider>
  )
}

SingleSelectionInputRole
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

const defaultMultipleSelectionInputRoleValue = []

export const MultipleSelectionInputRole = () => {
  const {
    onChange,
    value,
  } = (
    usePickerField(
      defaultMultipleSelectionInputRoleValue
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
      <fieldset data-horizontal>
        <PickerSelector
          value="first"
        >
          <InputRoleOption>
            First
          </InputRoleOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <InputRoleOption>
            Second
          </InputRoleOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <InputRoleOption>
            Third
          </InputRoleOption>
        </PickerSelector>
      </fieldset>
    </PickerProvider>
  )
}

MultipleSelectionInputRole
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
      <fieldset data-horizontal>
        <PickerSelector
          value="first"
        >
          <ButtonOption>
            First
          </ButtonOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <ButtonOption>
            Second
          </ButtonOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <ButtonOption>
            Third
          </ButtonOption>
        </PickerSelector>
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
      <fieldset data-horizontal>
        <PickerSelector
          value="first"
        >
          <ButtonOption>
            First
          </ButtonOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <ButtonOption>
            Second
          </ButtonOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <ButtonOption>
            Third
          </ButtonOption>
        </PickerSelector>
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

export const SingleSelectionSelect = () => {
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
      <SelectOptionList>
        <PickerSelector
          value="first"
        >
          <SelectOption>
            First
          </SelectOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <SelectOption>
            Second
          </SelectOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <SelectOption>
            Third
          </SelectOption>
        </PickerSelector>
      </SelectOptionList>
    </PickerProvider>
  )
}

SingleSelectionSelect
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
          'option',
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
      'option',
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
          'option',
          {
            name: 'First',
          },
        )
      )
      .toBeSelected()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'option',
          {
            selected: true,
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
      'option',
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
          'option',
          {
            name: 'Second',
          },
        )
      )
      .toBeSelected()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'option',
          {
            selected: true,
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
      'option',
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
          'option',
          {
            name: 'Second',
          },
        )
      )
      .toBeSelected()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'option',
          {
            selected: true,
          },
        )
      )
      .toHaveLength(
        1
      )
    })
  )
}

const defaultMultipleSelectionSelectValue = []

export const MultipleSelectionSelect = () => {
  const {
    onChange,
    value,
  } = (
    usePickerField(
      defaultMultipleSelectionSelectValue
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
      <SelectOptionList>
        <PickerSelector
          value="first"
        >
          <SelectOption>
            First
          </SelectOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <SelectOption>
            Second
          </SelectOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <SelectOption>
            Third
          </SelectOption>
        </PickerSelector>
      </SelectOptionList>
    </PickerProvider>
  )
}

MultipleSelectionSelect
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
          'option',
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
      'option',
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
          'option',
          {
            name: 'First',
          },
        )
      )
      .toBeSelected()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'option',
          {
            selected: true,
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
      'option',
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
          'option',
          {
            name: 'First',
          },
        )
      )
      .toBeSelected()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryByRole(
          'option',
          {
            name: 'Second',
          },
        )
      )
      .toBeSelected()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'option',
          {
            selected: true,
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
      'option',
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
          'option',
          {
            selected: true,
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
      'option',
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
          'option',
          {
            name: 'First',
          },
        )
      )
      .not
      .toBeSelected()
    })
  )

  await (
    waitFor(() => {
      expect(
        canvas
        .queryAllByRole(
          'option',
          {
            selected: true,
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
        <fieldset data-horizontal>
          <PickerSelector
            value="first"
          >
            <InputRoleOption>
              First
            </InputRoleOption>
          </PickerSelector>

          <PickerSelector
            value="second"
          >
            <InputRoleOption>
              Second
            </InputRoleOption>
          </PickerSelector>

          <PickerSelector
            value="third"
          >
            <InputRoleOption>
              Third
            </InputRoleOption>
          </PickerSelector>
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

export const MultipleSelectionOneForm = () => (
  <OneForm>
    <Field isMultiFieldElement>
      <PickerProvider
        name="picker"
        selectionType={
          SelectionType
          .multiple
        }
      >
        <fieldset data-horizontal>
          <PickerSelector
            value="first"
          >
            <InputRoleOption>
              First
            </InputRoleOption>
          </PickerSelector>

          <PickerSelector
            value="second"
          >
            <InputRoleOption>
              Second
            </InputRoleOption>
          </PickerSelector>

          <PickerSelector
            value="third"
          >
            <InputRoleOption>
              Third
            </InputRoleOption>
          </PickerSelector>
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
