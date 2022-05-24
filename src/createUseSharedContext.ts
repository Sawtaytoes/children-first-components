import {
  SetStateAction,
  useAtom,
  WritableAtom,
} from 'jotai'
import {
  useMemo,
} from 'react'

import {
  useScopedAtom,
} from './useScopedAtom'

export const createUseSharedContext = <
  ContextValue,
>({
  createContextKey,
}: {
  createContextKey: () => (
    WritableAtom<
      ContextValue,
      (
        SetStateAction<
          ContextValue
        >
      ),
      void
    >
  ),
}) => ({
  contextKey,
}: {
  contextKey: (
    | (
      WritableAtom<
        ContextValue,
        (
          SetStateAction<
            ContextValue
          >
        ),
        void
      >
    )
    | undefined
  ),
}) => {
  const fallbackContextKey = (
    useMemo(
      () => (
        createContextKey()
      ),
      [
        createContextKey,
      ],
    )
  )

  // This needs to be exported as well as being used by the atom.
  const sharedContextKey = (
    useMemo(
      () => (
        contextKey
        || fallbackContextKey
      ),
      [
        contextKey,
        fallbackContextKey,
      ],
    )
  )

  const [
    sharedContext,
    setSharedContext,
  ] = (
    useScopedAtom(
      sharedContextKey,
    )
  )

  return {
    setSharedContext,
    sharedContext,
    sharedContextKey,
  }
}
