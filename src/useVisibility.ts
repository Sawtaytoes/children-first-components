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
import {
  useUniqueId,
} from './useUniqueId'

export type UseVisibilityProps = {
  contextKey?: VisibilityContextKey,
  isVisible?: boolean,
  name?: string,
  onChange?: (
    isVisible?: boolean,
  ) => (
    void
  ),
}

export const defaultProps = {
  isVisible: false,
  name: '',
  onChange: () => {},
}

export const useVisibility = ({
  contextKey,
  isVisible: isVisibleProp = (
    defaultProps
    .isVisible
  ),
  name = (
    defaultProps
    .name
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

  const uniqueId = (
    useUniqueId(
      name
    )
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
        isVisibleProp,
      )
    },
    [
      isVisibleProp,
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

  const hide = (
    useCallback(
      () => {
        const isVisibleAfter = (
          false
        )

        onChangeRef
        .current(
          isVisibleAfter
        )

        setIsVisible(
          isVisibleAfter
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

  const show = (
    useCallback(
      () => {
        const isVisibleAfter = (
          true
        )

        onChangeRef
        .current(
          isVisibleAfter
        )

        setIsVisible(
          isVisibleAfter
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
          isVisibleBefore,
        ) => {
          const isVisibleAfter = (
            !isVisibleBefore
          )

          onChangeRef
          .current(
            isVisibleAfter
          )

          selectVisibilityContextKey(
            isVisibleAfter
            ? sharedContextKey
            : null
          )

          return (
            isVisibleAfter
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
    hide,
    isVisible,
    show,
    toggleVisibility,
    uniqueId,
  }
}
