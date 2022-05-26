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

export enum SelectionType {
  multiple = 'multiple',
  single = 'single',
}

const selectionTypeToOptionType: (
  { [key in SelectionType]: OptionType }
) = {
  [
    SelectionType
    .multiple
  ]: (
    OptionType
    .checkbox
  ),
  [
    SelectionType
    .single
  ]: (
    OptionType
    .radio
  ),
}

export type PickerProviderProps = {
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
  selectionType: SelectionType,
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

const PickerProvider: (
  FunctionComponent<
    PickerProviderProps
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
          selectionTypeToOptionType
          [selectionType]
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

const MemoizedPickerProvider = (
  memo(
    PickerProvider
  )
)

export {
  MemoizedPickerProvider as PickerProvider,
}