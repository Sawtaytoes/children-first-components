import {
  FunctionComponent,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  Visibilities,
  VisibilityContext,
  VisibilityContextId,
} from './VisibilityContext'
import {
  useVisibility,
} from './useVisibility'

export type VisibilityProviderProps = {
  children: ReactNode,
  id?: VisibilityContextId,
  onVisibilityChange?: (
    visibility?: Visibilities,
  ) => (
    void
  ),
  visibility?: Visibilities,
}

const defaultProps = {
  id: '',
  onVisibilityChange: () => {},
  visibility: (
    Visibilities
    .invisible
  ),
}

const VisibilityProvider: (
  FunctionComponent<
    VisibilityProviderProps
  >
) = ({
  children,
  id = (
    defaultProps
    .id
  ),
  onVisibilityChange = (
    defaultProps
    .onVisibilityChange
  ),
  visibility = (
    defaultProps
    .visibility
  ),
}) => {
  const {
    hideVisibility,
    showVisibility,
    toggleVisibility,
    uniqueId,
    visibility: localVisibility,
  } = (
    useVisibility({
      id,
      onVisibilityChange,
      visibility,
    })
  )

  const providerValue = (
    useMemo(
      () => ({
        contentId: (
          uniqueId
          .concat(
            '-',
            'content',
          )
        ),
        hideVisibility,
        showVisibility,
        toggleVisibility,
        triggerId: (
          uniqueId
          .concat(
            '-',
            'trigger',
          )
        ),
        visibility: localVisibility,
      }),
      [
        hideVisibility,
        localVisibility,
        showVisibility,
        toggleVisibility,
        uniqueId,
      ],
    )
  )

  return (
    <VisibilityContext.Provider
      value={providerValue}
    >
      {children}
    </VisibilityContext.Provider>
  )
}

const MemoizedVisibilityProvider = (
  memo(
    VisibilityProvider
  )
)

export {
  MemoizedVisibilityProvider as VisibilityProvider,
}
