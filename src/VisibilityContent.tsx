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
  hidden?: boolean,
}

const defaultProps = {
  fallback: null,
  hidden: false,
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
  hidden = (
    defaultProps
    .hidden
  ),
}) => (
  hidden
  ? fallback
  : children
)

const MemoizedVisibilityContent = (
  memo(
    VisibilityContent
  )
)

export {
  MemoizedVisibilityContent as VisibilityContent,
}
