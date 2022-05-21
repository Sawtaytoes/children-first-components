import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import {
  VisibilityContextKey,
} from './useSharedVisibilityContext'
import {
  useSharedVisibilityControlContext,
  VisibilityControlContextKey,
} from './useSharedVisibilityControlContext'

export type UseVisibilityControlProps = {
  contextKey?: VisibilityControlContextKey,
  onChange?: (
    selectedVisibilityContextKey?: (
      | VisibilityContextKey
      | null
    ),
  ) => (
    void
  ),
  selectedVisibilityContextKey?: (
    | VisibilityContextKey
    | null
  ),
}

const defaultProps = {
  onChange: () => {},
  selectedVisibilityContextKey: (
    null
  ),
}

export const useVisibilityControl = ({
  contextKey,
  onChange = (
    defaultProps
    .onChange
  ),
  selectedVisibilityContextKey = (
    defaultProps
    .selectedVisibilityContextKey
  ),
}: (
  UseVisibilityControlProps
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
    setSharedContext: setSharedSelectedVisibilityContextKey,
    sharedContext: sharedSelectedVisibilityContextKey,
  } = (
    useSharedVisibilityControlContext({
      contextKey,
    })
  )

  useEffect(
    () => {
      setSharedSelectedVisibilityContextKey(
        selectedVisibilityContextKey,
      )
    },
    [
      selectedVisibilityContextKey,
      setSharedSelectedVisibilityContextKey,
    ],
  )

  useEffect(
    () => {
      setSharedSelectedVisibilityContextKey(
        sharedSelectedVisibilityContextKey,
      )
    },
    [
      sharedSelectedVisibilityContextKey,
      setSharedSelectedVisibilityContextKey,
    ],
  )

  const selectVisibilityContextKey = (
    useCallback(
      (
        visibilityContextKey: (
          | VisibilityContextKey
          | null
        )
      ) => {
        onChangeRef
        .current(
          visibilityContextKey
        )

        setSharedSelectedVisibilityContextKey(
          visibilityContextKey
        )
      },
      [
        setSharedSelectedVisibilityContextKey,
      ],
    )
  )

  return {
    selectedVisibilityContextKey: sharedSelectedVisibilityContextKey,
    selectVisibilityContextKey,
  }
}
