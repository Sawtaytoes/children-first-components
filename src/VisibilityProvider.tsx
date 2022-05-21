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
  isVisible?: (
    UseVisibilityProps['isVisible']
  ),
  onChange?: (
    UseVisibilityProps['onChange']
  ),
}

const VisibilityProvider: (
  FunctionComponent<
    VisibilityProviderProps
  >
) = ({
  children,
  contextKey,
  isVisible: isControlledVisible,
  onChange,
}) => {
  const {
    hideVisibility,
    isVisible,
    showVisibility,
    toggleVisibility,
    uniqueId,
  } = (
    useVisibility({
      contextKey,
      isVisible: isControlledVisible,
      onChange,
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
        isVisible,
        showVisibility,
        toggleVisibility,
        triggerId: (
          uniqueId
          .concat(
            '-',
            'trigger',
          )
        ),
      }),
      [
        hideVisibility,
        isVisible,
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
