import {
  FunctionComponent,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  Visibilities,
  VisibilityContext,
} from './VisibilityContext'
import {
  useVisibility,
} from './useVisibility'
import {
  VisibilityContextKey,
} from './useVisibilityContextKey'

export type VisibilityProviderProps = {
  children: ReactNode,
  contextKey?: VisibilityContextKey,
  onChange?: (
    visibility?: Visibilities,
  ) => (
    void
  ),
  visibility?: Visibilities,
}

const VisibilityProvider: (
  FunctionComponent<
    VisibilityProviderProps
  >
) = ({
  children,
  contextKey,
  onChange,
  visibility,
}) => {
  const {
    hideVisibility,
    showVisibility,
    toggleVisibility,
    uniqueId,
    visibility: localVisibility,
  } = (
    useVisibility({
      contextKey,
      onChange,
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
