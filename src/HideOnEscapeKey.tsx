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
    hideVisibility,
    visibility,
  } = (
    useContext(
      VisibilityContext
    )
  )

  useEffect(
    () => {
      if (
        visibility
        === (
          Visibilities
          .invisible
        )
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
          hideVisibility()
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
      hideVisibility,
      visibility,
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
