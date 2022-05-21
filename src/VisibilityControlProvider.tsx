import {
  FunctionComponent,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  VisibilityControlContext,
} from './VisibilityControlContext'
import {
  useVisibilityControl,
  UseVisibilityControlProps,
} from './useVisibilityControl'

export type VisibilityControlProviderProps = {
  children: ReactNode,
  contextKey?: (
    UseVisibilityControlProps['contextKey']
  ),
  onChange?: (
    UseVisibilityControlProps['onChange']
  ),
  selectedVisibilityContextKey?: (
    UseVisibilityControlProps['selectedVisibilityContextKey']
  ),
}

const VisibilityControlProvider: (
  FunctionComponent<
    VisibilityControlProviderProps
  >
) = ({
  children,
  contextKey,
  onChange,
  selectedVisibilityContextKey,
}) => {
  const {
    selectedVisibilityContextKey: sharedSelectedVisibilityContextKey,
    selectVisibilityContextKey,
  } = (
    useVisibilityControl({
      contextKey,
      onChange,
      selectedVisibilityContextKey,
    })
  )

  const providerValue = (
    useMemo(
      () => ({
        selectedVisibilityContextKey: sharedSelectedVisibilityContextKey,
        selectVisibilityContextKey,
      }),
      [
        sharedSelectedVisibilityContextKey,
        selectVisibilityContextKey,
      ],
    )
  )

  return (
    <VisibilityControlContext.Provider
      value={providerValue}
    >
      {children}
    </VisibilityControlContext.Provider>
  )
}

const MemoizedVisibilityControlProvider = (
  memo(
    VisibilityControlProvider
  )
)

export {
  MemoizedVisibilityControlProvider as VisibilityControlProvider,
}
