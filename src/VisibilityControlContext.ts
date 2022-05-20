import {
  SetStateAction,
  WritableAtom,
} from 'jotai'
import {
  createContext,
} from 'react'

import {
  VisibilityContextId,
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
  selectedVisibilityId: VisibilityContextId | null,
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
