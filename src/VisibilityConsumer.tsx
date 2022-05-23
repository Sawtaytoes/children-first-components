import {
  Children,
  cloneElement,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useContext,
  useMemo,
} from 'react'

import {
  VisibilityContext,
  VisibilityContextProps,
} from './VisibilityContext'

export type VisibilityChildProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  translateProps?: (
    childProps: VisibilityContextProps
  ) => (
    object
    | null
  ),
}

const defaultProps = {
  translateProps: () => (
    null
  ),
}

const VisibilityConsumer: (
  FunctionComponent<
    VisibilityChildProps
  >
) = ({
  children,
  translateProps = (
    defaultProps
    .translateProps
  ),
  ...otherProps
}) => {
  const {
    contentId,
    hide,
    isVisible,
    show,
    toggleVisibility,
    triggerId,
  } = (
    useContext(
      VisibilityContext
    )
  )

  const childProps = (
    useMemo(
      () => {
        const translatedProps = (
          translateProps({
            contentId,
            hide,
            isVisible,
            show,
            toggleVisibility,
            triggerId,
          })
        )

        if (translatedProps) {
          return {
            ...otherProps,
            ...translatedProps,
          }
        }
        else {
          return {
            contentId,
            hide,
            isVisible,
            show,
            toggleVisibility,
            triggerId,
          }
        }
      },
      [
        children,
        contentId,
        hide,
        isVisible,
        otherProps,
        show,
        toggleVisibility,
        translateProps,
        triggerId,
      ],
    )
  )

  const clonedChild = (
    useMemo(
      () => (
        cloneElement(
          (
            Children
            .only(
              children
            )
          ),
          childProps,
        )
      ),
      [
        children,
        childProps,
      ],
    )
  )

  return (
    clonedChild
  )
}

const MemoizedVisibilityConsumer = (
  memo(
    VisibilityConsumer
  )
)

export {
  MemoizedVisibilityConsumer as VisibilityConsumer,
}
