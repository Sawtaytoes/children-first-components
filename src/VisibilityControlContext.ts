import {
  SetStateAction,
  WritableAtom,
} from 'jotai'
import {
  createContext,
} from 'react'

import {
  VisibilityContextKey,
} from './VisibilityContext'

export type VisibilityControlContextId = (
  WritableAtom<
    string,
    (
      SetStateAction<
        string
      >
    ),
    void,
  >
)

export type VisibilityControlContextProps = {
  selectedVisibilityId: VisibilityContextKey | null,
  selectVisibilityId: () => void,
}

export const defaultVisibilityControlContextValue: (
  VisibilityControlContextProps
) = {
  selectVisibilityId: () => {},
  selectedVisibilityId: null,
}

export const VisibilityControlContext = (
  createContext(
    defaultVisibilityControlContextValue
  )
)
