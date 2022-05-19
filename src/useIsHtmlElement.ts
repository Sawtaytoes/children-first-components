import {
  ReactElement,
  useMemo,
} from 'react'

export const useIsHtmlElement = ({
  type: reactElementType,
}: (
  ReactElement
)) => {
  const isHtmlElement = (
    useMemo(
      () => (
        typeof (
          reactElementType
        )
        === 'string'
      ),
      [
        reactElementType,
      ],
    )
  )

  return (
    isHtmlElement
  )
}
