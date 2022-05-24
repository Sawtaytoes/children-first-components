import {
  FunctionComponent,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  AccessibleVisibilityContext,
} from './AccessibleVisibilityContext'
import {
  useAccessibleVisibility,
  UseAccessibleVisibilityProps,
} from './useAccessibleVisibility'
import {
  useVisibility,
  UseVisibilityProps,
} from './useVisibility'
import {
  VisibilityContext,
} from './VisibilityContext'

export type VisibilityProviderProps = {
  children: ReactNode,
  contextKey?: (
    | UseAccessibleVisibilityProps['contextKey']
    | UseVisibilityProps['contextKey']
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
    toggle,
  } = (
    useVisibility({
      contextKey,
      isVisible: isVisibleProp,
      onChange,
    })
  )

  const {
    registerTargetId,
    registerTriggerId,
    targetIds,
    triggerIds,
  } = (
    useAccessibleVisibility({
      contextKey,
    })
  )

  const visibilityProviderValue = (
    useMemo(
      () => ({
        hide,
        isVisible,
        show,
        toggle,
      }),
      [
        hide,
        isVisible,
        show,
        toggle,
      ],
    )
  )

  const accessibleVisibilityProviderValue = (
    useMemo(
      () => ({
        registerTargetId,
        registerTriggerId,
        targetIds,
        triggerIds,
      }),
      [
        registerTargetId,
        registerTriggerId,
        targetIds,
        triggerIds,
      ],
    )
  )

  return (
    <VisibilityContext.Provider
      value={visibilityProviderValue}
    >
      <AccessibleVisibilityContext.Provider
        value={accessibleVisibilityProviderValue}
      >
        {children}
      </AccessibleVisibilityContext.Provider>
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
