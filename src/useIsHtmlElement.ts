import {
  ReactElement,
  useMemo,
} from 'react'

export const useIsHtmlElement = (
  reactElement: (
    ReactElement
  )
) => {
  const isHtmlElement = (
    useMemo(
      () => (
        typeof (
          reactElement
          .type
        )
        === 'string'
      ),
      [
        (
          reactElement
          .type
        ),
      ],
    )
  )

  return (
    isHtmlElement
  )
}
