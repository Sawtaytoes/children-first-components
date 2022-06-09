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
  ariaLabelledBy: '',
  id: '',
  isVisible: false,
  onClick: () => {},
}

const HtmlContent: (
  FunctionComponent<
    HtmlContentProps
  >
) = ({
  'aria-labelledby': ariaLabelledBy = (
    defaultProps
    .ariaLabelledBy
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
}) => (
  <div
    aria-labelledby={ariaLabelledBy}
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
