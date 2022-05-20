import {
  atom,
  useAtom,
} from 'jotai'

// export const VisibilityScope = Symbol()

const definedAtom = atom()

export const useVisibilityAtom = (
  name = '',
) => (
  useAtom(
    definedAtom,
    name,
  )
)
