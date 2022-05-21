import {
  FunctionComponent,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  Visibilities,
  VisibilityControlContext,
  VisibilityControlContextId,
} from './VisibilityControlContext'
import {
  useVisibility,
} from './useVisibility'

export type VisibilityControlProviderProps = {
  children: ReactNode,
  id?: VisibilityControlContextId,
  onChange?: (
    visibility?: Visibilities,
  ) => (
    void
  ),
  visibility?: Visibilities,
}

const VisibilityControlProvider: (
  FunctionComponent<
    VisibilityControlProviderProps
  >
) = ({
  children,
  id,
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
      id,
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
