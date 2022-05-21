import {
  atom as createAtom,
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
  VisibilityContextId,
} from './VisibilityContext'

export const JotaiVisibilityScope = Symbol()

export const createVisibilityContextId = () => (
  createAtom(
    Visibilities
    .invisible
  ) as VisibilityContextId
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
  contextId?: VisibilityContextId,
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
  contextId: syncedAtom,
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
  const fallbackAtom = (
    useMemo(
      () => (
        createVisibilityContextId()
      ),
      [],
    )
  )

  const sharedAtom = (
    useMemo(
      () => (
        syncedAtom
        || fallbackAtom
      ),
      [
        syncedAtom,
        fallbackAtom,
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

        onChange(
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

        onChange(
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
    visibility: globalVisibility,
  }
}
