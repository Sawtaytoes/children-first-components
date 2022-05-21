import {
  FunctionComponent,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  VisibilityContext,
} from './VisibilityContext'
import {
  useVisibility,
  UseVisibilityProps,
} from './useVisibility'

export type VisibilityProviderProps = {
  children: ReactNode,
  contextKey?: (
    UseVisibilityProps['contextKey']
  ),
  onChange?: (
    UseVisibilityProps['onChange']
  ),
  visibility?: (
    UseVisibilityProps['visibility']
  ),
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
