import {
  createContext,
} from 'react'

import {
  VisibilityContextKey,
} from './useSharedVisibilityContext'

export type VisibilityControlContextProps = {
  selectedVisibilityKey: (
    | VisibilityContextKey
    | null
  ),
  selectVisibilityContextKey: (
    visibilityContextKey: (
      | VisibilityContextKey
      | null
    )
  ) => (
    void
  ),
}

export const defaultVisibilityControlContextValue: (
  VisibilityControlContextProps
) = {
  selectedVisibilityKey: null,
  selectVisibilityContextKey: () => {},
}

export const VisibilityControlContext = (
  createContext(
    defaultVisibilityControlContextValue
  )
)
