import {
  useMemo,
} from 'react'

import {
  createRandomString,
} from './createRandomString'

export const useUniqueId = (
  name,
) => (
  useMemo(
    () => (
      name
      || createRandomString()
    ),
    [
      name,
    ],
  )
)
