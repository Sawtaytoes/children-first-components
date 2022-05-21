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
import {
  defaultVisibilityControlContextValue,
  VisibilityControlContextProps,
} from './VisibilityControlContext'

export type VisibilityControlContextKey = (
  WritableAtom<
    (
      VisibilityControlContextProps['selectedVisibilityContextKey']
    ),
    (
      SetStateAction<
        VisibilityControlContextProps['selectedVisibilityContextKey']
      >
    ),
    void
  >
)

export const createVisibilityControlContextKey = () => (
  createAtom(
    defaultVisibilityControlContextValue
    .selectedVisibilityContextKey
  ) as VisibilityControlContextKey
)

export const useSharedVisibilityControlContext = (
  createUseSharedContext<
    VisibilityControlContextProps['selectedVisibilityContextKey']
  >({
    createContextKey: (
      createVisibilityControlContextKey
    ),
  })
)
