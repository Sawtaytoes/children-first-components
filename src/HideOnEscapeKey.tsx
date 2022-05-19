import {
  FunctionComponent,
  memo,
  ReactNode,
  useContext,
  useEffect,
} from 'react'

import {
  Visibilities,
  VisibilityContext,
} from './VisibilityContext'

export type HideOnEscapeKeyProps = {
  children: ReactNode,
  eventType: string,
}

const HideOnEscapeKey: (
  FunctionComponent<
    HideOnEscapeKeyProps
  >
) = ({
  children,
}) => {
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

      const onKeyDown = ({
        code,
      }) => {
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
