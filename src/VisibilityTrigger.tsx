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
      JSXElementConstructor<{
        onClick?: () => void,
      }>
    >
  ),
  targetContextId?: (
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
  targetContextId,
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
    toggleVisibility: toggleNextVisibility,
  } = (
    useVisibility({
      contextId: targetContextId
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

        if (targetContextId) {
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
        targetContextId,
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
