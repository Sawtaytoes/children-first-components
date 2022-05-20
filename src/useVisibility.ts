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
  VisibilityContextName,
} from './VisibilityContext'
// import {
//   useVisibilityAtom,
// } from './useVisibilityAtom'

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
  name?: VisibilityContextName,
  onVisibilityChange?: (
    visibility?: Visibilities,
  ) => (
    void
  ),
  visibility?: Visibilities,
}

export const useVisibility = ({
  name,
  onVisibilityChange,
  visibility,
}: (
  UseVisibilityProps
)) => {
  // const [
  //   globalVisibility,
  //   setGlobalVisibility,
  // ] = (
  //   useVisibilityAtom(
  //     name
  //   )
  // )

  const uniqueId = (
    useMemo(
      () => (
        name
        || createRandomString()
      ),
      [
        name,
      ],
    )
  )

  const [
    localVisibility,
    setLocalVisibility,
  ] = (
    useState(
      visibility
    )
  )

  useEffect(
    () => {
      setLocalVisibility(
        visibility
      )
    },
    [
      visibility,
    ],
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

        setLocalVisibility(
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

        setLocalVisibility(
          nextVisibility
        )
      },
      [],
    )
  )

  const toggleVisibility = (
    useCallback(
      () => {
        setLocalVisibility((
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

  // useEffect(
  //   () => {
  //     setLocalVisibility(
  //       globalVisibility,
  //     )
  //   },
  //   [
  //     globalVisibility,
  //   ],
  // )

  // useEffect(
  //   () => {
  //     setGlobalVisibility(
  //       localVisibility,
  //     )
  //   },
  //   [
  //     localVisibility,
  //   ],
  // )

  return {
    hideVisibility,
    showVisibility,
    toggleVisibility,
    uniqueId,
    visibility: localVisibility,
  }
}
