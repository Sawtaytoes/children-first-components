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
  defaultVisibilityContextValue,
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
  );
  translateProps: (
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
        || {
          contentId,
          onClick: toggleVisibility,
          triggerId,
        }
      ),
      [
        children,
        contentId,
        hideVisibility,
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
    <VisibilityContext.Provider
      value={defaultVisibilityContextValue}
    >
      {clonedChild}
    </VisibilityContext.Provider>
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
