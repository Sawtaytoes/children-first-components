import {
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'

import {
  useScopedAtom,
} from './useScopedAtom'
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
  isVisible: isVisibleProp = (
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
    sharedContext,
    sharedContextKey,
  } = (
    useSharedVisibilityContext({
      contextKey,
    })
  )

  const [
    isVisible,
    setIsVisible,
  ] = (
    useScopedAtom(
      sharedContext
      .isVisibleAtom
    )
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

  const toggle = (
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
    toggle,
  }
}
