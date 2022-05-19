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
  isVisible?: boolean,
}

const defaultProps = {
  isVisible: false,
}

const VisibilityContent: (
  FunctionComponent<
    VisibilityContentProps
  >
) = ({
  children,
  isVisible = (
    defaultProps
    .isVisible
  ),
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
