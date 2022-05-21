import {
  createContext,
} from 'react'

export type VisibilityContextProps = {
  contentId: string,
  hide: () => void,
  isVisible?: boolean,
  show: () => void,
  toggleVisibility: () => void,
  triggerId: string,
}

export const defaultVisibilityContextValue: (
  VisibilityContextProps
) = {
  contentId: '',
  hide: () => {},
  isVisible: false,
  show: () => {},
  toggleVisibility: () => {},
  triggerId: '',
}

export const VisibilityContext = (
  createContext(
    defaultVisibilityContextValue
  )
)
