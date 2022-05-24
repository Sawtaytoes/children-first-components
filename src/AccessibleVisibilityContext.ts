import {
  createContext,
} from 'react'

export type AccessibleVisibilityContextProps = {
  registerTargetId: (id: string) => () => void,
  registerTriggerId: (id: string) => () => void,
  targetIds: string,
  triggerIds: string,
}

export const defaultAccessibleVisibilityContextValue: (
  AccessibleVisibilityContextProps
) = {
  registerTargetId: () => () => {},
  registerTriggerId: () => () => {},
  targetIds: '',
  triggerIds: '',
}

export const AccessibleVisibilityContext = (
  createContext(
    defaultAccessibleVisibilityContextValue
  )
)
