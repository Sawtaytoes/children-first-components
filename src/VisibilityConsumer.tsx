import {
  Children,
  cloneElement,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useContext,
  useMemo,
} from 'react'

import {
  useClonedChild,
} from './useClonedChild'
import {
  VisibilityContext,
  VisibilityContextProps,
} from './VisibilityContext'

export type VisibilityChildProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  translateProps?: (
    childProps: VisibilityContextProps
  ) => (
    object
    | null
  ),
}

const defaultProps = {
  translateProps: () => (
    null
  ),
}

const VisibilityConsumer: (
  FunctionComponent<
    VisibilityChildProps
  >
) = ({
  children,
  translateProps = (
    defaultProps
    .translateProps
  ),
  ...otherProps
}) => {
  const visibilityContext = (
    useContext(
      VisibilityContext
    )
  )

  const translatedProps = (
    useMemo(
      () => (
        translateProps(
          visibilityContext
        )
      ),
      [
        translateProps,
        visibilityContext,
      ],
    )
  )

  const clonedChild = (
    useClonedChild(
      children,
      {
        ...otherProps,
        ...translatedProps,
      },
    )
  )

  return (
    clonedChild
  )
}

const MemoizedVisibilityConsumer = (
  memo(
    VisibilityConsumer
  )
)

export {
  MemoizedVisibilityConsumer as VisibilityConsumer,
}
