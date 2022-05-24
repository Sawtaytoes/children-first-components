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
  AccessibleVisibilityContext,
} from './AccessibleVisibilityContext'
import {
  useAccessibleTarget,
} from './useAccessibleTarget'
import {
  useClonedChild,
} from './useClonedChild'
import {
  VisibilityContext,
} from './VisibilityContext'

export type VisibilityTargetProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  id?: (
    string
  ),
}

const VisibilityTarget: (
  FunctionComponent<
    VisibilityTargetProps
  >
) = ({
  children,
  id: idProp,
  ...otherProps
}) => {
  const {
    isVisible,
  } = (
    useContext(
      VisibilityContext
    )
  )

  const {
    id,
    triggerIds,
  } = (
    useAccessibleTarget(
      idProp
    )
  )

  const clonedChild = (
    useClonedChild(
      children,
      {
        ...otherProps,
        'aria-labelledby': triggerIds,
        id,
        isVisible,
      },
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
