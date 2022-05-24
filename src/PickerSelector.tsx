import {
  FunctionComponent,
  InputHTMLAttributes,
  JSXElementConstructor,
  memo,
  ReactElement,
  useContext,
  useMemo,
} from 'react'

import {
  OptionType,
  PickerContext,
} from './PickerContext'
import {
  useClonedChild,
} from './useClonedChild'
import {
  useUniqueId,
} from './useUniqueId'

export type PickerSelectorProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  labelText: string,
  translateProps?: (
    childProps: {
      isSelected: boolean,
      role: OptionType,
    }
  ) => (
    object
    | null
  ),
  value?: (
    InputHTMLAttributes<
      Element
    >['value']
  ),
}

const defaultProps = {
  labelText: '',
  translateProps: () => (
    null
  ),
  value: null,
}

const PickerSelector: (
  FunctionComponent<
    PickerSelectorProps
  >
) = ({
  children,
  labelText = (
    defaultProps
    .labelText
  ),
  translateProps = (
    defaultProps
    .translateProps
  ),
  value = (
    defaultProps
    .value
  ),
  ...otherProps
}) => {
  const {
    onChange,
    optionType,
    selectedValue,
  } = (
    useContext(
      PickerContext
    )
  )

  const isSelected = (
    useMemo(
      () => (
        (
          Array
          .isArray(
            selectedValue
          )
        )
        ? (
          selectedValue
          .includes(
            value
          )
        )
        : (
          selectedValue
          === value
        )
      ),
      [
        selectedValue,
        value,
      ],
    )
  )

  const inputId = useUniqueId()

  const translatedProps = (
    useMemo(
      () => (
        translateProps({
          isSelected,
          role: optionType,
        })
        || {
          isSelected,
          role: optionType,
        }
      ),
      [
        isSelected,
        optionType,
        translateProps,
      ],
    )
  )

  const clonedChild = (
    useClonedChild(
      children,
      {
        ...otherProps,
        ...translatedProps,
      },
    )
  )

  return (
    <label htmlFor={inputId}>
      <input
        aria-label={
          labelText
          || value
        }
        checked={isSelected}
        hidden
        id={inputId}
        onChange={onChange}
        type={optionType}
        value={value}
      />

      {clonedChild}
    </label>
  )
}

const MemoizedPickerSelector = (
  memo(
    PickerSelector
  )
)

export {
  MemoizedPickerSelector as PickerSelector,
}
