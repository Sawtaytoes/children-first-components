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
  useAccessibleTrigger,
} from './useAccessibleTrigger'
import {
  useClonedChild,
} from './useClonedChild'
import {
  VisibilityContextKey,
} from './useSharedVisibilityContext'
import {
  useVisibility,
} from './useVisibility'
import {
  VisibilityContext,
} from './VisibilityContext'

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
  id?: (
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
  id: idProp,
  linkedContextKey,
  ...otherProps
}) => {
  const {
    isVisible,
    toggle,
  } = (
    useContext(
      VisibilityContext
    )
  )

  const {
    id,
    targetIds,
  } = (
    useAccessibleTrigger(
      idProp
    )
  )

  const {
    toggle: toggleLinked,
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

        toggle()

        if (linkedContextKey) {
          toggleLinked()
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
        toggle,
        toggleLinked,
      ],
    )
  )

  const clonedChild = (
    useClonedChild(
      children,
      {
        ...otherProps,
        [eventName]: onAction,
        'aria-controls': targetIds,
        'aria-expanded': isVisible,
        id,
      },
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
