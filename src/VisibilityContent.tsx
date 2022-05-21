import {
  Fragment,
  FunctionComponent,
  memo,
  ReactNode,
} from 'react'

export type VisibilityContentProps = {
  children: ReactNode,
  fallback?: ReactNode,
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
  <Fragment>
    {
      isVisible
      ? children
      : fallback
    }
  </Fragment>
)

const MemoizedVisibilityContent = (
  memo(
    VisibilityContent
  )
)

export {
  MemoizedVisibilityContent as VisibilityContent,
}
