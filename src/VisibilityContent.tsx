import {
  FunctionComponent,
  memo,
  ReactNode,
  useContext,
} from 'react'

import {
  VisibilityContext,
} from './VisibilityContext'

export type VisibilityContentProps = {
  children: ReactNode,
  fallback: ReactNode,
  isVisible?: boolean,
}

const defaultProps = {
  fallback: null,
  isVisible: false,
}

const VisibilityContent: (
  FunctionComponent<
    VisibilityContentProps
  >
) = ({
  children,
  fallback = (
    defaultProps
    .fallback
  ),
  isVisible = (
    defaultProps
    .isVisible
  ),
}) => (
  isVisible
  ? children
  : fallback
)

const MemoizedVisibilityContent = (
  memo(
    VisibilityContent
  )
)

export {
  MemoizedVisibilityContent as VisibilityContent,
}
