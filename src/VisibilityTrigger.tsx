import {
  Children,
  cloneElement,
  ComponentType,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  defaultVisibilityContextValue,
  Visibilities,
  VisibilityContext,
  VisibilityContextProps,
} from './VisibilityContext'

export type ChildProps = {
  contentId: (
    VisibilityContextProps['contentId']
  );
  onClick: (
    VisibilityContextProps['toggleVisibility']
  );
  triggerId: (
    VisibilityContextProps['triggerId']
  );
  visibility: (
    VisibilityContextProps['visibility']
  );
}

export type VisibilityTriggerProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  );
  onToggleVisibility: (
    visibility?: Visibilities,
  ) => (
    void
  );
  translateProps: (
    childProps: ChildProps
  ) => (
    object
  ),
}

const defaultProps = {
  onToggleVisibility: () => {},
  translateProps: (
    props: ChildProps,
  ) => (
    props
  ),
}

const VisibilityTrigger: (
  FunctionComponent<
    VisibilityTriggerProps
  >
) = ({
  children,
  onToggleVisibility: onToggleVisibilityCallback = (
    defaultProps
    .onToggleVisibility
  ),
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
    toggleVisibility,
    triggerId,
    visibility,
  } = useContext(
    VisibilityContext
  );

  const onToggleVisibility = (
    useCallback(
      () => {
        onToggleVisibilityCallback(
          visibility
        );

        toggleVisibility();
      },
      [
        onToggleVisibilityCallback,
        toggleVisibility,
        visibility,
      ]
    )
  )

  const childProps = (
    useMemo(
      () => (
        translateProps({
          contentId,
          onClick: toggleVisibility,
          triggerId,
          visibility,
        })
      ),
      [
        children,
        translateProps,
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
