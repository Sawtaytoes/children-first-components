import {
  createContext,
  ChangeEvent,
  InputHTMLAttributes,
} from 'react'

export enum OptionType {
  checkbox = 'checkbox',
  radio = 'radio',
}

export type PickerContextProps = {
  onChange: (
    event: (
      ChangeEvent<
        HTMLInputElement
      >
    )
  ) => (
    void
  ),
  optionType: OptionType,
  selectedValue: (
    InputHTMLAttributes<
      Element
    >['value']
  ),
}

export const defaultPickerContextValue: (
  PickerContextProps
) = {
  onChange: () => {},
  optionType: (
    OptionType
    .radio
  ),
  selectedValue: '',
}

export const PickerContext = (
  createContext(
    defaultPickerContextValue
  )
)
