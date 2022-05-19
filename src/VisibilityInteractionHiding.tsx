import {
  FunctionComponent,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react'

import {
  Visibilities,
  VisibilityContext,
} from './VisibilityContext'

export type VisibilityInteractionHidingProps = {
  children: ReactNode,
  eventType: string,
}

const defaultProps = {
  eventType: 'click',
}

const VisibilityInteractionHiding: (
  FunctionComponent<
    VisibilityInteractionHidingProps
  >
) = ({
  children,
  eventType = (
    defaultProps
    .eventType
  ),
}) => {
  const domElementRef = (
    useRef<
      HTMLDivElement
    >()
  )

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

      const domElement = (
        domElementRef
        .current
      )

      domElement
      .addEventListener(
        eventType,
        hideVisibility,
        {
          once: true,
        },
      )

      return () => {
        domElement
        .removeEventListener(
          eventType,
          hideVisibility,
        )
      }
    },
    [
      eventType,
      hideVisibility,
      visibility,
    ],
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

      document
      .body
      .addEventListener(
        'keydown',
        onKeyDown,
      )

      return () => {
        document
        .body
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
    <div ref={domElementRef}>
      {children}
    </div>
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
