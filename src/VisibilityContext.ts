import {
  createContext,
} from 'react'

export type VisibilityContextProps = {
  hide: () => void,
  isVisible?: boolean,
  show: () => void,
  toggle: () => void,
}

export const defaultVisibilityContextValue: (
  VisibilityContextProps
) = {
  hide: () => {},
  isVisible: false,
  show: () => {},
  toggle: () => {},
}

export const VisibilityContext = (
  createContext(
    defaultVisibilityContextValue
  )
)
