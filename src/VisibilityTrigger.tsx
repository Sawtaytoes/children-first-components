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
  VisibilityContextName,
  VisibilityContextProps,
} from './VisibilityContext'
// import {
//   useVisibilityAtom,
// } from './useVisibilityAtom'

export type VisibilityTriggerProps = {
  children: (
    ReactElement<
      JSXElementConstructor<
        any
      >
    >
  ),
  targetVisibilityName?: (
    VisibilityContextName
  ),
  translateProps?: (
    childProps: VisibilityContextProps
  ) => (
    object
    | null
  ),
}

const defaultProps = {
  targetVisibilityName: '',
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
  targetVisibilityName = (
    defaultProps
    .targetVisibilityName
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

  // const [
  //   targetVisibilityContext,
  // ] = (
  //   useVisibilityAtom(
  //     targetVisibilityName
  //   )
  // )

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

        if (targetVisibilityName) {
          // targetVisibilityContext
          // .toggleVisibility()
        }
      },
      [
        (
          children
          .onClick
        ),
        // (
        //   targetVisibilityContext
        //   .toggleVisibility
        // ),
        targetVisibilityName,
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
