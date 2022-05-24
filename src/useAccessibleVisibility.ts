import {
  useMemo,
} from 'react'

import {
  useRegisterItem,
} from './useRegisterItem'
import {
  useScopedAtom,
} from './useScopedAtom'
import {
  useSharedVisibilityContext,
  VisibilityContextKey,
} from './useSharedVisibilityContext'

export type UseAccessibleVisibilityProps = {
  contextKey?: VisibilityContextKey,
}

export const useAccessibleVisibility = ({
  contextKey,
}: (
  UseAccessibleVisibilityProps
)) => {
  const {
    sharedContext,
  } = (
    useSharedVisibilityContext({
      contextKey,
    })
  )

  const [
    targetIds,
    setTargetIds,
  ] = (
    useScopedAtom(
      sharedContext
      .targetIdsAtom
    )
  )

  const [
    triggerIds,
    setTriggerIds,
  ] = (
    useScopedAtom(
      sharedContext
      .triggerIdsAtom
    )
  )

  const stringifiedTargetIds = (
    useMemo(
      () => (
        targetIds
        .join(
          ' '
        )
      ),
      [
        targetIds,
      ],
    )
  )

  const stringifiedTriggerIds = (
    useMemo(
      () => (
        triggerIds
        .join(
          ' '
        )
      ),
      [
        triggerIds,
      ],
    )
  )

  const registerTargetId = (
    useRegisterItem(
      setTargetIds
    )
  )

  const registerTriggerId = (
    useRegisterItem(
      setTriggerIds
    )
  )

  return {
    registerTargetId,
    registerTriggerId,
    targetIds: stringifiedTargetIds,
    triggerIds: stringifiedTriggerIds,
  }
}
