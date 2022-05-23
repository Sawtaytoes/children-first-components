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
  isVisible: isVisibleProp,
  onChange,
}) => {
  const {
    hide,
    isVisible,
    show,
    toggleVisibility,
    uniqueId,
  } = (
    useVisibility({
      contextKey,
      isVisible: isVisibleProp,
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
        hide,
        isVisible,
        show,
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
        hide,
        isVisible,
        show,
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
