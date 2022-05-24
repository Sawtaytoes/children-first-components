import {
  useContext,
  useEffect,
} from 'react'

import {
  AccessibleVisibilityContext,
} from './AccessibleVisibilityContext'
import {
  useUniqueId,
} from './useUniqueId'

export const useAccessibleTrigger = (
  id?: string,
) => {
  const {
    registerTriggerId,
    targetIds,
  } = (
    useContext(
      AccessibleVisibilityContext
    )
  )

  const uniqueId = (
    useUniqueId(
      id
    )
  )

  useEffect(
    () => {
      const unregisterTriggerId = (
        registerTriggerId(
          uniqueId,
        )
      )
      
      return () => {
        unregisterTriggerId()
      }
    },
    [
      uniqueId,
      registerTriggerId,
    ],
  )
  
  return {
    id: uniqueId,
    targetIds,
  }
}
