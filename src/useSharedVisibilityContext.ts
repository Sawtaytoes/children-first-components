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

export type VisibilityContextKeyProps = {
  isVisibleAtom: (
    WritableAtom<
      VisibilityContextProps['isVisible'],
      (
        SetStateAction<
          VisibilityContextProps['isVisible']
        >
      ),
      void
    >
  ),
  targetIds: (
    WritableAtom<
      string[],
      (
        SetStateAction<
          string[]
        >
      ),
      void
    >
  ),
  triggerIds: (
    WritableAtom<
      string[],
      (
        SetStateAction<
          string[]
        >
      ),
      void
    >
  ),
}

export type VisibilityContextKey = (
  (
    WritableAtom<
      object,
      (
        SetStateAction<
          object
        >
      ),
      void
    >
  )
)

export const createVisibilityContextKey = () => (
  createAtom({
    isVisibleAtom: (
      createAtom(
        defaultVisibilityContextValue
        .isVisible
      )
    ),
    targetIdsAtom: (
      createAtom(
        []
      )
    ),
    triggerIdsAtom: (
      createAtom(
        []
      )
    ),
  }) as VisibilityContextKey
)

export const useSharedVisibilityContext = (
  createUseSharedContext<
    object
  >({
    createContextKey: (
      createVisibilityContextKey
    ),
  })
)
