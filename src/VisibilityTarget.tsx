import {
  Children,
  cloneElement,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useContext,
  useEffect,
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
}) => {
  useEffect(
    () => {
      Children
      .only(
        children
      )
    },
    [
      children,
    ],
  )

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
      () => (
        translateProps({
          contentId,
          hideVisibility,
          showVisibility,
          toggleVisibility,
          triggerId,
          visibility,
        })
        || (
          isHtmlElement
          ? {
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
            contentId,
            isVisible: (
              visibility
              === (
                Visibilities
                .visible
              )
            ),
            triggerId,
          }
        )
      ),
      [
        children,
        contentId,
        hideVisibility,
        isHtmlElement,
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
          children,
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
