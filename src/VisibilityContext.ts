import {
  createContext,
  useContext,
} from 'react'

export type VisibilityContextName = string

export enum Visibilities {
  invisible = 'invisible',
  none = 'none',
  visible = 'visible',
}

export type VisibilityContextProps = {
  contentId: string,
  hideVisibility: () => void,
  showVisibility: () => void,
  toggleVisibility: () => void,
  triggerId: string,
  visibility: Visibilities,
}

export const defaultVisibilityContextValue: (
  VisibilityContextProps
) = {
  contentId: '',
  hideVisibility: () => {},
  showVisibility: () => {},
  toggleVisibility: () => {},
  triggerId: '',
  visibility: (
    Visibilities
    .none
  ),
}

export const VisibilityContext = (
  createContext(
    defaultVisibilityContextValue
  )
)
