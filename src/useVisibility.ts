import {
  atom,
  useAtom,
} from 'jotai'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  createRandomString,
} from './createRandomString'
import {
  Visibilities,
  VisibilityContextId,
} from './VisibilityContext'
// import {
//   useVisibilityAtom,
// } from './useVisibilityAtom'

export const JotaiVisibilityScope = Symbol()

export const createVisibilityId = () => (
  atom(
    Visibilities
    .invisible
  )
)

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
  id?: VisibilityContextId,
  onVisibilityChange?: (
    visibility?: Visibilities,
  ) => (
    void
  ),
  visibility?: Visibilities,
}

const defaultProps = {
  onVisibilityChange: () => {},
  visibility: (
    Visibilities
    .invisible
  ),
}

export const useVisibility = ({
  id: createdAtom,
  onVisibilityChange = (
    defaultProps
    .onVisibilityChange
  ),
  visibility = (
    defaultProps
    .visibility
  ),
}: (
  UseVisibilityProps
)) => {
  const uniqueAtom = (
    useMemo(
      () => (
        createVisibilityId()
      ),
      [],
    )
  )

  const sharedAtom = (
    useMemo(
      () => (
        createdAtom
        || uniqueAtom
      ),
      [
        createdAtom,
        uniqueAtom,
      ],
    )
  )

  const [
    globalVisibility,
    setGlobalVisibility,
  ] = (
    useAtom(
      sharedAtom,
      JotaiVisibilityScope,
    )
  )

  useEffect(
    () => {
      setGlobalVisibility(
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

        onVisibilityChange(
          nextVisibility
        )

        setGlobalVisibility(
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

        onVisibilityChange(
          nextVisibility
        )

        setGlobalVisibility(
          nextVisibility
        )
      },
      [],
    )
  )

  const toggleVisibility = (
    useCallback(
      () => {
        setGlobalVisibility((
          currentVisibility,
        ) => {
          const nextVisibility = (
            toggledVisibility
            [currentVisibility]
          )

          onVisibilityChange(
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
    visibility: globalVisibility,
  }
}
