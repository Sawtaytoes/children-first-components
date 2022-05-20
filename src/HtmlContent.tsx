import {
  FunctionComponent,
  memo,
  ReactNode,
} from 'react'

export type HtmlContentProps = {
  children: ReactNode,
  isVisible: boolean,
}

const defaultProps = {
  isVisible: false,
}

const HtmlContent: (
  FunctionComponent<
    HtmlContentProps
  >
) = ({
  children,
  isVisible,
}) => (
  <div hidden={!isVisible}>
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
