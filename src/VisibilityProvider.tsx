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
  onVisibilityChange: (
    visibility?: Visibilities,
  ) => (
    void
  );
  visibility?: Visibilities;
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
        ) => {
          const nextVisibility = (
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
          )

          onVisibilityChange(
            nextVisibility
          )

          return (
            nextVisibility
          )
        })
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
