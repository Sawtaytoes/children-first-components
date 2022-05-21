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
  VisibilityContext,
  VisibilityContextProps,
} from './VisibilityContext'
import {
  useVisibility,
} from './useVisibility'
import {
  VisibilityContextKey,
} from './useSharedVisibilityContext'

export type VisibilityTriggerProps = {
  children: (
    ReactElement<
      JSXElementConstructor<{
        onClick?: () => void,
      }>
    >
  ),
  targetContextKey?: (
    VisibilityContextKey
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
  targetContextKey,
  translateProps = (
    defaultProps
    .translateProps
  ),
  ...otherProps
}) => {
  const {
    contentId,
    hideVisibility,
    isVisible,
    showVisibility,
    toggleVisibility,
    triggerId,
  } = (
    useContext(
      VisibilityContext
    )
  )

  const {
    toggleVisibility: toggleNextVisibility,
  } = (
    useVisibility({
      contextKey: targetContextKey
    })
  )

  const onClick = (
    useCallback(
      (
        ...args: unknown[]
      ) => {
        children
        /* @ts-ignore */
        .onClick
        ?.(
          ...args
        )

        toggleVisibility()

        if (targetContextKey) {
          toggleNextVisibility()
        }
      },
      [
        (
          children
          /* @ts-ignore */
          .onClick
        ),
        toggleNextVisibility,
        targetContextKey,
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
            isVisible,
            showVisibility,
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
            'aria-controls': contentId,
            'aria-expanded': isVisible,
            id: triggerId,
            onClick,
            role: 'button',
          }
        }
      },
      [
        children,
        contentId,
        hideVisibility,
        isVisible,
        onClick,
        otherProps,
        showVisibility,
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

const MemoizedVisibilityTrigger = (
  memo(
    VisibilityTrigger
  )
)

export {
  MemoizedVisibilityTrigger as VisibilityTrigger,
}
