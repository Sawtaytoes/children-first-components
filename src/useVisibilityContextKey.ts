import {
  atom as createAtom,
  SetStateAction,
  WritableAtom,
} from 'jotai'
import {
  useMemo,
} from 'react'

import {
  Visibilities,
} from './VisibilityContext'

export type VisibilityContextKey = (
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

export const createVisibilityContextKey = () => (
  createAtom(
    Visibilities
    .invisible
  ) as VisibilityContextKey
)

export const useVisibilityContextKey = () => (
  useMemo(
    () => (
      createVisibilityContextKey()
    ),
    [],
  )
)
