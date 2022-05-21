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

export type VisibilityTargetProps = {
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

const VisibilityTarget: (
  FunctionComponent<
    VisibilityTargetProps
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
            ...otherProps,
            'aria-labelledby': triggerId,
            id: contentId,
            isVisible,
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

const MemoizedVisibilityTarget = (
  memo(
    VisibilityTarget
  )
)

export {
  MemoizedVisibilityTarget as VisibilityTarget,
}
