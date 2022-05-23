import {
  Children,
  cloneElement,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from 'react'

import {
  VisibilityContext,
} from './VisibilityContext'
import {
  useVisibility,
} from './useVisibility'
import {
  VisibilityContextKey,
} from './useSharedVisibilityContext'

export type VisibilityTriggerProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  eventName?: (
    string
  ),
  linkedContextKey?: (
    VisibilityContextKey
  ),
}

const defaultProps = {
  eventName: 'onClick',
}

const VisibilityTrigger: (
  FunctionComponent<
    VisibilityTriggerProps
  >
) = ({
  children,
  eventName = (
    defaultProps
    .eventName
  ),
  linkedContextKey,
  ...otherProps
}) => {
  const {
    contentId,
    isVisible,
    toggleVisibility,
    triggerId,
  } = (
    useContext(
      VisibilityContext
    )
  )

  const {
    toggleVisibility: toggleNextVisibility,
  } = (
    useVisibility({
      contextKey: linkedContextKey
    })
  )

  const onAction = (
    useCallback(
      (
        ...args: unknown[]
      ) => {
        /* @ts-ignore */
        children
        .props
        [eventName]?.(
          ...args
        )

        toggleVisibility()

        if (linkedContextKey) {
          toggleNextVisibility()
        }
      },
      [
        (
          /* @ts-ignore */
          children
          .props
          [eventName]
        ),
        linkedContextKey,
        toggleVisibility,
        toggleNextVisibility,
      ],
    )
  )

  const childProps = (
    useMemo(
      () => ({
        ...otherProps,
        [eventName]: onAction,
        'aria-controls': contentId,
        'aria-expanded': isVisible,
        id: triggerId,
        role: 'button',
      }),
      [
        contentId,
        eventName,
        isVisible,
        onAction,
        otherProps,
        triggerId,
      ],
    )
  )

  const clonedChild = (
    useMemo(
      () => (
        cloneElement(
          (
            Children
            .only(
              children
            )
          ),
          childProps,
        )
      ),
      [
        children,
        childProps,
      ],
    )
  )

  return (
    clonedChild
  )
}

const MemoizedVisibilityTrigger = (
  memo(
    VisibilityTrigger
  )
)

export {
  MemoizedVisibilityTrigger as VisibilityTrigger,
}
