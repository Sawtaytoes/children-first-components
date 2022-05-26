import {
  FunctionComponent,
  InputHTMLAttributes,
  JSXElementConstructor,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
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
      onClick: () => void,
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
  const inputRef = (
    useRef<
      HTMLInputElement
    >()
  )

  const inputId = useUniqueId()

  const onClick = (
    useCallback(
      () => {
        inputRef
        .current
        ?.click()
      },
      [],
    )
  )

  const {
    name,
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

  const translatedProps = (
    useMemo(
      () => (
        translateProps({
          isSelected,
          onClick,
          role: optionType,
        })
        || {
          isSelected,
          onClick,
          role: optionType,
        }
      ),
      [
        isSelected,
        onClick,
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
        name={name}
        onChange={onChange}
        ref={inputRef}
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
