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

const toggledVisibility = {
  [
    Visibilities
    .invisible
  ]: (
    Visibilities
    .visible
  ),
  [
    Visibilities
    .none
  ]: (
    Visibilities
    .none
  ),
  [
    Visibilities
    .visible
  ]: (
    Visibilities
    .invisible
  ),
}

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

  const hideVisibility = (
    useCallback(
      () => {
        const nextVisibility = (
          Visibilities
          .invisible
        )

        onVisibilityChange(
          nextVisibility
        )

        setLocalVisibility(
          nextVisibility
        )
      },
      [],
    )
  )

  const showVisibility = (
    useCallback(
      () => {
        const nextVisibility = (
          Visibilities
          .visible
        )

        onVisibilityChange(
          nextVisibility
        )

        setLocalVisibility(
          nextVisibility
        )
      },
      [],
    )
  )

  const toggleVisibility = (
    useCallback(
      () => {
        setLocalVisibility((
          currentVisibility,
        ) => {
          const nextVisibility = (
            toggledVisibility
            [currentVisibility]
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
