import {
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useContext,
} from 'react'

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

const VisibilityTarget = ({
  children,
  id: idProp,
  ...otherProps
}: (
  VisibilityTargetProps
)) => {
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
