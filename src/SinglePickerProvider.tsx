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

export type SinglePickerProviderProps = {
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

const SinglePickerProvider: (
  FunctionComponent<
    SinglePickerProviderProps
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
          .radio
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

const MemoizedSinglePickerProvider = (
  memo(
    SinglePickerProvider
  )
)

export {
  MemoizedSinglePickerProvider as SinglePickerProvider,
}
