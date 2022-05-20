import {
  FunctionComponent,
  memo,
  ReactNode,
} from 'react'

export type HtmlContentProps = {
  children: ReactNode,
  isVisible: boolean,
  onClick: () => void,
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
  isVisible,
  onClick,
}) => (
  <div
    hidden={!isVisible}
    onClick={onClick}
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
