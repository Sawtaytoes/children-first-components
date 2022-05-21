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
  VisibilityControlContext,
} from './VisibilityControlContext'
import {
  useSharedVisibilityContext,
  VisibilityContextKey,
} from './useSharedVisibilityContext'

export type UseVisibilityProps = {
  contextKey?: VisibilityContextKey,
  isVisible?: boolean,
  onChange?: (
    isVisible?: boolean,
  ) => (
    void
  ),
}

export const defaultProps = {
  isVisible: false,
  onChange: () => {},
}

export const useVisibility = ({
  contextKey,
  isVisible: isControlledVisible = (
    defaultProps
    .isVisible
  ),
  onChange = (
    defaultProps
    .onChange
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
    setSharedContext: setIsVisible,
    sharedContext: isVisible,
    sharedContextKey,
  } = (
    useSharedVisibilityContext({
      contextKey,
    })
  )

  useEffect(
    () => {
      setIsVisible(
        isControlledVisible,
      )
    },
    [
      isControlledVisible,
    ],
  )

  useEffect(
    () => {
      setIsVisible(
        selectedVisibilityContextKey
        === sharedContextKey
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
        const isNextVisible = (
          false
        )

        onChangeRef
        .current(
          isNextVisible
        )

        setIsVisible(
          isNextVisible
        )

        selectVisibilityContextKey(
          null
        )
      },
      [
        selectVisibilityContextKey,
        setIsVisible,
      ],
    )
  )

  const showVisibility = (
    useCallback(
      () => {
        const isNextVisible = (
          true
        )

        onChangeRef
        .current(
          isNextVisible
        )

        setIsVisible(
          isNextVisible
        )

        selectVisibilityContextKey(
          sharedContextKey
        )
      },
      [
        sharedContextKey,
        selectVisibilityContextKey,
        setIsVisible,
      ],
    )
  )

  const toggleVisibility = (
    useCallback(
      () => {
        setIsVisible((
          isCurrentlyVisible,
        ) => {
          const isNextVisible = (
            !isCurrentlyVisible
          )

          onChangeRef
          .current(
            isNextVisible
          )

          selectVisibilityContextKey(
            isNextVisible
            ? sharedContextKey
            : null
          )

          return (
            isNextVisible
          )
        })
      },
      [
        selectVisibilityContextKey,
        sharedContextKey,
      ],
    )
  )

  return {
    hideVisibility,
    isVisible,
    showVisibility,
    toggleVisibility,
    uniqueId,
  }
}
