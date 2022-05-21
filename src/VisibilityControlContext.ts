import {
  createContext,
} from 'react'

import {
  VisibilityContextKey,
} from './useSharedVisibilityContext'

export type VisibilityControlContextProps = {
  selectedVisibilityContextKey: (
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
  selectedVisibilityContextKey: null,
  selectVisibilityContextKey: () => {},
}

export const VisibilityControlContext = (
  createContext(
    defaultVisibilityControlContextValue
  )
)
