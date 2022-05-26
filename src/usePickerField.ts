import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react'

// This hook is optional if you don't have a form state manager like OneForm.
export const usePickerField = (
  value: (
    InputHTMLAttributes<
      Element
    >['value']
  ),
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
        event: (
          ChangeEvent<
            HTMLInputElement
          >
        ),
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
