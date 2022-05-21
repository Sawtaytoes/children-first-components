import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import {
  createRandomString,
} from './createRandomString'
import {
  Visibilities,
} from './VisibilityContext'
import {
  VisibilityControlContext,
} from './VisibilityControlContext'
import {
  useSharedVisibilityContext,
  VisibilityContextKey,
} from './useSharedVisibilityContext'

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
  const onChangeRef = (
    useRef(
      onChange
    )
  )

  useEffect(
    () => {
      onChangeRef
      .current = (
        onChange
      )
    },
    [
      onChange,
    ],
  )

  const {
    selectedVisibilityContextKey,
    selectVisibilityContextKey,
  } = (
    useContext(
      VisibilityControlContext
    )
  )

  const {
    setSharedContext: setSharedVisibility,
    sharedContext: sharedVisibility,
    sharedContextKey,
  } = (
    useSharedVisibilityContext({
      contextKey,
    })
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

  useEffect(
    () => {
      setSharedVisibility(
        (
          selectedVisibilityContextKey
          === sharedContextKey
        )
        ? (
          Visibilities
          .visible
        )
        : (
          Visibilities
          .invisible
        )
      )
    },
    [
      sharedContextKey,
      selectedVisibilityContextKey,
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

        onChangeRef
        .current(
          nextVisibility
        )

        selectVisibilityContextKey(
          null
        )

        setSharedVisibility(
          nextVisibility
        )
      },
      [
        selectVisibilityContextKey,
        setSharedVisibility,
      ],
    )
  )

  const showVisibility = (
    useCallback(
      () => {
        const nextVisibility = (
          Visibilities
          .visible
        )

        onChangeRef
        .current(
          nextVisibility
        )

        selectVisibilityContextKey(
          sharedContextKey
        )

        setSharedVisibility(
          nextVisibility
        )
      },
      [
        sharedContextKey,
        selectVisibilityContextKey,
        setSharedVisibility,
      ],
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

          onChangeRef
          .current(
            nextVisibility
          )

          selectVisibilityContextKey(
            (
              nextVisibility
              === (
                Visibilities
                .visible
              )
            )
            ? sharedContextKey
            : null
          )

          return (
            nextVisibility
          )
        })
      },
      [
        sharedContextKey,
        selectVisibilityContextKey,
        setSharedVisibility,
      ],
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
