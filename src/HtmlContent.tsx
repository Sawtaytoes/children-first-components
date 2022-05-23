import {
  FunctionComponent,
  memo,
  ReactNode,
} from 'react'

export type HtmlContentProps = {
  'aria-labelledby': string,
  children: ReactNode,
  id: string,
  isVisible?: boolean,
  onClick?: () => void,
}

const defaultProps = {
  ariaLabelledby: '',
  id: '',
  isVisible: false,
  onClick: () => {},
}

const HtmlContent: (
  FunctionComponent<
    HtmlContentProps
  >
) = ({
  aria-labelledBy: ariaLabelledby = (
    defaultProps
    .ariaLabelledby
  ),
  children,
  id = (
    defaultProps
    .id
  ),
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
    aria-labelledby={ariaLabelledby}
    hidden={!isVisible}
    id={id}
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
