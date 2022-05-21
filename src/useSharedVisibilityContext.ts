import {
  atom as createAtom,
  SetStateAction,
  WritableAtom,
} from 'jotai'

import {
  createUseSharedContext,
} from './createUseSharedContext'
import {
  defaultVisibilityContextValue,
  VisibilityContextProps,
} from './VisibilityContext'

export type VisibilityContextKey = (
  (
    WritableAtom<
      VisibilityContextProps['isVisible'],
      (
        SetStateAction<
          VisibilityContextProps['isVisible']
        >
      ),
      void
    >
  )
)

export const createVisibilityContextKey = () => (
  createAtom(
    defaultVisibilityContextValue
    .isVisible
  ) as VisibilityContextKey
)

export const useSharedVisibilityContext = (
  createUseSharedContext<
    VisibilityContextProps['isVisible']
  >({
    createContextKey: (
      createVisibilityContextKey
    ),
  })
)
