import {
  SetStateAction,
  useCallback,
} from 'react'

export const useRegisterItem = (
  setItems: (
    SetStateAction<
      any
    >
  ),
) => (
  useCallback(
    (
      item: any,
    ) => {
      setItems((
        items: any[],
      ) => (
        items
        .concat(
          item
        )
      ))

      return () => {
        setItems((
          items: any[],
        ) => (
          items
          .filter((
            existingItem,
          ) => (
            existingItem
            !== item
          ))
        ))
      }
    },
    [
      setItems,
    ],
  )
)
