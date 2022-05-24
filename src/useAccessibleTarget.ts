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

export const useAccessibleTarget = (
  id?: string,
) => {
  const {
    registerTargetId,
    triggerIds,
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
      const unregisterTargetId = (
        registerTargetId(
          uniqueId,
        )
      )
      
      return () => {
        unregisterTargetId()
      }
    },
    [
      uniqueId,
      registerTargetId,
    ],
  )
  
  return {
    id: uniqueId,
    triggerIds,
  }
}
