import {
  FunctionComponent,
  memo,
  ReactNode,
} from 'react'

export type HtmlContentProps = {
  children: ReactNode,
  isVisible?: boolean,
  onClick?: () => void,
}

const defaultProps = {
  isVisible: false,
  onClick: () => {},
}

const HtmlContent: (
  FunctionComponent<
    HtmlContentProps
  >
) = ({
  children,
  isVisible = (
    defaultProps
    .isVisible
  ),
  onClick = (
    defaultProps
    .onClick
  ),
  ...otherProps
}) => (
  <div
    {...otherProps}
    hidden={!isVisible}
    onClick={onClick}
    role="region"
  >
    {children}
  </div>
)

const MemoizedHtmlContent = (
  memo(
    HtmlContent
  )
)

export {
  MemoizedHtmlContent as HtmlContent,
}
