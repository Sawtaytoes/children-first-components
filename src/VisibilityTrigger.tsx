import {
  Children,
  cloneElement,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import {
  Visibilities,
  VisibilityContext,
  VisibilityContextProps,
} from './VisibilityContext'

export type VisibilityTriggerProps = {
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

const VisibilityTrigger: (
  FunctionComponent<
    VisibilityTriggerProps
  >
) = ({
  children,
  translateProps = (
    defaultProps
    .translateProps
  ),
  ...otherProps
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

  const onClick = (
    useCallback(
      (
        ...args
      ) => {
        children
        .onClick
        ?.(
          ...args
        )

        toggleVisibility()
      },
      [],
    )
  )

  const childProps = (
    useMemo(
      () => (
        translateProps({
          contentId,
          hideVisibility,
          otherProps,
          showVisibility,
          toggleVisibility,
          triggerId,
          visibility,
        })
        || {
          ...otherProps,
          'aria-controls': contentId,
          'aria-expanded': (
            visibility
            === (
              Visibilities
              .visible
            )
          ),
          id: triggerId,
          onClick,
          role: 'button',
          type: 'button',
        }
      ),
      [
        children,
        contentId,
        hideVisibility,
        onClick,
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

const MemoizedVisibilityTrigger = (
  memo(
    VisibilityTrigger
  )
)

export {
  MemoizedVisibilityTrigger as VisibilityTrigger,
}
