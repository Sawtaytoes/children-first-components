import {
  atom as createAtom,
  SetStateAction,
  WritableAtom,
} from 'jotai'
import {
  useMemo,
} from 'react'

import {
  createUseSharedContext,
} from './createUseSharedContext'
import {
  VisibilityContextKey,
} from './useSharedVisibilityContext'

export type VisibilityControlContextKey = (
  WritableAtom<
    (
      | VisibilityContextKey
      | null
    ),
    (
      SetStateAction<
        | VisibilityContextKey
        | null
      >
    ),
    void
  >
)

export const createVisibilityControlContextKey = () => (
  createAtom(
    null
  ) as VisibilityControlContextKey
)

export const useSharedVisibilityControlContext = (
  createUseSharedContext<
    | VisibilityContextKey
    | null
  >({
    createContextKey: (
      createVisibilityControlContextKey
    ),
  })
)
