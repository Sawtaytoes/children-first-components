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
  VisibilityContext,
  VisibilityContextProps,
} from './VisibilityContext'

export type VisibilityTargetProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
}

const VisibilityTarget: (
  FunctionComponent<
    VisibilityTargetProps
  >
) = ({
  children,
  ...otherProps
}) => {
  const {
    contentId,
    isVisible,
    triggerId,
  } = (
    useContext(
      VisibilityContext
    )
  )

  const childProps = (
    useMemo(
      () => ({
        ...otherProps,
        'aria-labelledby': triggerId,
        id: contentId,
        isVisible,
      }),
      [
        contentId,
        isVisible,
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

const MemoizedVisibilityTarget = (
  memo(
    VisibilityTarget
  )
)

export {
  MemoizedVisibilityTarget as VisibilityTarget,
}
