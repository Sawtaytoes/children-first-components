import {
  createContext,
  FunctionComponent,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  createRandomString,
} from './createRandomString'
import {
  Visibilities,
  VisibilityContext,
} from './VisibilityContext'

export type VisibilityProviderProps = {
  children: ReactNode;
  name?: string;
  visibility?: Visibilities;
}

const defaultProps = {
  name: '',
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
  visibility = (
    defaultProps
    .visibility
  ),
}) => {
  const uniqueId = (
    useMemo(
        () => (
          name
          || createRandomString()
        ),
      [
        name,
      ],
    )
  )

  const [
    localVisibility,
    setLocalVisibility,
  ] = (
    useState(
      visibility
    )
  )

  useEffect(
    () => {
      setLocalVisibility(
        visibility
      )
    },
    [
      visibility,
    ],
  )

  const toggleVisibility = (
    useCallback(
      () => {
        setLocalVisibility((
          visibility
        ) => (
          (
            visibility
            === (
              Visibilities
              .opened
            )
          )
          ? (
            Visibilities
            .closed
          )
          : (
            Visibilities
            .opened
          )
        ))
      },
      [],
    )
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
        localVisibility,
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
