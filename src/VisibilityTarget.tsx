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
  useIsHtmlElement,
} from './useIsHtmlElement'
import {
  Visibilities,
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
  const isHtmlElement = (
    useIsHtmlElement(
      children
    )
  )

  const {
    contentId,
    hideVisibility,
    showVisibility,
    toggleVisibility,
    triggerId,
    visibility,
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
            hideVisibility,
            showVisibility,
            toggleVisibility,
            triggerId,
            visibility,
          })
        )

        if (translatedProps) {
          return {
            ...otherProps,
            ...translatedProps,
          }
        }
        else {
          return (
            isHtmlElement
            ? {
              ...otherProps,
              'aria-hidden': (
                visibility
                === (
                  Visibilities
                  .invisible
                )
              ),
              'aria-labelledby': triggerId,
              id: contentId,
              hidden: (
                visibility
                === (
                  Visibilities
                  .invisible
                )
              ),
              role: 'region',
            }
            : {
              ...otherProps,
              'aria-labelledby': triggerId,
              id: contentId,
              isVisible: (
                visibility
                === (
                  Visibilities
                  .visible
                )
              ),
            }
          )
        }
      },
      [
        children,
        contentId,
        hideVisibility,
        isHtmlElement,
        otherProps,
        showVisibility,
        toggleVisibility,
        translateProps,
        triggerId,
        visibility,
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
