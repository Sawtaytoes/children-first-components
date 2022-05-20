import {
  FunctionComponent,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  Visibilities,
  VisibilityContext,
  VisibilityContextName,
} from './VisibilityContext'
import {
  useVisibility,
} from './useVisibility'

export type VisibilityProviderProps = {
  children: ReactNode,
  name?: VisibilityContextName,
  onVisibilityChange?: (
    visibility?: Visibilities,
  ) => (
    void
  ),
  visibility?: Visibilities,
}

const defaultProps = {
  name: '',
  onVisibilityChange: () => {},
  visibility: (
    Visibilities
    .none
  ),
}

const VisibilityProvider: (
  FunctionComponent<
    VisibilityProviderProps
  >
) = ({
  children,
  name = (
    defaultProps
    .name
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
      name,
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
