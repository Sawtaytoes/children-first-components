import {
  FunctionComponent,
  memo,
  useContext,
  useEffect,
} from 'react'

import {
  Visibilities,
  VisibilityContext,
} from './VisibilityContext'


const HideOnEscapeKey: (
  FunctionComponent
) = () => {
  const {
    hide,
    isVisible,
  } = (
    useContext(
      VisibilityContext
    )
  )

  useEffect(
    () => {
      if (
        !isVisible
      ) {
        return
      }

      const onKeyDown = (
        {
          code,
        }: (
          KeyboardEvent
        )
      ) => {
        if (code === 'Escape') {
          hide()
        }
      }

      window
      .addEventListener(
        'keydown',
        onKeyDown,
      )

      return () => {
        window
        .removeEventListener(
          'keydown',
          onKeyDown,
        )
      }
    },
    [
      hide,
      isVisible,
    ],
  )

  return (
    null
  )
}

const MemoizedHideOnEscapeKey = (
  memo(
    HideOnEscapeKey
  )
)

export {
  MemoizedHideOnEscapeKey as HideOnEscapeKey,
}
