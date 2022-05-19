import {
  createContext,
  useContext,
} from 'react'

export enum Visibilities {
  invisible = 'invisible',
  none = 'none',
  visible = 'visible',
}

export type VisibilityContextProps = {
  contentId: string;
  toggleVisibility: () => void;
  triggerId: string;
  visibility: Visibilities;
}

export const defaultVisibilityContextValue: (
  VisibilityContextProps
) = {
  contentId: '',
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
