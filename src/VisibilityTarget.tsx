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

export type VisibilityTargetProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  );
  isVisible: boolean;
  translateProps: (
    childProps: ChildProps
  ) => (
    object
  ),
}

const defaultProps = {
  isVisible: false,
  translateProps: (
    props: ChildProps,
  ) => (
    props
  ),
}

const VisibilityTarget: (
  FunctionComponent<
    VisibilityTargetProps
  >
) = ({
  children,
  isVisible = (
    defaultProps
    .isVisible
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
          isVisible,
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

const MemoizedVisibilityTarget = (
  memo(
    VisibilityTarget
  )
)

export {
  MemoizedVisibilityTarget as VisibilityTarget,
}
