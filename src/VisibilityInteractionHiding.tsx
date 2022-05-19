import {
  Children,
  cloneElement,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import {
  VisibilityContext,
} from './VisibilityContext'

export type VisibilityInteractionHidingProps = {
  isVisible: boolean,
}

const defaultProps = {
  isVisible: false,
}

const VisibilityInteractionHiding: (
  FunctionComponent<
    VisibilityInteractionHidingProps
  >
) = () => {
  const {
    hideVisibility,
  } = (
    useContext(
      VisibilityContext
    )
  )

  useEffect(
    () => {
      document
      .body
      .addEventListener(
        'click',
        hideVisibility,
        true,
      )

      return () => {
        document
        .body
        .removeEventListener(
          'click',
          hideVisibility,
          true,
        )
      }
    },
    [
      hideVisibility,
    ],
  )

  return (
    null
  )
}

const MemoizedVisibilityInteractionHiding = (
  memo(
    VisibilityInteractionHiding
  )
)

export {
  MemoizedVisibilityInteractionHiding as VisibilityInteractionHiding,
}