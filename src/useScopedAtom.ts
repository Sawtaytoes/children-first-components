import {
  SetStateAction,
  useAtom,
  WritableAtom,
} from 'jotai'

import {
  jotaiScope,
} from './jotaiScope'

export const useScopedAtom = (
  atom: (
    WritableAtom<
      any,
      (
        SetStateAction<
          any
        >
      ),
      void
    >
  ),
) => (
  useAtom(
    atom,
    jotaiScope,
  )
)
