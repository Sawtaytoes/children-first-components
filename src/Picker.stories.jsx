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
  MultiplePickerProvider,
} from './MultiplePickerProvider'
import {
  SinglePickerProvider,
} from './SinglePickerProvider'
import {
  PickerSelector,
} from './PickerSelector'
import {
  usePickerField,
} from './usePickerField'
import './toBePressed.expect'
import './toBeSelected.expect'

export default {
  component: SinglePickerProvider,
  decorators: htmlStyleDecorators,
  title: 'Picker',
}

const ButtonOption = ({
  children,
  isSelected,
  name,
  selectOption,
  value,
}) => (
  <button
    aria-pressed={isSelected}
    name={name}
    onClick={selectOption}
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
  selectOption,
  optionType,
  value,
}) => (
  <label>
    <input
      checked={isSelected}
      name={name}
      onClick={selectOption}
      type={optionType}
      value={value}
    />

    {children}
  </label>
)

const InputButtonOption = ({
  children,
  isSelected,
  name,
  selectOption,
  optionType,
}) => (
  <input
    aria-pressed={isSelected}
    name={name}
    onClick={selectOption}
    type="button"
    value={children}
  />
)

const InputRoleOption = ({
  children,
  isSelected,
  selectOption,
  optionType,
}) => (
  <span
    aria-checked={isSelected}
    aria-label={children}
    onClick={selectOption}
    role={optionType}
    tabIndex="0"
  >
    {children}
  </span>
)

const SelectOption = ({
  children,
  isSelected,
  selectOption,
}) => (
  <span
    aria-label={children}
    aria-selected={isSelected}
    onClick={selectOption}
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

const SwitchOption = ({
  children,
  isSelected,
  selectOption,
}) => (
  <label>
    <div>
      {children}
    </div>

    <button
      aria-checked={isSelected}
      onClick={selectOption}
      role="switch"
      tabIndex="0"
    >
      <span>
        Off
      </span>

      <span>
        On
      </span>
    </button>
  </label>
)

export const SingleSelectionControlled = (
  singlePickerProviderProps,
) => (
  <SinglePickerProvider
    {...singlePickerProviderProps}
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
  </SinglePickerProvider>
)

SingleSelectionControlled
.args = {
  onChange: (
    action(
      'onChange'
    )
  ),
  value: '',
}

SingleSelectionControlled
.argTypes = {
  value: {
    control: {
      type: 'radio',
    },
    options: [
      'first',
      'second',
      'third',
    ],
  },
}

export const MultipleSelectionControlled = (
  multiplePickerProviderProps,
) => (
  <MultiplePickerProvider
    {...multiplePickerProviderProps}
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
  </MultiplePickerProvider>
)

MultipleSelectionControlled
.args = {
  onChange: (
    action(
      'onChange'
    )
  ),
  value: [],
}

MultipleSelectionControlled
.argTypes = {
  value: {
    control: {
      type: 'check',
    },
    options: [
      'first',
      'second',
      'third',
    ],
  },
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
    <SinglePickerProvider
      onChange={onChange}
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
    </SinglePickerProvider>
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
    <MultiplePickerProvider
      onChange={onChange}
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
    </MultiplePickerProvider>
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

export const SingleSelectionInputButton = () => {
  const {
    onChange,
    value,
  } = (
    usePickerField(
      ''
    )
  )

  return (
    <SinglePickerProvider
      onChange={onChange}
      value={value}
    >
      <fieldset data-vertical>
        <PickerSelector
          value="first"
        >
          <InputButtonOption>
            First
          </InputButtonOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <InputButtonOption>
            Second
          </InputButtonOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <InputButtonOption>
            Third
          </InputButtonOption>
        </PickerSelector>
      </fieldset>
    </SinglePickerProvider>
  )
}

SingleSelectionInputButton
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

const defaultMultipleSelectionInputButtonValue = []

export const MultipleSelectionInputButton = () => {
  const {
    onChange,
    value,
  } = (
    usePickerField(
      defaultMultipleSelectionInputButtonValue
    )
  )

  return (
    <MultiplePickerProvider
      onChange={onChange}
      value={value}
    >
      <fieldset data-vertical>
        <PickerSelector
          value="first"
        >
          <InputButtonOption>
            First
          </InputButtonOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <InputButtonOption>
            Second
          </InputButtonOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <InputButtonOption>
            Third
          </InputButtonOption>
        </PickerSelector>
      </fieldset>
    </MultiplePickerProvider>
  )
}

MultipleSelectionInputButton
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
    <SinglePickerProvider
      onChange={onChange}
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
    </SinglePickerProvider>
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
    <MultiplePickerProvider
      onChange={onChange}
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
    </MultiplePickerProvider>
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
    <SinglePickerProvider
      onChange={onChange}
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
    </SinglePickerProvider>
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
    <MultiplePickerProvider
      onChange={onChange}
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
    </MultiplePickerProvider>
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
    <SinglePickerProvider
      onChange={onChange}
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
    </SinglePickerProvider>
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
    <MultiplePickerProvider
      onChange={onChange}
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
    </MultiplePickerProvider>
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

export const SingleSelectionSwitch = () => {
  const {
    onChange,
    value,
  } = (
    usePickerField(
      ''
    )
  )

  return (
    <SinglePickerProvider
      onChange={onChange}
      value={value}
    >
      <fieldset data-vertical>
        <PickerSelector
          value="first"
        >
          <SwitchOption>
            First
          </SwitchOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <SwitchOption>
            Second
          </SwitchOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <SwitchOption>
            Third
          </SwitchOption>
        </PickerSelector>
      </fieldset>
    </SinglePickerProvider>
  )
}

SingleSelectionSwitch
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
          'switch',
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
      'switch',
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
          'switch',
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
          'switch',
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
      'switch',
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
          'switch',
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
          'switch',
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
      'switch',
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
          'switch',
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
          'switch',
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

const defaultMultipleSelectionSwitchValue = []

export const MultipleSelectionSwitch = () => {
  const {
    onChange,
    value,
  } = (
    usePickerField(
      defaultMultipleSelectionSwitchValue
    )
  )

  return (
    <MultiplePickerProvider
      onChange={onChange}
      value={value}
    >
      <fieldset data-vertical>
        <PickerSelector
          value="first"
        >
          <SwitchOption>
            First
          </SwitchOption>
        </PickerSelector>

        <PickerSelector
          value="second"
        >
          <SwitchOption>
            Second
          </SwitchOption>
        </PickerSelector>

        <PickerSelector
          value="third"
        >
          <SwitchOption>
            Third
          </SwitchOption>
        </PickerSelector>
      </fieldset>
    </MultiplePickerProvider>
  )
}

MultipleSelectionSwitch
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
          'switch',
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
      'switch',
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
          'switch',
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
          'switch',
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
      'switch',
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
          'switch',
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
          'switch',
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
          'switch',
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
      'switch',
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
          'switch',
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
      'switch',
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
          'switch',
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
          'switch',
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
      <SinglePickerProvider
        name="picker"
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
      </SinglePickerProvider>
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
    <Field isMultipleElement>
      <MultiplePickerProvider
        name="picker"
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
      </MultiplePickerProvider>
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
