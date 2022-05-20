import {
  Children,
  cloneElement,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from 'react'

import {
  Visibilities,
  VisibilityContext,
  VisibilityContextId,
  VisibilityContextProps,
} from './VisibilityContext'
import {
  useVisibility,
} from './useVisibility'

export type VisibilityTriggerProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  targetVisibilityId?: (
    VisibilityContextId
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
  targetVisibilityId = (
    defaultProps
    .targetVisibilityId
  ),
  translateProps = (
    defaultProps
    .translateProps
  ),
  ...otherProps
}) => {
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

  const {
    toggleVisibility: toggleTargetVisibility,
  } = (
    useVisibility({
      id: targetVisibilityId
    })
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

        if (targetVisibilityId) {
          toggleTargetVisibility()
        }
      },
      [
        (
          children
          .onClick
        ),
        toggleTargetVisibility,
        targetVisibilityId,
        toggleVisibility,
      ],
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
          return {
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
        }
      },
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

const MemoizedVisibilityTrigger = (
  memo(
    VisibilityTrigger
  )
)

export {
  MemoizedVisibilityTrigger as VisibilityTrigger,
}
