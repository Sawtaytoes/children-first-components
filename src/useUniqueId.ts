import {
  useMemo,
} from 'react'

import {
  createRandomString,
} from './createRandomString'

export const useUniqueId = (
  existingId?: string,
) => (
  useMemo(
    () => (
      existingId
      || createRandomString()
    ),
    [
      existingId,
    ],
  )
)
