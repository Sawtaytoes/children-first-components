import {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  OptionType,
  PickerContext,
} from './PickerContext'

export type MultiplePickerProviderProps = {
  children: ReactNode,
  name?: string,
  onChange?: (
    event: (
      ChangeEvent<
        HTMLInputElement
      >
    )
  ) => (
    void
  ),
  value?: (
    InputHTMLAttributes<
      Element
    >['value']
  ),
}

const defaultProps = {
  name: '',
  onChange: () => {},
  value: '',
}

const MultiplePickerProvider: (
  FunctionComponent<
    MultiplePickerProviderProps
  >
) = ({
  children,
  onChange = (
    defaultProps
    .onChange
  ),
  selectionType,
  value = (
    defaultProps
    .value
  )
}) => {
  const providerValue = (
    useMemo(
      () => ({
        name,
        onChange,
        optionType: (
          OptionType
          .checkbox
        ),
        selectedValue: value,
      }),
      [
        name,
        onChange,
        selectionType,
        value,
      ],
    )
  )

  return (
    <PickerContext.Provider
      value={providerValue}
    >
      {children}
    </PickerContext.Provider>
  )
}

const MemoizedMultiplePickerProvider = (
  memo(
    MultiplePickerProvider
  )
)

export {
  MemoizedMultiplePickerProvider as MultiplePickerProvider,
}
