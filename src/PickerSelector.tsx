import {
  Fragment,
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

export type HtmlInputValue = (
  InputHTMLAttributes<
    Element
  >['value']
)

export type PickerSelectorChildProps = {
  isSelected: boolean,
  name: PickerContextProps['name'],
  optionType: PickerContextProps['optionType'],
  selectOption: () => void,
  value: HtmlInputValue,
}

export type PickerSelectorProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  translateProps?: (
    childProps: PickerSelectorChildProps,
  ) => (
    object
    | null
  ),
  value?: HtmlInputValue,
}

const defaultProps = {
  translateProps: (
    props: PickerSelectorChildProps,
  ) => (
    props
  ),
  value: '',
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
    >(
      null
    )
  )

  const selectOption = (
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
          optionType,
          selectOption,
          value,
        })
      ),
      [
        isSelected,
        name,
        optionType,
        selectOption,
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
    <Fragment>
      {clonedChild}

      <input
        checked={isSelected}
        hidden
        name={name}
        onChange={onChange}
        ref={inputRef}
        type={optionType}
        value={value}
      />
    </Fragment>
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
