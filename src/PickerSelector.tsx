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
  PickerContext,
  PickerContextProps,
} from './PickerContext'
import {
  useClonedChild,
} from './useClonedChild'
import {
  useUniqueId,
} from './useUniqueId'

export type HtmlInputValue = (
  InputHTMLAttributes<
    Element
  >['value']
)

export type PickerSelectorProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  translateProps?: (
    childProps: {
      isSelected: boolean,
      name: PickerContextProps['name'],
      onClick: () => void,
      role: PickerContextProps['optionType'],
      value: HtmlInputValue,
    }
  ) => (
    object
    | null
  ),
  value?: HtmlInputValue,
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
          name,
          onClick,
          role: optionType,
          value,
        })
        || {
          isSelected,
          name,
          onClick,
          role: optionType,
          value,
        }
      ),
      [
        isSelected,
        name,
        onClick,
        optionType,
        translateProps,
        value,
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
