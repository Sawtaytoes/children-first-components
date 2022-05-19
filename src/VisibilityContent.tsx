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

export type VisibilityContentProps = {
  isVisible: boolean,
}

const defaultProps = {
  isVisible: false,
}

const VisibilityContent: (
  FunctionComponent<
    VisibilityContentProps
  >
) = ({
  isVisible,
}) => (
  isVisible
  ? children
  : null
)

const MemoizedVisibilityContent = (
  memo(
    VisibilityContent
  )
)

export {
  MemoizedVisibilityContent as VisibilityContent,
}
