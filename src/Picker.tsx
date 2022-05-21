import {
  Children,
  cloneElement,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export const useUniqueId = (
  {
    prefix = '',
  } = {}
) => {
  const uniqueId = (
    useMemo(
      () => (
        prefix
        .replace(
          ' ',
          '_',
        )
        .concat(
          '-',
          (
            Math
            .random()
          )
        )
      ),
      [
        prefix,
      ],
    )
  )

  return uniqueId
}

const PickerContext = (
  createContext({
    onChange: () => {},
    optionType: '',
    selectedValue: '',
  })
)

const optionTypes = {
  multiple: 'checkbox',
  single: 'radio',
}

const defaultPickerProviderProps = {
  onChange: () => {},
  optionType: '',
  selectionType: '',
  value: '',
}

const PickerProvider = ({
  children,
  onChange = (
    defaultPickerProviderProps
    .onChange
  ),
  selectionType = (
    defaultPickerProviderProps
    .selectionType
  ),
  value = (
    defaultPickerProviderProps
    .value
  )
}) => {
  const providerValue = (
    useMemo(
      () => ({
        onChange,
        optionType: (
          optionTypes
          [selectionType]
        ),
        selectedValue: value,
      }),
      [
        onChange,
        selectionType,
        value,
      ],
    )
  )
() => {}
  return (
    <PickerContext.Provider
      value={providerValue}
    >
      {children}
    </PickerContext.Provider>
  )
}

const MemoizedPickerProvider = memo(PickerProvider)

export { MemoizedPickerProvider as PickerProvider }

const defaultPickerSelectorProps = {
  translateProps: (
    value,
  ) => (
    value
  ),
  value: '',
}

const PickerSelector = ({
  children,
  translateProps = (
    defaultPickerSelectorProps
    .translateProps
  ),
  value = (
    defaultPickerSelectorProps
    .value
  ),
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

  const childProps = (
    useMemo(
      () => (
        translateProps({
          isSelected,
          role: optionType,
        })
      ),
      [
        isSelected,
        optionType,
        translateProps,
      ],
    )
  )

  return (
    <label htmlFor={inputId}>
      <input
        aria-label={value}
        checked={isSelected}
        hidden
        id={inputId}
        onChange={onChange}
        type={optionType}
        value={value}
      />

      {
        cloneElement(
          (
            Children
            .only(
              children
            )
          ),
          childProps,
        )
      }
    </label>
  )
}

const MemoizedPickerSelector = memo(PickerSelector)

export { MemoizedPickerSelector as PickerSelector }

const translateToHtmlProps = ({
  isSelected,
  ...otherProps
}) => ({
  ...otherProps,
  'data-selected': isSelected,
})

const HtmlPickerSelector = (
  pickerSelectorProps
) => (
  <PickerSelector
    {...pickerSelectorProps}
    translateProps={translateToHtmlProps}
  />
)

const MemoizedHtmlPickerSelector = memo(HtmlPickerSelector)

export { MemoizedHtmlPickerSelector as HtmlPickerSelector }

const StyledOption = ({
  children,
  isSelected = false,
  role = '',
}) => {
  const styles = (
    useMemo(
      () => ({
        backgroundColor: (
          isSelected
          ? 'green'
          : 'white'
        ),
        border: '1px solid black',
        cursor: 'pointer',
        display: 'inline-block',
        padding: '10px',
        userSelect: 'none',
      }),
      [
        isSelected,
      ],
    )
  )

  return (
    <span
      aria-checked={isSelected}
      role={role}
      style={styles}
    >
      {children}
    </span>
  )
}

const MemoizedStyledOption = memo(StyledOption)

export { MemoizedStyledOption as StyledOption }

// This hook is optional if you don't have a form state manager like OneForm.
export const usePickerSelection = (
  {
    value,
  } = {}
) => {
  const [
    localValue,
    setLocalValue,
  ] = (
    useState(
      value
    )
  )

  useEffect(
    () => {
      setLocalValue(
        value
      )
    },
    [
      value,
    ],
  )

  const onChange = (
    useCallback(
      (
        event,
      ) => {
        const {
          checked: isChecked,
          type: targetType,
          value: targetValue,
        } = (
          event
          .currentTarget
        )

        if (
          targetType
          === 'checkbox'
        ) {
          setLocalValue((
            localValue = [],
          ) => (
            isChecked
            ? (
              localValue
              .concat(
                targetValue
              )
            )
            : (
              localValue
              .filter((
                subValue,
              ) => (
                subValue
                !== targetValue
              ))
            )
          ))
        }
        else if (
          targetType
          === 'radio'
        ) {
          setLocalValue(
            targetValue
          )
        }
      },
      [],
    )
  )

  return {
    onChange,
    value: localValue,
  }
}
