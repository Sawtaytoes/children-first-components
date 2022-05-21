import {
  createContext,
} from 'react'

export type VisibilityContextProps = {
  contentId: string,
  hideVisibility: () => void,
  isVisible?: boolean,
  showVisibility: () => void,
  toggleVisibility: () => void,
  triggerId: string,
}

export const defaultVisibilityContextValue: (
  VisibilityContextProps
) = {
  contentId: '',
  hideVisibility: () => {},
  isVisible: false,
  showVisibility: () => {},
  toggleVisibility: () => {},
  triggerId: '',
}

export const VisibilityContext = (
  createContext(
    defaultVisibilityContextValue
  )
)
