import {
  atom as createAtom,
  SetStateAction,
  WritableAtom,
} from 'jotai'

import {
  createUseSharedContext,
} from './createUseSharedContext'
import {
  Visibilities,
} from './VisibilityContext'

export type VisibilityContextKey = (
  (
    WritableAtom<
      Visibilities,
      (
        SetStateAction<
          Visibilities
        >
      ),
      void
    >
  )
)

export const createVisibilityContextKey = () => (
  createAtom(
    Visibilities
    .invisible
  ) as VisibilityContextKey
)

export const useSharedVisibilityContext = (
  createUseSharedContext<
    Visibilities
  >({
    createContextKey: (
      createVisibilityContextKey
    ),
  })
)
