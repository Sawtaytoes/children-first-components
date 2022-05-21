import {
  useAtom,
} from 'jotai'
import {
  useCallback,
  useEffect,
  useMemo,
} from 'react'

import {
  createRandomString,
} from './createRandomString'
import {
  Visibilities,
} from './VisibilityContext'
import {
  useVisibilityContextKey,
  VisibilityContextKey,
} from './useVisibilityContextKey'

export const JotaiVisibilityScope = Symbol()

const toggledVisibility = {
  [
    Visibilities
    .invisible
  ]: (
    Visibilities
    .visible
  ),
  [
    Visibilities
    .none
  ]: (
    Visibilities
    .none
  ),
  [
    Visibilities
    .visible
  ]: (
    Visibilities
    .invisible
  ),
}

export type UseVisibilityProps = {
  contextKey?: VisibilityContextKey,
  onChange?: (
    visibility?: Visibilities,
  ) => (
    void
  ),
  visibility?: Visibilities,
}

const defaultProps = {
  onChange: () => {},
  visibility: (
    Visibilities
    .invisible
  ),
}

export const useVisibility = ({
  contextKey,
  onChange = (
    defaultProps
    .onChange
  ),
  visibility = (
    defaultProps
    .visibility
  ),
}: (
  UseVisibilityProps
)) => {
  const fallbackContextKey = (
    useVisibilityContextKey()
  )

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
    sharedVisibility,
    setSharedVisibility,
  ] = (
    useAtom(
      sharedContextKey,
      JotaiVisibilityScope,
    )
  )

  useEffect(
    () => {
      setSharedVisibility(
        visibility,
      )
    },
    [
      visibility,
    ],
  )

  const uniqueId = (
    useMemo(
      () => (
        createRandomString()
      ),
      [],
    )
  )

  const hideVisibility = (
    useCallback(
      () => {
        const nextVisibility = (
          Visibilities
          .invisible
        )

        onChange(
          nextVisibility
        )

        setSharedVisibility(
          nextVisibility
        )
      },
      [],
    )
  )

  const showVisibility = (
    useCallback(
      () => {
        const nextVisibility = (
          Visibilities
          .visible
        )

        onChange(
          nextVisibility
        )

        setSharedVisibility(
          nextVisibility
        )
      },
      [],
    )
  )

  const toggleVisibility = (
    useCallback(
      () => {
        setSharedVisibility((
          currentVisibility,
        ) => {
          const nextVisibility = (
            toggledVisibility
            [currentVisibility]
          )

          onChange(
            nextVisibility
          )

          return (
            nextVisibility
          )
        })
      },
      [],
    )
  )

  return {
    hideVisibility,
    showVisibility,
    toggleVisibility,
    uniqueId,
    visibility: sharedVisibility,
  }
}
